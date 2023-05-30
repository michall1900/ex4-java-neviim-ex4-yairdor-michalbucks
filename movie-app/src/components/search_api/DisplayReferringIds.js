import useCartApi from "../../custom_hooks/useCartApi";
import {useEffect, useState} from "react";
import Spinner from "../Spinner";
import Error from "../Error";
import DisplayDataApi from "./api_items_display/DisplayDataApi";

/**
 * This component is displaying the search results by referring to the ids
 * @param itemsData - the items' list
 * @param isBuyOption - a boolean says if it is with buy option or not.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DisplayReferringIds({itemsData, isBuyOption}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()
    const [isClicked, setIsClicked] = useState(true)

    /**
     * This effect is handle with success with adding to the cart.
     */
    useEffect(()=>{
        if (isClicked){
            dispatchCartOperation({type:"GET_IDS"})
            setIsClicked(false)
        }
    }, [isClicked, dispatchCartOperation])

    return(
        <div className="row">
            {(isLoading || !!error) &&(
                <div className="col-12 my-2">
                    <Spinner isLoading={isLoading}/>
                    <Error error={error}/>
                </div>
            )}
            <div className="col-12 my-2">
                <DisplayDataApi itemsData={itemsData} isBuyOption={isBuyOption} idsData = {data} setIsClicked={setIsClicked}/>
            </div>
        </div>
    )
}