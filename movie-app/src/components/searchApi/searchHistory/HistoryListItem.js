import DeleteItemButton from "../DeleteItemButton";
import SearchAgainButton from "./SearchAgainButton";
import {useHistory} from "../../../contexts/HistoryContext";

export default function HistoryListItem({searchAgain, request, details, index}){
    const {dispatchHistory} = useHistory()
    return(
        <li className="list-group-item" key={`history.${index}`}>
            <div className="row" key={`historyRow.${index}`}>
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