import useCartApi from "../../customHooks/useCartApi";
import {useEffect, useState} from "react";
import Spinner from "../Spinner";
import Error from "../Error";
import DisplayDataApi from "./apiItemsDisplay/DisplayDataApi";

export default function DisplayApiOnSearch({itemsData, isBuyOption}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()
    const [isClicked, setIsClicked] = useState(true)

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