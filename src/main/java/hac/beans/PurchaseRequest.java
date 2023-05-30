package hac.beans;

import hac.repo.Purchase;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class PurchaseRequest implements Serializable {
    private Purchase purchase;

    @NotEmpty(message = "ids array is mandatory")
    @NotNull(message = "ids array is mandatory")
    private Set<String> ids;


    public PurchaseRequest(){
        System.out.println("purchase default con");
    }
    public PurchaseRequest(Purchase purchase, HashSet<String> ids){
        setPurchase(purchase);
        setIds(ids);

    }
    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Set<String> getIds() {
        return ids;
    }

    public void setIds(HashSet<String> ids) {
        this.ids = ids;
    }

    public boolean areIdsEqual(Set<String> ids){
        return this.ids.equals(ids);
    }
}
