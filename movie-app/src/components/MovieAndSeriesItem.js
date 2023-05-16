import globalConstantsModule from "../utilities/globalConstantsModule";
import noPicture from "../images/no picture.jpg";
import LongTextHandler from "./LongTextHandler";

export default function MovieAndSeriesItem({value, index}){
    return(
        <div className="row text-break " key={"item." + index}>
            <div className="col-12 my-2 h4 text-start">
                {value.original_name ?? value.original_title ?? "Unknown"}
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-3 col-md-2">
                        <img className="img-fluid"
                             src={(value.poster_path)?globalConstantsModule.GET_IMAGE_URL_PREFIX + value.poster_path: noPicture}
                             alt={value.posterPath || "alt"+index}/>
                    </div>
                    <div className="col-9 col-md-10">
                        <div className="row">
                            <div className="col-12 my-2">
                                <LongTextHandler content={value.overview}/>
                            </div>
                            <div className="col-6 my-2 text-start">
                                Date : {value.first_air_date ?? value.release_date ?? "Unknown"}
                            </div>
                            <div className="col-6 my-2 text-end">
                                Popularity: {value.popularity || "Unknown"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}