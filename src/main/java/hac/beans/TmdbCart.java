package hac.beans;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.locks.ReentrantReadWriteLock;


/**
 * <h2>TmdbCart</h2>
 * <div>
 *     A component that handle with the cart. It saves in a HashMap all the items.
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@Component
public class TmdbCart implements Serializable {
    /**A hash map holds the cart items*/
    private HashMap<String, TmdbItem> cart;
    /**A lock for the cart*/
    private ReentrantReadWriteLock readWriteLock;

    /**An error message telling the deletion is done with existed item.*/
    final private String ITEM_NOT_EXIST_ERROR = "You already delete this item";
    /**An error message telling the item already exists.*/
    final private String ITEM_EXIST = "You already purchased this item";

    /**An error message telling the cart is empty.*/
    final private String CART_EMPTY ="The cart is empty";
    /**
     * A default c-tor
     */
    public TmdbCart(){
        this.cart = new HashMap<>();
        this.readWriteLock = new ReentrantReadWriteLock();
    }

    /**
     * Return the cart
     * @return the cart
     */
    public HashMap<String, TmdbItem> getCart(){
        readWriteLock.readLock().lock();
        try{
            return cart;
        }
        finally {
            readWriteLock.readLock().unlock();
        }
    }

    /**
     * Set the cart
     * @param newCart a cart item (Hash map of &lt;String, TmdbItem&gt;)
     */
    public void setCart(HashMap<String, TmdbItem> newCart){
        readWriteLock.writeLock().lock();
        this.cart = newCart;
        readWriteLock.writeLock().unlock();
    }

    /**
     * Return the readWriteLock
     * @return the readWriteLock
     */
    public ReentrantReadWriteLock getReadWriteLock(){
        readWriteLock.readLock().lock();
        try {
            return this.readWriteLock;
        }
        finally {
            readWriteLock.readLock().unlock();
        }
    }

    /**
     * Set the read/write lock
     * @param newReadWriteLock ReentrantReadWriteLock
     */
    public void setReadWriteLock(ReentrantReadWriteLock newReadWriteLock){
        readWriteLock.writeLock().lock();
        this.readWriteLock = newReadWriteLock;
        readWriteLock.writeLock().unlock();
    }

    /**
     * A function that adding TMDB item to the cart.
     * @param newItem Tmdb item
     * @throws ResponseStatusException If the item exist.
     */
    public void add (TmdbItem newItem){
        readWriteLock.writeLock().lock();
        if (this.isItemExist(newItem.getId())) {
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,ITEM_EXIST );
        }
        this.cart.put(newItem.getId(), newItem);
        readWriteLock.writeLock().unlock();
    }

    /**
     * Return the number of items in the cart
     * @return Number of items.
     */
    public int getNumberOfItems(){
        if (!readWriteLock.isWriteLockedByCurrentThread())
            readWriteLock.readLock().lock();
        try{
            return this.cart.size();
        }
        finally {
            if (!readWriteLock.isWriteLockedByCurrentThread())
                readWriteLock.readLock().unlock();
        }
    }

    /**
     * Return the ids in the cart.
     * @return ids in the cart Set&lt;String&gt;
     */
    public Set<String> getCartIds(){
        if (!readWriteLock.isWriteLockedByCurrentThread())
            readWriteLock.readLock().lock();
        try{
            return this.cart.keySet();
        }
        finally {
            if (!readWriteLock.isWriteLockedByCurrentThread())
                readWriteLock.readLock().unlock();
        }
    }

    /**
     * Delete the item with the given id.
     * @param id the wanted item to delete.
     * @throws  ResponseStatusException if the item is not exist.
     */
    public void deleteItem(String id){
        readWriteLock.writeLock().lock();
        if (!this.isItemExist(id)) {
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ITEM_NOT_EXIST_ERROR);
        }
        this.cart.remove(id);
        readWriteLock.writeLock().unlock();
    }

    /**
     * Empty the cart
     * @throws ResponseStatusException If the cart is already empty.
     */
    public void emptyCart() {
        if (!readWriteLock.isWriteLockedByCurrentThread())
            readWriteLock.writeLock().lock();
        try {
            if (this.getNumberOfItems() == 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,CART_EMPTY );
            }
            this.cart = new HashMap<>();
        } finally {
            if (!readWriteLock.isWriteLockedByCurrentThread())
                readWriteLock.writeLock().unlock();
        }
    }

    /**
     * Return true if the item exist in the cart.
     * @param id the id of the wanted item to check if it is exists.
     * @return true if it is existed, otherwise false
     */
    private boolean isItemExist(String id){
        if (!readWriteLock.isWriteLockedByCurrentThread())
            readWriteLock.readLock().lock();
        try{
            return this.cart.get(id)!= null;
        }
        finally {
            if (!readWriteLock.isWriteLockedByCurrentThread())
                readWriteLock.readLock().unlock();
        }
    }
}
