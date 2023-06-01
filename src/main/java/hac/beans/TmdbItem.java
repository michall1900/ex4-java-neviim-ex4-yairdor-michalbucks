package hac.beans;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;
import java.text.ParseException;

/**
 * <h2>Tmdb item</h2>
 * <div>
 *     A component that saves the tmdb items details.
 * </div>
 * @author Yair Dor and Michal Bucks
 * @version 1.0
 * @since 2023-05-31
 */
@Component
public class TmdbItem implements Serializable {
    /**For the id, couldn't be null*/
    @NotEmpty(message = "Id is mandatory")
    @NotNull(message = "Id is mandatory")
    @Pattern(regexp = "^(Movies\\.|Series\\.)\\d+$", message = "Id must start with 'Movies.' or 'Series.' followed by digits only")
    private String id;
    /**For the name of the series*/
    private String name;
    /**For the overview*/
    private String overview;

    /**For the date*/
    private String date;
    /**For the posterPath*/
    private String posterPath;
    /**For the popularity*/
    private String popularity;
    /**For date format*/
    private final java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");

    /**
     * Default c-tor
     */
    public TmdbItem(){
    }

    /**
     * A function that is checking if the new date is in the format.
     * @param date The wanted date to insert
     * @return If the date is in the valid format
     */
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


    /**
     * A constructor that receives all data.
     * @param id The id of the item
     * @param name The name of the item
     * @param overview The overview of the item
     * @param date The date of the item
     * @param posterPath The poster path of the item.
     * @param popularity The popularity of the item
     */
    public TmdbItem(String id, String name, String overview, String date, String posterPath, String popularity){

        setDate(date);
        setName(name);
        setId(id);
        setOverview(overview);
        setPopularity(popularity);
        setPosterPath(posterPath);
    }

    /**
     * Setting the id.
     * @param id an id
     */
    public void setId (String id){
        this.id = id;
    }

    /**
     * Setting the name.
     * @param name a name
     */
    public void setName (String name){
        this.name = name;
    }
    /**
     * Setting the overview.
     * @param overview an overview
     */
    public void setOverview (String overview){
        this.overview = overview;
    }

    /**
     * Setting the date
     * @param date the wanted date
     */
    public void setDate (String date){
        if (!isValidDate(date)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload an item with invalid date (format YYYY-MM-DD)");
        }
        this.date = date;
    }

    /**
     * Setting the posterPath
     * @param posterPath the wanted posterPath
     */
    public void setPosterPath (String posterPath){
        this.posterPath = posterPath;
    }

    /**
     * Setting the popularity
     * @param popularity The wanted popularity
     */
    public void setPopularity (String popularity){
        this.popularity = popularity;
    }

    /**
     *
     * @return the id of the item.
     */
    public String getId(){
        return this.id;
    }

    /**
     *
     * @return the name of the item.
     */
    public String getName(){
        return this.name;
    }

    /**
     *
     * @return the overview of the item.
     */
    public String getOverview(){
        return this.overview;
    }

    /**
     *
     * @return the date of the item.
     */
    public String getDate(){
        return this.date;
    }

    /**
     *
     * @return the posterPath of the item.
     */
    public String getPosterPath(){
        return this.posterPath;
    }

    /**
     *
     * @return the popularity of the item.
     */
    public String getPopularity(){
        return this.popularity;
    }

}
