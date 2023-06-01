import ClearAllButton from "../ClearAllButton";
import {useHistory} from "../../../contexts/HistoryContext";
import HistoryListItem from "./HistoryListItem";

/**
 * This component is handle with displaying the history list.
 * @param searchAgain A function that is handle with clicking on search again.
 * @returns {JSX.Element}
 * @constructor
 */
export default function HistoryListPageDisplay({searchAgain}){

    const {history, dispatchHistory} = useHistory()
    return(
        <>
            <div className="col-12 my-2">
                <ClearAllButton handleClick={()=>{dispatchHistory({type:"DELETE_ALL"})}}/>
            </div>
            <div className="col-12 text-start my-2">
                <ul className="list-group">
                    {Array.from(history.entries()).reverse().map(([request, item], index)=>
                        <HistoryListItem request={request} details={item.details} searchAgain={searchAgain} key={`history.${index}`}/>
                    )}
                </ul>
            </div>
        </>
    )
}