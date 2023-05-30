import React, {useCallback, useEffect, useState} from 'react';
import Select from 'react-select';
import useDataApi from "../../../custom_hooks/useDataApi";
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import Error from "../../Error";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

/**
 * This component handles with select genre select component.
 * @param setInputs To set the user's input when the user is select something.
 * @param tvOrMovie To know what kind of genres there is need to fetch.
 * @returns {JSX.Element}
 * @constructor
 */
const SelectGenre = ({setInputs, tvOrMovie}) => {
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null,null,null)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [labels, setLabels] = useState([])

    const {setHistoryItems} = useHistoryItems()

    /**
     * This function is getting the genres' list from the tmdb server.
     * @type {(function(): void)|*}
     */
    const getGenres = useCallback(()=>{
        if (tvOrMovie){
            let genrePath = (tvOrMovie==="Movies")? globalConstantsModule.MOVIE_GENRE_LIST_PATH:
                globalConstantsModule.SERIES_GENRE_LIST_PATH
            doFetch(`${globalConstantsModule.API_URL_PREFIX}${genrePath}${globalConstantsModule.API_KEY}`)
            setFetchTrigger(true)
            //doFetch(`${globalConstantsModule.API_URL_PREFIX}`)
        }
    },[tvOrMovie, doFetch, setFetchTrigger])

    /**
     * This effect is making the function getGenres work when there is a change on tvOrMovie.
     */
    useEffect(()=>{
        getGenres();
    },[getGenres])

    /**
     * This effect handle with the received genres.
     */
    useEffect(()=>{
        if(data&& data.genres)
            setLabels(data.genres.map((item) => {
                return {value:item.id, label:item.name}}))
        else(
            setLabels([])
        )
    },[data])


    /**
     * This effect is handle with the user's selected genres - insert them to inputs and history item.
     */
    useEffect(()=>{
        let inputString =""
        let historyString = ""
        selectedGenres.forEach((val)=>{
            inputString +=`${(inputString.length)? ",":""}${val.value}`;
            historyString += `${(historyString.length)? ", ":""}${val.label}`;
        })
        setInputs((prevInputs)=>
            ({...prevInputs, with_genres: inputString})
        )
        setHistoryItems((prevHistory)=> {
            if (historyString.length)
                return {...prevHistory, "with genres":historyString}
            delete prevHistory["with genres"]
            return prevHistory
        })


    },[selectedGenres, setHistoryItems, setInputs])

    return (

        <div className="text-start">
            <div className="fw-bolder">
                <div>Select Genres</div>
            </div>
            {(!!data) && (data.genres)?
                (
                    <Select
                        isMulti
                        options={labels}
                        value={selectedGenres}
                        onChange={setSelectedGenres}
                        isLoading={isLoading}
                        closeMenuOnSelect={false}
                        placeholder="Search By Genres"
                    />
                ):
                <div className="my-2">
                    <Error error={(error && error.length)? "Error: Cannot load genres from TMDB":null}/>
                </div>

            }

        </div>
    );
};

export default SelectGenre;