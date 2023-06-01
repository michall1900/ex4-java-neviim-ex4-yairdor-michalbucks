package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.annotation.SessionScope;

import java.util.concurrent.locks.ReentrantReadWriteLock;
/**
 * <h2>BeanConfiguration</h2>
 * <div>
 *      All the needed configurations.
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@Configuration
public class BeanConfiguration {
    /**
     *
     * @return The cart in the session scope
     */
    @Bean
    @SessionScope
    public TmdbCart newTmdbCart(){
        return new TmdbCart();
    }

    /**
     *
     * @return A read write lock, global for the purchase db.
     */
    @Bean
    @Scope
    public ReentrantReadWriteLock getDbLock(){
        return new ReentrantReadWriteLock();
    }
}
