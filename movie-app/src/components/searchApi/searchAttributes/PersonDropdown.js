import Error from "../../Error";
import Spinner from "../../Spinner";
import PersonItem from "./PersonItem";
import React, {useCallback, useEffect} from "react";
import useDataApi from "../../../customHooks/useDataApi";
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

export default function PersonDropdown({setSearchTerm, isDropdownOpen, setDropdownOpen, searchTerm, setInputs}){
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null,null,null)
    const {setHistoryItems} = useHistoryItems()

    const fetchData = useCallback(()=>{
        doFetch(`${globalConstantsModule.API_URL_PREFIX}${globalConstantsModule.SEARCH_BY_NAME}`+
            `${globalConstantsModule.PERSON_PATH}${globalConstantsModule.API_KEY}`+
            `${globalConstantsModule.ADULT_FALSE}&query=${encodeURI(searchTerm)}`)
        setFetchTrigger(true)
    },[searchTerm, doFetch, setFetchTrigger])


    useEffect(()=>{
        fetchData()
    },[fetchData])

    const handleChange = (event)=>{
        event.stopPropagation();
        const {value} = event.target
        setSearchTerm(value)

        if (!isDropdownOpen)
            setDropdownOpen(true)
    }

    const handleSelect =(event)=>{
        event.stopPropagation(); // Stop event propagation
        const {id,name} = event.currentTarget.dataset
        setInputs((prevInputs)=>
            ({...prevInputs, "with_cast":id})
        )

        setHistoryItems((prevHistory)=>(
            {...prevHistory, "with cast": name}
        ))
        setSearchTerm(name)
        setDropdownOpen(false);

    }
    const handleInputClick = (event)=>{
        event.stopPropagation();
        setDropdownOpen(true)
    }

    return(
        <div className="dropdown" >
            <input className={`form-control dropdown ${isDropdownOpen ? "show" : ""}`} type="text"
                   aria-expanded={isDropdownOpen? "true":"false"} role="button"
                   onChange={handleChange} onClick={handleInputClick} value={searchTerm}
                   name="query" placeholder="Search person" autoComplete="off"/>


            <ul className={`dropdown-menu overflow-auto ${isDropdownOpen ? "show" : ""} text-start`}
                style={{"maxHeight": "200px"}}>
                {(!!error || isLoading)&&
                    <li className="dropdown-item">
                        <Error error={error}/>
                        <Spinner isLoading={isLoading}/>
                    </li>
                }
                {(!!data && !!data.results && !!data.results.length) &&
                    data.results.map((result)=>
                        <PersonItem result={result} handleSelect={handleSelect} key ={`personItem.${result.id}`}/>
                    )
                }
                {(!error && !isLoading && (!data || !data.results || data.results.length === 0))&&
                    <li className="dropdown-item">
                        No results
                    </li>
                }
            </ul>
        </div>
    )
}