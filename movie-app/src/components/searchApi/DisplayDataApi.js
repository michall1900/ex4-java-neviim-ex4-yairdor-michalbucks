import MovieAndSeriesItem from "./MovieAndSeriesItem";
import PriceRow from "./PriceRow";

export default function DisplayDataApi({data, isBuyOption}){

    return(
        <ul className="list-group text-center">
            {data && data.map((value, key) =>
                <li className="list-group-item bg-light bg-opacity-75" key={key}>
                    <MovieAndSeriesItem value={value} index={key}/>
                    {isBuyOption? <PriceRow itemData={value}/>: ""}
                </li>
            )}
        </ul>

    )
}