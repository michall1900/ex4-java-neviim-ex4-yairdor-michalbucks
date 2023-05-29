package hac.beans;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Component
public class TmdbItem implements Serializable {
    @NotEmpty(message = "Id is mandatory")
    @NotNull(message = "Id is mandatory")
    private String id;
    private String name;
    private String overview;

    private String date;
    private String posterPath;
    private String popularity;

    private final java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");

    public TmdbItem(){
    }
    private boolean isValidDate(String date){
        if (date==null || date.equals(""))
            return true;
        try{
            java.util.Date ret = sdf.parse(date.trim());
            return sdf.format(ret).equals(date.trim());
        }
        catch(ParseException e){
            return false;
        }

    }
    public TmdbItem(String id, String name, String overview, String date, String posterPath, String popularity){

        setDate(date);
        setName(name);
        setId(id);
        setOverview(overview);
        setPopularity(popularity);
        setPosterPath(posterPath);
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
        if (!isValidDate(date)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload an item with invalid date (format YYYY-MM-DD)");
        }
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
