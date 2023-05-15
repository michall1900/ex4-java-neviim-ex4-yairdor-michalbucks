import {useEffect, useState} from "react";
import globalConstantsModule from "../utilities/globalConstantsModule";
import useDataApi from "../hooks/useDataApi";
import SelectTvOrMovie from "./SelectTvOrMovie";
import FreeTextInput from "./FreeTextInput";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.SEARCH_BY_NAME
export default function SearchByString(){

    const [url, setUrl] = useState(null)
    const [tvOrMovie, setTvOrMovie] = useState("")
    const [query, setQuery] = useState("")
    const [{newData, isLoading, error}, doFetch] = useDataApi(url,null,null)
    const [allData, setAllData] = useState([])
    const [page, setPage] = useState(1)
    const handleSubmit = (event)=>{
        event.preventDefault()
        let tvOrMoviePath = (tvOrMovie==="Movies")? globalConstantsModule.SEARCH_MOVIE: globalConstantsModule.SEARCH_SERIES
        setUrl(URL_PREFIX + tvOrMoviePath + globalConstantsModule.API_KEY + "&query=" + encodeURIComponent(query) +
            globalConstantsModule.ADULT_FALSE +"&page=" +page)
    }

    useEffect(()=>{
        doFetch(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url])

    useEffect(() => {
        if (!!newData && newData.results) {
            setAllData((prevAllData) => {
                if (newData.page === 1) {
                    return newData.results;
                } else {
                    return [...prevAllData, ...newData.results];
                }
            });
        }
    }, [newData]);

    return(
        <>
            <h3>
                Search by free text
            </h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row text-center my-2">
                    <div className="col-12 col-sm-4 my-2">
                        <SelectTvOrMovie tvOrMovie={tvOrMovie} setTvOrMovie={setTvOrMovie}/>
                    </div>
                    <div className="col-12 col-sm-6 my-2">
                        <FreeTextInput query={query} setQuery={setQuery}/>
                    </div>
                    <div className="col-12 text-center col-sm-2 my-2">
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </div>
                </div>
            </form>
        </>


    )
}