import MovieAndSeriesItem from "./MovieAndSeriesItem";

export default function DisplayDataApi({data, buttonsComponent:Buttons}){

    return(
        <ul className="list-group text-center">
            {data && data.map((value, key) =>
                <li className="list-group-item bg-light bg-opacity-75" key={key}>
                    <MovieAndSeriesItem value={value} index={key}/>
                    <Buttons itemData={value}/>
                </li>
            )}
        </ul>

    )
}