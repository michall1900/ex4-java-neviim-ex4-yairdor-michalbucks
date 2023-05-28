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

    private int timestamp; //Think about this....
    public TmdbCart(){
        this.cart = new HashMap<>();
    }


    public HashMap<String, TmdbItem> getCart(){
        return cart;
    }

    public int getTimestamp(){
        return this.timestamp;
    }
    public void setCart(HashMap<String, TmdbItem> newCart){
        this.cart = newCart;
    }

    public void setTimestamp(int timestamp){
        this.timestamp= timestamp;
    }
    public void add (TmdbItem newItem){
        if (this.isItemExist(newItem.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already purchased this item");
        this.cart.put(newItem.getId(), newItem);
    }

    public int getNumberOfItems(){
        return this.cart.size();
    }

    public Set<String> getCartIds(){
        return this.cart.keySet();
    }

    public void deleteItem(String id){
        if (!this.isItemExist(id))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already delete this item");
        this.cart.remove(id);
    }

    public void emptyCart(){
        if (this.getNumberOfItems() ==0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The cart is already empty");
        }
        this.cart = new HashMap<>();
    }

    private boolean isItemExist(String id){
        return this.cart.get(id)!= null;
    }
}
