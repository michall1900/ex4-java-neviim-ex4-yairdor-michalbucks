import {useCallback, useEffect, useState} from "react";
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import SearchForm from "../SearchForm";
import {useHistory} from "../../../contexts/HistoryContext";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";
import TmdbApiFetchResultsDisplay from "./TmdbApiFetchResultsDisplay";

/**
 * This component handle with the functionality of the search pages and display them
 * @param urlPrefix The prefix of the url that need to be searched for.
 * @param isByText A boolean that says if there is need to call to "Search by free text" or search by attributes.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchTmdbApiDisplay({urlPrefix, isByText}){
    const [url, setUrl] = useState(null)
    const [tvOrMovie, setTvOrMovie] = useState("")
    const [inputs, setInputs] = useState({})
    const {historyItems} = useHistoryItems()
    const [isSubmittedFirstTime, setIsSubmittedFirstTime] = useState(false)

    const {dispatchHistory} = useHistory()


    /**
     * This function is making the url parameters. It removes null inputs.
     * @returns {module:url.URLSearchParams}
     */
    const makeUrlSearchParams =()=>{
        return new URLSearchParams(Object.entries(inputs).reduce((acc, [key, value]) => {
            if (value && value.length) {
                acc[key] = value;
            }
            return acc;
        }, {}))
    }

    /**
     * This function is handle with the submitting of the search form. It orders the inputs and add the relevant
     * things to the url.
     * @param event
     */
    const handleSubmit = (event)=>{
        event.preventDefault()
        let params = makeUrlSearchParams()
        let tvOrMoviePath = (tvOrMovie==="Movies")? globalConstantsModule.SEARCH_MOVIE: globalConstantsModule.SEARCH_SERIES
        // setUrl(urlPrefix + tvOrMoviePath + globalConstantsModule.API_KEY+ globalConstantsModule.ADULT_FALSE +
        //     `&${params.toString()}`)
        setUrl(urlPrefix + tvOrMoviePath + globalConstantsModule.API_KEY+ globalConstantsModule.ADULT_FALSE +
            `&${params.toString()}`)
        setIsSubmittedFirstTime(true)
    }
    /**
     * This function is making the history item.
     * @type {function(): {request: string, details: string}}
     */
    const makeHistoryItem = useCallback(()=>{
        const objectString =
            Object.entries(historyItems)
                .map(([key, value]) => `${key} = ${value}`)
                .join(', ');
        return {
            request: `${url}`,
            details: `${tvOrMovie}, ${objectString}`,
            tvOrMovie:tvOrMovie
        }
    },[ tvOrMovie, url, historyItems])

    /**
     * This effect is adding the history item when there is need to (new search).
     */
    useEffect(()=>{
        if (url && isSubmittedFirstTime){
            dispatchHistory({type:"ADD", item:makeHistoryItem()})
            setIsSubmittedFirstTime(false)
        }
    },[url, isSubmittedFirstTime, dispatchHistory, makeHistoryItem])



    return(
        <>
            <SearchForm setTvOrMovie={setTvOrMovie} tvOrMovie={tvOrMovie} handleSubmit={handleSubmit} isByText={isByText}
                        inputs={inputs} setInputs={setInputs}/>
            <TmdbApiFetchResultsDisplay url={url} tvOrMovie={tvOrMovie}/>
        </>

    )
}