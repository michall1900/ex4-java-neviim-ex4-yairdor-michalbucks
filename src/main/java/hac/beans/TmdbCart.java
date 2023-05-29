package hac.beans;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Component
public class TmdbCart implements Serializable {
    private HashMap<String, TmdbItem> cart;

    private ReentrantReadWriteLock readWriteLock = new ReentrantReadWriteLock();

    public TmdbCart(){
        this.cart = new HashMap<>();
    }


    public HashMap<String, TmdbItem> getCart(){
        readWriteLock.readLock().lock();
        HashMap<String, TmdbItem> currentCart = cart;
        readWriteLock.readLock().unlock();
        return currentCart;
    }

    public void setCart(HashMap<String, TmdbItem> newCart){
        readWriteLock.writeLock().lock();
        this.cart = newCart;
        readWriteLock.writeLock().unlock();
    }

    public ReentrantReadWriteLock getReadWriteLock(){
        return this.readWriteLock;
    }

    public void setReadWriteLock(ReentrantReadWriteLock newReadWriteLock){
        this.readWriteLock = newReadWriteLock;
    }

    public void add (TmdbItem newItem){
        readWriteLock.writeLock().lock();
        if (this.isItemExist(newItem.getId())) {
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already purchased this item");
        }
        this.cart.put(newItem.getId(), newItem);
        readWriteLock.writeLock().unlock();
    }

    public int getNumberOfItems(){
        if (!readWriteLock.isWriteLockedByCurrentThread()) {
            readWriteLock.readLock().lock();
            int size =  this.cart.size();
            readWriteLock.readLock().unlock();
            return size;
        }
        return this.cart.size();
    }

    public Set<String> getCartIds(){
        readWriteLock.readLock().lock();
        Set<String> keys = this.cart.keySet();
        readWriteLock.readLock().unlock();
        return keys;
    }

    public void deleteItem(String id){
        readWriteLock.writeLock().lock();
        if (!this.isItemExist(id)) {
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already delete this item");
        }
        this.cart.remove(id);
        readWriteLock.writeLock().unlock();
    }

    public void emptyCart(){
        readWriteLock.writeLock().lock();
        if (this.getNumberOfItems() ==0){
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The cart is already empty");
        }
        this.cart = new HashMap<>();
        readWriteLock.writeLock().unlock();
    }

    private boolean isItemExist(String id){
        if (!readWriteLock.isWriteLockedByCurrentThread()) {
            readWriteLock.readLock().lock();
            boolean answer =  this.cart.get(id)!= null;
            readWriteLock.readLock().unlock();
            return answer;
        }
        return this.cart.get(id)!= null;
    }
}
