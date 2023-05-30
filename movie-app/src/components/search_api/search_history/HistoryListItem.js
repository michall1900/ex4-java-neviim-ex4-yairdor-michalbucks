import DeleteItemButton from "../DeleteItemButton";
import SearchAgainButton from "./SearchAgainButton";
import {useHistory} from "../../../contexts/HistoryContext";

/**
 * This function is handle with displaying the history item.
 * @param searchAgain -A function that is handle with search again button press.
 * @param request - The request that need to be done when the user is clicking on search again,
 * @param details - The details about the current search.
 * @returns {JSX.Element}
 * @constructor
 */
export default function HistoryListItem({searchAgain, request, details}){
    const {dispatchHistory} = useHistory()
    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-12">
                    {details}
                </div>
                <div className="col-6 col-md-3 my-2">
                    <DeleteItemButton handleDelete={()=>{dispatchHistory({type:"DELETE", item:{request:request}})}}/>
                </div>
                <div className="col-6 col-md-3 my-2">
                    <SearchAgainButton handleSearch={()=>searchAgain(request)}/>
                </div>
            </div>
        </li>
    )
}