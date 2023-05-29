package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This code is for debugging purposes only.
 * You can check the DB contents by visiting http://localhost:8080/debug/purchases
 * You may add new routes to this controller if you want to test your code.
 * This class will not be graded (ignored by the grader).
 */
@RestController
@RequestMapping("/debug")
public class DebugController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase) {
        return repository.save(purchase);
    }


}
