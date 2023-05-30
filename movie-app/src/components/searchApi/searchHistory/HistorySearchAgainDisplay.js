import TmdbApiFetchResultsDisplay from "../apiItemsDisplay/TmdbApiFetchResultsDisplay";

export default function HistorySearchAgainDisplay({setSearchClicked, url}){

    return(
        <>
            <div className="col-12 my-2">
                <button className="btn btn-outline-dark" onClick={()=>{setSearchClicked(false)}}>
                    Back to history's list
                </button>
            </div>
            <div className="col-12 text-center my-2">
                <TmdbApiFetchResultsDisplay url={url}/>
            </div>
        </>
    )
}