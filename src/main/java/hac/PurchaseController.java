//package hac;
//
//import hac.beans.TmdbCart;
//import hac.repo.Purchase;
//import hac.repo.PurchaseRepository;
//import jakarta.annotation.Resource;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.FieldError;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/purchase")
//public class PurchaseController {
//    @Autowired
//    private PurchaseRepository repository;
//    @Resource(name="newTmdbCart")
//    private TmdbCart cartSession;
//
//    @GetMapping("")
//    public List<Purchase> showPurchases() {
//        return repository.findAll();
//    }
//
//    @PostMapping("")
//    public Purchase addPurchase(@Valid @RequestBody Purchase purchase) {
//        Purchase savedPurchase = purchase;
//        purchase.setPayment(cartSession.getNumberOfItems() * 3.99);
//        if (cartSession.getNumberOfItems() > 0)
//            savedPurchase =  repository.save(purchase);
//        cartSession.emptyCart(); // will fail and throw exception because the cart is empty.
//        return savedPurchase;
//
//    }
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//
//        return errors;
//    }
//    @ExceptionHandler(ResponseStatusException.class)
//    public ResponseEntity<String> handleAllExceptions(Exception ex) {
//        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
//    }
//}
