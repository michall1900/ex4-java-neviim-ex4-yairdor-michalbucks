package hac.beans;

import hac.repo.Purchase;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * <h2>PurchaseRequest component</h2>
 * <div>
 *     Handle with the purchase request - receives purchase object and set of ids (string).
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@Component
public class PurchaseRequest implements Serializable {
    /**A purchase object*/
    private Purchase purchase;
    /**Checking if the ids Set is valid*/
    @NotEmpty(message = "ids array is mandatory")
    @NotNull(message = "ids array is mandatory")
    private Set<String> ids;

    /**
     * default c-tor
     */
    public PurchaseRequest(){}

    /**
     * A c-tor receives purchase object and ids set.
     * @param purchase A purchase object
     * @param ids ids set
     */
    public PurchaseRequest(Purchase purchase, HashSet<String> ids){
        setPurchase(purchase);
        setIds(ids);

    }

    /**
     * Return the current purchase
     * @return current purchase
     */
    public Purchase getPurchase() {
        return purchase;
    }

    /**
     * Set the purchase object
     * @param purchase a purchase object
     */
    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }
    /**
     * Return the current ids set
     * @return current ids set
     */
    public Set<String> getIds() {
        return ids;
    }
    /**
     * Set the ids set
     * @param ids a ids set
     */
    public void setIds(HashSet<String> ids) {
        this.ids = ids;
    }

    /**
     * This method checks if two sets of ids are equal. return the answer.
     * @param ids Set&lt;String&gt; of ids.
     * @return True if they are equals or false otherwise.
     */
    public boolean areIdsEqual(Set<String> ids){
        return this.ids.equals(ids);
    }
}
