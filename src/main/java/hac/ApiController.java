package hac;

import hac.beans.PurchaseRequest;
import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.annotation.Resource;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import java.util.concurrent.locks.ReentrantReadWriteLock;
/**
 * <h2>ApiController</h2>
 * <div>
 *     This controller is handle with all the api's requests.
 * </div>
 * <div>
 *     Available requests:
 *     <ul>
 *         <li>
 *             /api/purchase: There are 2 available methods:
 *             <ul>
 *                 <li>
 *                     post - Receives purchase object (firstName - string with 0 &lt; length &lt;=30,
 *                     lastName - string with 0 &lt; length &lt;=30, and email - string with 0 &lt; length &lt;=30) and a set of ids
 *                     that the user is updated with (id is a string in this case). The json should look like that
 *                     {purchase:{firstName:___, lastName:___, email:___} ids:[&lt;id1;&gt;, &lt;id2&gt;,....]}.
 *                     If there is an error - the cart is empty/ the ids are not the same as in the cart, return
 *                     HttpStatus.BAD_REQUEST error description.
 *                 </li>
 *                 <li>
 *                     get - Return all of the purchases in the data base.
 *                 </li>
 *             </ul>
 *         </li>
 *         <li>
 *             /api/cart: There are multiple available methods:
 *             <ul>
 *                 <li>
 *                     post - receives tmdb item with the parameters: id, date, name, posterPath, popularity,and overview
 *                     when id - required,and date- in yyyy-mm-dd format if exists. Returns ResponseEntity.ok(newItem).
 *                     If id or date are invalid, return HttpStatus.BAD_REQUEST with the relevant errors.
 *
 *                 </li>
 *                 <li>
 *                     get- return all the cart's items (A map when the key is the item's id and the value is the item
 *                     itself).
 *                 </li>
 *                 <li>
 *                     delete - delete all the cart. Could throw HttpStatus.BAD_REQUEST if the cart is already empty.
 *                 </li>
 *             </ul>
 *         </li>
 *         <li>
 *             /api/cart/counter : A get request that returns the number of items in the cart.
 *         </li>
 *         <li>
 *             /api/cart/item/{id} : A delete request that delete the wanted item's id. Throw HttpStatus.BAD_REQUEST
 *             if the item is not exists.
 *         </li>
 *     </ul>
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@RestController
@RequestMapping("/api")
public class ApiController {
    /**For the PurchaseRepository - handle with the db*/
    @Autowired
    private PurchaseRepository repository;
    /**Holds the current cart*/
    @Resource(name="newTmdbCart")
    private TmdbCart cartSession;

    /**Holds a lock for the db*/
    @Resource(name="getDbLock")
    private ReentrantReadWriteLock dbLock;

    /**When the ids are not match to those in the cart.*/
    final static String INVALID_IDS = "Your cart is not synchronized with the one in the server";

    @GetMapping(value = "/purchase")
    public List<Purchase> showPurchases() {
        try {
            dbLock.readLock().lock();
            return repository.findAll();
        }
        finally {
            dbLock.readLock().unlock();
        }
    }

    /**
     * Receives purchase object (firstName - string with 0 &lt; length &lt;=30,
     * lastName - string with 0 &lt; length &lt;=30, and email - string with 0 &lt; length &lt;=30) and a set of ids
     * that the user is updated with (id is a string in this case).The json should look like that
     * {purchase:{firstName:___, lastName:___, email:___} ids:[&lt;id1;&gt;, &lt;id2&gt;,....]}.
     * If there is an error - the cart is empty/ the ids are not the same as in the cart, return
     * HttpStatus.BAD_REQUEST error description.
     * @param purchaseRequest As described.
     * @return The saved purchase.
     * @throws ResponseStatusException If the ids are not match to those in the cart or if the cart is empty.
     * @throws ConstraintViolationException or MethodArgumentNotValidException if the purchase element is not valid.
     */
    @PostMapping(value = "/purchase")
    public Purchase addPurchase(@Valid @RequestBody PurchaseRequest purchaseRequest) {
        Purchase savedPurchase = purchaseRequest.getPurchase();
        savedPurchase.setPayment(cartSession.getNumberOfItems() * 3.99);
        try{
            dbLock.writeLock().lock();
            cartSession.getReadWriteLock().writeLock().lock();
            if (cartSession.getNumberOfItems() > 0) {
                if (!purchaseRequest.areIdsEqual(cartSession.getCartIds()))
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_IDS);
                savedPurchase = repository.save(savedPurchase);
            }
            cartSession.emptyCart(); // will fail and throw exception if the cart is empty.
        }
        finally{
            if(cartSession.getReadWriteLock().isWriteLockedByCurrentThread())
                cartSession.getReadWriteLock().writeLock().unlock();
            dbLock.writeLock().unlock();
        }
        return savedPurchase;
    }

    /**
     * Receives tmdb item with the parameters: id, date, name, posterPath, popularity,and overview
     * when id - required, and date - in yyyy-mm-dd format if exists.Returns ResponseEntity.ok(newItem).
     * If id or date are invalid, return HttpStatus.BAD_REQUEST with the relevant errors.
     * @param newItem A json look like that: {id:___, date:___,...} (with all the parameters).
     * @return ResponseEntity.ok(newItem);
     * @throws ResponseStatusException if the item is already in the cart.
     */
    @PostMapping(value="/cart")
    public ResponseEntity<TmdbItem> addNewItem(@Valid @RequestBody final TmdbItem newItem){
        this.cartSession.add(newItem);
        return ResponseEntity.ok(newItem);
    }

    /**
     *
     * @return all the cart's items (A map when the key is the item's id and the value is the item itself).
     */
    @GetMapping(value="/cart")
    public HashMap<String, TmdbItem> showCart(){
        return this.cartSession.getCart();
    }

    /**
     * @return  the number of items in the cart.
     */
    @GetMapping(value="/cart/counter")
    public int returnNumOfItems(){
        return this.cartSession.getNumberOfItems();
    }

    /**
     *
     * @return The ids in the cart.
     */
    @GetMapping(value="/cart/ids")
    public Set<String> returnIds(){
        return this.cartSession.getCartIds();
    }

    /**
     * A delete request that delete the wanted item's id. Throw HttpStatus.BAD_REQUEST
     * if the item is not existed.
     * @param id The wanted item's id to delete.
     * @return ResponseEntity&lt;HttpStatus&gt; with ok status.
     * @throws ResponseStatusException if the item is not existed.
     */
    @DeleteMapping(value="/cart/item/{id}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") final String id){
        this.cartSession.deleteItem(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * Empty all cart
     * @return ResponseEntity&lt;HttpStatus&gt; with ok status.
     * @throws ResponseStatusException If the cart is already empty.
     */
    @DeleteMapping(value="/cart")
    public ResponseEntity<HttpStatus> deleteAll(){
        this.cartSession.emptyCart();
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * Handle with MethodArgumentNotValidException exceptions.
     * @param ex The exception
     * @return Map&lt;String, String&gt; with all the errors.
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errorsMap.put(fieldName, errorMessage);
        });

        return errorsMap;
    }
    /**
     * Handle with ConstraintViolationException exceptions.
     * @param ex The exception
     * @return Map&lt;String, String&gt; with all the errors.
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Map<String, String> handleValidationExceptions(ConstraintViolationException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        constraintViolations.forEach((violation) -> {
            String propertyName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errorsMap.put(propertyName, errorMessage);
        });

        return errorsMap;
    }

    /**
     * Handle with ResponseStatusException
     * @param ex the exception
     * @return ResponseEntity with bad request status and the error message.
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }
}
