import {BsTrash} from "react-icons/bs";

export default function ClearAllButton({handleClick}){

    return(
        <button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>
            <BsTrash className="me-2"/>
            Clear All
        </button>
    )
}