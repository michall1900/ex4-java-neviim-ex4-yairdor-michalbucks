import ClearAllButton from "../ClearAllButton";
import {useHistory} from "../../../contexts/HistoryContext";
import HistoryListItem from "./HistoryListItem";

export default function HistoryListPageDisplay({searchAgain}){

    const {history, dispatchHistory} = useHistory()
    return(
        <>
            <div className="col-12 my-2">
                <ClearAllButton handleClick={()=>{dispatchHistory({type:"DELETE_ALL"})}}/>
            </div>
            <div className="col-12 text-start my-2">
                <ul className="list-group">
                    {Array.from(history.entries()).reverse().map(([request, details], index)=>
                        <HistoryListItem request={request} details={details} searchAgain={searchAgain} index={index}/>
                    )}
                </ul>
            </div>
        </>
    )
}