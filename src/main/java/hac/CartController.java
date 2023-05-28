package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

import java.util.HashMap;

@RestController
@RequestMapping("/api/cart")
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

    @GetMapping(value="/counter")
    public int returnNumOfItems(){
        return this.cartSession.getNumberOfItems();
    }

    @GetMapping(value="/ids")
    public Set<String> returnIds(){
        return this.cartSession.getCartIds();
    }

    @DeleteMapping(value="/item/{id}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") final String id){
        this.cartSession.deleteItem(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping(value= "")
    public ResponseEntity<HttpStatus> deleteAll(){
        this.cartSession.emptyCart();
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }
}
