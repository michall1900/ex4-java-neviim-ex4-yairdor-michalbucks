package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class CartController {

    @Resource(name="newTmdbCart")
    private TmdbCart cartSession;

    @PostMapping(value="")
    public ResponseEntity<TmdbItem> addNewItem(@RequestBody final TmdbItem newItem){
        this.cartSession.add(newItem);
        return ResponseEntity.ok(newItem);
    }

    @GetMapping(value="")
    public HashMap<String, TmdbItem> showCart(){
        return this.cartSession.getCart();
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }
}
