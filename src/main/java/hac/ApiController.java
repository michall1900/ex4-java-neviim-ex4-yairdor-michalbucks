package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.annotation.Resource;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Set;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    private PurchaseRepository repository;
    @Resource(name="newTmdbCart")
    private TmdbCart cartSession;

    @GetMapping(value = "/purchase")
    public List<Purchase> showPurchases() {
        return repository.findAll();
    }

    @PostMapping(value = "/purchase")
    public Purchase addPurchase(@Valid @RequestBody Purchase purchase) {
        Purchase savedPurchase = purchase;
        purchase.setPayment(cartSession.getNumberOfItems() * 3.99);
        if (cartSession.getNumberOfItems() > 0)
            savedPurchase =  repository.save(purchase);
        cartSession.emptyCart(); // will fail and throw exception because the cart is empty.
        return savedPurchase;

    }

    @PostMapping(value="/cart")
    public ResponseEntity<TmdbItem> addNewItem(@Valid @RequestBody final TmdbItem newItem){
        this.cartSession.add(newItem);
        return ResponseEntity.ok(newItem);
    }

    @GetMapping(value="/cart")
    public HashMap<String, TmdbItem> showCart(){
        System.out.println("Controller 1 cartSession Instance ID: " + System.identityHashCode(cartSession));
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
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String, String> errorsMap = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errorsMap.put(fieldName, errorMessage);
        });

        return errorsMap;
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }
}
