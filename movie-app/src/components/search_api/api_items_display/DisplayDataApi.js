import MovieAndSeriesItem from "./MovieAndSeriesItem";
import PriceRow from "../PriceRow";

/**
 * This component is handle with the displaying of each element of tmds (including those coming from the server).
 * @param itemsData All of the items that should be display
 * @param isBuyOption A boolean says if there is a buy option here (false telling that deleted button is needed).
 * @param idsData An array with all the ids in the cart
 * @param setIsClicked To change some things when a button clicked.
 * @param tvOrMovie for id to cart.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DisplayDataApi({itemsData, isBuyOption, idsData, setIsClicked, tvOrMovie}){
    return(
        <ul className="list-group text-center">
            {itemsData && itemsData.map((value, key) =>
                <li className="list-group-item bg-light bg-opacity-75" key={`${tvOrMovie}.${value.id.toString()}`}>
                    <MovieAndSeriesItem value={value} index={`${tvOrMovie}.${value.id.toString()}`}/>
                    <PriceRow itemData={value} setIsClicked={setIsClicked} isBuyOption = {isBuyOption}
                              isInCart={idsData && idsData.includes(`${tvOrMovie}.${value.id.toString()}`)}
                              tvOrMovie={tvOrMovie}/>
                </li>
            )}
        </ul>

    )
}