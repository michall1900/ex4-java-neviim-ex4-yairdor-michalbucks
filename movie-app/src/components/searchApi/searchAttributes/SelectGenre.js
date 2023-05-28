import React, {useCallback, useEffect, useState} from 'react';
import Select from 'react-select';
import useDataApi from "../../../customHooks/useDataApi";
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import Error from "../../Error";
import {useHistoryItems} from "../../../contexts/HistoryItemsContext";

const SelectGenre = ({setInputs, tvOrMovie}) => {
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null,null,null)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [labels, setLabels] = useState([])

    const {setHistoryItems} = useHistoryItems()

    const getGenres = useCallback(()=>{
        if (tvOrMovie){
            let genrePath = (tvOrMovie==="Movies")? globalConstantsModule.MOVIE_GENRE_LIST_PATH:
                globalConstantsModule.SERIES_GENRE_LIST_PATH
            doFetch(`${globalConstantsModule.API_URL_PREFIX}${genrePath}${globalConstantsModule.API_KEY}`)
            setFetchTrigger(true)
            //doFetch(`${globalConstantsModule.API_URL_PREFIX}`)
        }
    },[tvOrMovie, doFetch, setFetchTrigger])

    useEffect(()=>{
        getGenres();
    },[getGenres])

    useEffect(()=>{
        if(data&& data.genres)
            setLabels(data.genres.map((item) => {
                return {value:item.id, label:item.name}}))
        else(
            setLabels([])
        )
    },[data])


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