import MovieAndSeriesItem from "./MovieAndSeriesItem";
import PriceRow from "../PriceRow";
import useCartApi from "../../../customHooks/useCartApi";
import {useEffect, useState} from "react";

export default function DisplayDataApi({itemsData, isBuyOption}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()
    const [isClicked, setIsClicked] = useState(true)
    useEffect(()=>{
        if (isClicked){
            dispatchCartOperation({type:"GET_IDS"})
            setIsClicked(false)
        }
    }, [isClicked, dispatchCartOperation])


    return(
        <ul className="list-group text-center">
            {itemsData && itemsData.map((value, key) =>
                <li className="list-group-item bg-light bg-opacity-75" key={key}>
                    <MovieAndSeriesItem value={value} index={key}/>
                    {isBuyOption? <PriceRow itemData={value} setIsClicked={setIsClicked}
                                            isInCart={data && data.includes(value.id.toString())}/>: ""}
                </li>
            )}
        </ul>

    )
}