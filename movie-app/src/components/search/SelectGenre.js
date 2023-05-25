import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import useDataApi from "../../hooks/useDataApi";
import globalConstantsModule from "../../utilities/globalConstantsModule";
import Error from "../Error";
import {useHistoryItems} from "../../contexts/HistoryItemsContext";

const SelectGenre = ({setInputs, tvOrMovie, setIsValid}) => {
    const [{data, isLoading, error}, doFetch] = useDataApi(null,null,null)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [labels, setLabels] = useState([])

    const {setHistoryItems} = useHistoryItems()

    useEffect(()=>{
        if (tvOrMovie){
            let genrePath = (tvOrMovie==="Movies")? globalConstantsModule.MOVIE_GENRE_LIST_PATH:
                globalConstantsModule.SERIES_GENRE_LIST_PATH
            doFetch(`${globalConstantsModule.API_URL_PREFIX}${genrePath}${globalConstantsModule.API_KEY}`)
            //doFetch(`${globalConstantsModule.API_URL_PREFIX}`)
        }

    },[tvOrMovie])

    useEffect(()=>{
        if(data&& data.genres)
            setLabels(data.genres.map((item) => {
                return {value:item.id, label:item.name}}))
        else(
            setLabels([])
        )
    },[data])

    useEffect(()=>{
        if (error && error.length){
            setIsValid(false)
            console.log("FALSEE")
        }

        else{
            setIsValid(true)
            console.log("TRUEEE")
        }

    },[error])

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

    },[selectedGenres])
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