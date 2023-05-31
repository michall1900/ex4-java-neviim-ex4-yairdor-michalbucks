
import {MdClear} from "react-icons/md";

/**
 * This component is handle with displaying a delete button
 * @param handleDelete The function that the press on this button do.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DeleteItemButton({handleDelete}){
    return(
        <button type="button" className="btn btn-outline-danger btn-sm fw-bold" onClick={handleDelete}>
            <MdClear className="me-2"/>
            Delete item
        </button>
    )
}