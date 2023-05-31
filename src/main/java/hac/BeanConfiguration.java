package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.annotation.SessionScope;

import java.util.concurrent.locks.ReentrantReadWriteLock;
/**
 * <h2></h2>
 * <div>
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@Configuration
public class BeanConfiguration {
    @Bean
    @SessionScope
    public TmdbItem newTmdbItem(){
        return new TmdbItem();
    }

    @Bean
    @SessionScope
    public TmdbCart newTmdbCart(){
        return new TmdbCart();
    }

    @Bean
    @Scope
    public ReentrantReadWriteLock getDbLock(){
        return new ReentrantReadWriteLock();
    }
}
