import {useState} from "react";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

const POPULARITY_SORT_VALUE = "popularity.desc"

/**
 * This Component is handle with sorting by popularity checkbox.
 * @param setInputs Setting the user's input when he clicks on the checkbox.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchByPopularity({setInputs}){
    const [isByPopularitySort, setPopularitySort] = useState(false);
    const {setHistoryItems} = useHistoryItems()

    /**
     * This function is handle with the checkbox change. It adds the input to the inputs structure and to the history.
     */
    const handleCheckboxChange = ()=>{
        let newByPopularity  = !isByPopularitySort
        setPopularitySort(newByPopularity)
        let forInput = null
        if (newByPopularity)
            forInput =   POPULARITY_SORT_VALUE

        setInputs((prevInputs)=>
            ({...prevInputs, "sort_by":forInput})
        )
        setHistoryItems((prevHistory)=> {
            if (newByPopularity)
                return {...prevHistory, "sort by":"popularity in descending order"}
            delete prevHistory["sort by"]
            return prevHistory
        })
    }


    return (
        <>
            <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={isByPopularitySort}
                onChange={handleCheckboxChange}
                name="sort_by"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                <div className="fw-bold">
                    Check to sort by popularity in descending order
                </div>

            </label>
        </>
    );
}