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

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private PurchaseRepository repository;
    @Resource(name="newTmdbCart")
    private TmdbCart cartSession;

    @Resource(name="getDbLock")
    private ReentrantReadWriteLock dbLock;

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


    @PostMapping(value = "/purchase")
    public Purchase addPurchase(@Valid @RequestBody PurchaseRequest purchaseRequest) {
        Purchase savedPurchase = purchaseRequest.getPurchase();
        savedPurchase.setPayment(cartSession.getNumberOfItems() * 3.99);
        try{
            dbLock.writeLock().lock();
            cartSession.getReadWriteLock().writeLock().lock();
            if (cartSession.getNumberOfItems() > 0) {
                if (!purchaseRequest.areIdsEqual(cartSession.getCartIds()))
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Your cart is not synchronized with the one in the server");
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

    @PostMapping(value="/cart")
    public ResponseEntity<TmdbItem> addNewItem(@Valid @RequestBody final TmdbItem newItem){
        this.cartSession.add(newItem);
        return ResponseEntity.ok(newItem);
    }

    @GetMapping(value="/cart")
    public HashMap<String, TmdbItem> showCart(){
        return this.cartSession.getCart();
    }

    @GetMapping(value="/cart/counter")
    public int returnNumOfItems(){
        return this.cartSession.getNumberOfItems();
    }

    @GetMapping(value="/cart/ids")
    public Set<String> returnIds(){
        return this.cartSession.getCartIds();
    }

    @DeleteMapping(value="/cart/item/{id}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") final String id){
        this.cartSession.deleteItem(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping(value="/cart")
    public ResponseEntity<HttpStatus> deleteAll(){
        this.cartSession.emptyCart();
        return ResponseEntity.ok(HttpStatus.OK);
    }


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
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }
}
