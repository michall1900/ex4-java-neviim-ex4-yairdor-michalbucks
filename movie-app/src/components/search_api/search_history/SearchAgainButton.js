
import {BsSearch} from "react-icons/bs";

/**
 * This component is display the search button.
 * @param handleSearch A function that handling with search button's click.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchAgainButton({handleSearch}){

    return(
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleSearch}>
            <BsSearch className="me-2"/>
            Search Again
        </button>
    )
}