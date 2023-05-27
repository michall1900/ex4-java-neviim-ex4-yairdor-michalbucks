package hac;

import hac.beans.TmdbCart;
import hac.beans.TmdbItem;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

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
}
