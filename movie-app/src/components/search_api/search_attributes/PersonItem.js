import globalConstantsModule from "../../../utilities/globalConstantsModule";
import noPicture from "../../../images/no picture.jpg";
import React from "react";

/**
 * This Component display person's item.
 * @param result Person item from tmdb.
 * @param handleSelect The function that handle with user's person select.
 * @returns {JSX.Element}
 * @constructor
 */
export default function PersonItem({result, handleSelect}){
    return(
        <li key ={`person.${result.id}`} className="dropdown-item" data-id={result.id} data-name={result.name} onClick={handleSelect}>
            <div className="row">
                <div className="col-2 col-md-3 col-lg-2">
                    <img className="img-fluid"
                         src={(result.profile_path)?`${globalConstantsModule.GET_IMAGE_URL_PREFIX}${result.profile_path}`:
                                                    `${noPicture}`}
                         alt ={`person.${result.id}`}/>
                </div>
                <div className="col-12 col-md-9 col-lg-10 text-break">
                    {result.name}
                </div>
            </div>
        </li>
    )
}