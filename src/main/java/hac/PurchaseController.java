package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    @Resource(name="newTmdbCart")
    private TmdbCart cartSession;
    //======================================================
    @GetMapping(value="")
    public HashMap<String, TmdbItem> test(){
        return this.cartSession.getCart();
    }
}
