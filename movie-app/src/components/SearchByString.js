import {useEffect, useState} from "react";
import globalConstantsModule from "../utilities/globalConstantsModule";
import useDataApi from "../hooks/useDataApi";
import SelectTvOrMovie from "./SelectTvOrMovie";
import FreeTextInput from "./FreeTextInput";
import Error from "./Error";
import DisplayDataApi from "./DisplayDataApi";
import Spinner from "./Spinner";
import PriceRow from "./PriceRow";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.SEARCH_BY_NAME
export default function SearchByString({dispatchHistory}){

    const [url, setUrl] = useState(null)
    const [tvOrMovie, setTvOrMovie] = useState("")
    const [query, setQuery] = useState("")
    const [{data, isLoading, error}, doFetch] = useDataApi(url,null,null)
    const [allData, setAllData] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const handleSubmit = (event)=>{
        event.preventDefault()
        setPage(1);
        setMaxPage(1);
        setAllData([])
        let tvOrMoviePath = (tvOrMovie==="Movies")? globalConstantsModule.SEARCH_MOVIE: globalConstantsModule.SEARCH_SERIES
        setUrl(URL_PREFIX + tvOrMoviePath + globalConstantsModule.API_KEY + "&query=" + encodeURIComponent(query) +
            globalConstantsModule.ADULT_FALSE)
    }
    const handleLoadMore = ()=>{
        if ((page+1)<=maxPage){
            let newPage = page+1
            setPage(newPage)
            doFetch(`${url}&page=${newPage}`)
        }
    }
    useEffect(()=>{
        if (url) {
            doFetch(url)
            const item = {
                request: `${url}&page=${page}`,
                details: `${tvOrMovie}, search query = ${query}, page = ${page}`
            }
            dispatchHistory({type:"ADD", item:item})
        }
    },[url])

    useEffect(() => {
        if (!!data && !!data.results && (!error || !error.length)) {
            setAllData((prevAllData) => {
                if (data.page && data.page === 1) {
                    setMaxPage((data.total_pages)? data.total_pages: 1)
                    return data.results;
                } else {
                    return [...prevAllData, ...data.results];
                }
            });
        }
    }, [data]);

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
            <div className="row text-center my-2">
                <div className="col-12 my-2">
                    <Error error={error}/>
                    <DisplayDataApi data={allData} buttonsComponent={PriceRow}/>
                    <Spinner isLoading={isLoading}/>
                </div>
                {(allData&& !!allData.length) &&
                    (
                        <div className="col-12 my-2 text-center">
                            {(page===maxPage)?"There is no more data":
                                <div className="col-12 my-2 text-center">
                                    <button className="btn btn-secondary" onClick={handleLoadMore}>
                                        Load More
                                    </button>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </>


    )
}