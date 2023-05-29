import MovieAndSeriesItem from "./MovieAndSeriesItem";
import PriceRow from "../PriceRow";

export default function DisplayDataApi({itemsData, isBuyOption, idsData, setIsClicked}){
    return(
        <ul className="list-group text-center">
            {itemsData && itemsData.map((value, key) =>
                <li className="list-group-item bg-light bg-opacity-75" key={key}>
                    <MovieAndSeriesItem value={value} index={key}/>
                    <PriceRow itemData={value} setIsClicked={setIsClicked} isBuyOption = {isBuyOption}
                                            isInCart={idsData && idsData.includes(value.id.toString())}/>
                </li>
            )}
        </ul>

    )
}