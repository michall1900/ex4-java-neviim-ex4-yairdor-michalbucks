package hac.beans;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Set;

@Component
public class TmdbCart implements Serializable {
    private HashMap<String, TmdbItem> cart;

    public TmdbCart(){
        this.cart = new HashMap<>();
    }

    public void setCart(HashMap<String, TmdbItem> newCart){
        this.cart = newCart;
    }

    public HashMap<String, TmdbItem> getCart(){
        return cart;
    }

    public void add (TmdbItem newItem){
        TmdbItem existItem = this.cart.get(newItem.getId());
        if (existItem!= null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already purchased this object");
        this.cart.put(newItem.getId(), newItem);
    }

    public int getNumberOfItems(){
        return this.cart.size();
    }

    public Set<String> getCartIds(){
        return this.cart.keySet();
    }
}
