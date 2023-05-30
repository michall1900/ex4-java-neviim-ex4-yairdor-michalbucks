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

    private ReentrantReadWriteLock readWriteLock;

    public TmdbCart(){
        this.cart = new HashMap<>();
        this.readWriteLock = new ReentrantReadWriteLock();
    }


    public HashMap<String, TmdbItem> getCart(){
        readWriteLock.readLock().lock();
        try{
            return cart;
        }
        finally {
            readWriteLock.readLock().unlock();
        }
    }

    public void setCart(HashMap<String, TmdbItem> newCart){
        readWriteLock.writeLock().lock();
        this.cart = newCart;
        readWriteLock.writeLock().unlock();
    }

    public ReentrantReadWriteLock getReadWriteLock(){
        readWriteLock.readLock().lock();
        try {
            return this.readWriteLock;
        }
        finally {
            readWriteLock.readLock().unlock();
        }
    }

    public void setReadWriteLock(ReentrantReadWriteLock newReadWriteLock){
        readWriteLock.writeLock().lock();
        this.readWriteLock = newReadWriteLock;
        readWriteLock.writeLock().unlock();
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
        if (!readWriteLock.isWriteLockedByCurrentThread())
            readWriteLock.writeLock().lock();
        if (this.getNumberOfItems() ==0){
            readWriteLock.writeLock().unlock();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The cart is empty");
        }
        this.cart = new HashMap<>();
        readWriteLock.writeLock().unlock();
    }

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
