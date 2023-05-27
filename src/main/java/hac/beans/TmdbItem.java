package hac.beans;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;

@Component
public class TmdbItem implements Serializable {
    private String id;
    private String name;
    private String overview;
    private String date;
    private String posterPath;
    private String popularity;



    public TmdbItem(){
    }

    public TmdbItem(String id, String name, String overview, String date, String posterPath, String popularity){
        if (id == null || id.length()==0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload an item without id");
        }
        this.date=date;
        this.name=name;
        this.id = id;
        this.overview = overview;
        this.popularity = popularity;
        this.posterPath = posterPath;
    }
    public void setId (String id){
        this.id = id;
    }

    public void setName (String name){
        this.name = name;
    }

    public void setOverview (String overview){
        this.overview = overview;
    }

    public void setDate (String date){
        this.date = date;
    }

    public void setPosterPath (String posterPath){
        this.posterPath = posterPath;
    }

    public void setPopularity (String popularity){
        this.popularity = popularity;
    }

    public String getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getOverview(){
        return this.overview;
    }

    public String getDate(){
        return this.date;
    }

    public String getPosterPath(){
        return this.posterPath;
    }

    public String getPopularity(){
        return this.popularity;
    }

}
