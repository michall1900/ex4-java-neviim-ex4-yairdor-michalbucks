import {useCallback, useEffect, useState} from "react";
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import SearchForm from "../SearchForm";
import {useHistory} from "../../../contexts/HistoryContext";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";
import ApiFetchResultsDisplay from "./ApiFetchResultsDisplay";

export default function SearchApiDisplay({urlPrefix, isByText}){
    const [url, setUrl] = useState(null)
    const [tvOrMovie, setTvOrMovie] = useState("")
    const [inputs, setInputs] = useState({})
    const {historyItems} = useHistoryItems()

    const {dispatchHistory} = useHistory()

    const makeUrlSearchParams =()=>{
        return new URLSearchParams(Object.entries(inputs).reduce((acc, [key, value]) => {
            if (value && value.length) {
                acc[key] = value;
            }
            return acc;
        }, {}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        let params = makeUrlSearchParams()
        let tvOrMoviePath = (tvOrMovie==="Movies")? globalConstantsModule.SEARCH_MOVIE: globalConstantsModule.SEARCH_SERIES
        setUrl(urlPrefix + tvOrMoviePath + globalConstantsModule.API_KEY+ globalConstantsModule.ADULT_FALSE +
            `&${params.toString()}`)
    }

    const makeHistoryItem = useCallback(()=>{
        const objectString =
            Object.entries(historyItems)
                .map(([key, value]) => `${key} = ${value}`)
                .join(', ');
        return {
            request: `${url}`,
            details: `${tvOrMovie}, ${objectString}`
        }
    },[ tvOrMovie, url, historyItems])

    useEffect(()=>{


        if (url)
            dispatchHistory({type:"ADD", item:makeHistoryItem()})
    },[url, dispatchHistory, makeHistoryItem])




    return(
        <>
            <SearchForm setTvOrMovie={setTvOrMovie} tvOrMovie={tvOrMovie} handleSubmit={handleSubmit} isByText={isByText}
                        inputs={inputs} setInputs={setInputs}/>
            <ApiFetchResultsDisplay url={url}/>
        </>

    )
}