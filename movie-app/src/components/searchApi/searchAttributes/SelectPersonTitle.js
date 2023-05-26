import React from "react";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

export default function SelectPersonTitle({inputs, handleDelete}){
    const {historyItems} = useHistoryItems()
    return(
        <div className="fw-bolder text-start">
            {!!inputs.with_cast?(
                    <>
                        You chose <span className="fw-bold">{historyItems["with cast"]}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-circle ms-1" viewBox="0 0 16 16" onClick={handleDelete}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                        </svg>

                    </>)
                :
                ("Select Person")}
        </div>
    )
}