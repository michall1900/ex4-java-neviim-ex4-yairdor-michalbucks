import {useHistory} from "../contexts/HistoryContext";
import ClearAllButton from "./search/ClearAllButton";
import DeleteItemButton from "./search/DeleteItemButton";
import SearchAgainButton from "./search/SearchAgainButton";

export default function History(){
    const {history, dispatchHistory} = useHistory()
    return(
        <>
            <h3>
                Search History
            </h3>
            <div className="row my-4">
                {(!!history && !!history.size)?
                (<>
                    <div className="col-12 my-2">
                        <ClearAllButton handleClick={()=>{dispatchHistory({type:"DELETE_ALL"})}}/>
                    </div>
                    <div className="col-12 text-start my-2">
                        <ul className="list-group">
                            {Array.from(history.entries()).reverse().map(([request, details], index)=>
                                <li className="list-group-item" key={`history.${index}`}>
                                    <div className="row">
                                        <div className="col-12">
                                            {details}
                                        </div>
                                        <div className="col-6 col-md-3 my-2">
                                            <DeleteItemButton handleDelete={()=>{dispatchHistory({type:"DELETE", item:{request:request}})}}/>
                                        </div>
                                        <div className="col-6 col-md-3 my-2">
                                            <SearchAgainButton />
                                        </div>
                                    </div>
                                </li>

                            )}
                        </ul>
                    </div>
                </>):
                    (<div className="col text-center fw-bolder">
                        Empty
                    </div>)
                }


            </div>
        </>

    )
}