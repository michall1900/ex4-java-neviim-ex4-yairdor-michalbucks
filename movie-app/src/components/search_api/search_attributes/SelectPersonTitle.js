import React from "react";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";
import {TiDelete} from "react-icons/ti";

/**
 * This component display user choice or asking to select a person.
 * @param inputs - The user's inputs.
 * @param handleDelete The function that will handel the delete press.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectPersonTitle({inputs, handleDelete}){
    const {historyItems} = useHistoryItems()
    return(
        <div className="fw-bolder text-start">
            {!!inputs.with_cast?(
                    <>
                        You chose <span className="fw-bold">{historyItems["with cast"]}</span>
                        <TiDelete onClick={handleDelete} style={{ cursor: 'pointer' }} className="ms-2"/>
                    </>)
                :
                ("Select Person")}
        </div>
    )
}