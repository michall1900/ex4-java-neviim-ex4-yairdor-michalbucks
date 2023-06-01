import TmdbApiFetchResultsDisplay from "../api_items_display/TmdbApiFetchResultsDisplay";
import {useHistory} from "../../../contexts/HistoryContext";

/**
 * This component is handle with displaying the search again results + back to history list button.
 * @param setSearchClicked A setter that telling to the history main display to switch between list or search results.
 * @param url A url for the current request.
 * @returns {JSX.Element}
 * @constructor
 */
export default function HistorySearchAgainDisplay({setSearchClicked, url}){
    const {history} = useHistory()
    return(
        <>
            <div className="col-12 my-2">
                <button className="btn btn-outline-dark" onClick={()=>{setSearchClicked(false)}}>
                    Back to history's list
                </button>
            </div>
            <div className="col-12 text-center my-2">
                <TmdbApiFetchResultsDisplay url={url} tvOrMovie={history.get(url).tvOrMovie}/>
            </div>
        </>
    )
}