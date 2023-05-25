import {useEffect, useState} from "react";
import globalConstantsModule from "../../utilities/globalConstantsModule";
import useDataApi from "../../hooks/useDataApi";
import SearchForm from "./SearchForm";
import Error from "../Error";
import DisplayDataApi from "../DisplayDataApi";
import Spinner from "../Spinner";
import LoadMoreButton from "./LoadMoreButton";
import {useHistory} from "../../contexts/HistoryContext";
import {useHistoryItems} from "../../contexts/HistoryItemsContext";

export default function SearchApiDisplay({urlPrefix, isByText}){
    const [url, setUrl] = useState(null)
    const [tvOrMovie, setTvOrMovie] = useState("")
    const [inputs, setInputs] = useState({})
    const [{data, isLoading, error}, doFetch] = useDataApi(url,null,null)
    const [allData, setAllData] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const {historyItems} = useHistoryItems()


    const {dispatchHistory} = useHistory()
    const handleSubmit = (event)=>{
        event.preventDefault()
        let params = new URLSearchParams(Object.entries(inputs).reduce((acc, [key, value]) => {
            if (value && value.length) {
                acc[key] = value;
            }
            return acc;
        }, {}))
        let tvOrMoviePath = (tvOrMovie==="Movies")? globalConstantsModule.SEARCH_MOVIE: globalConstantsModule.SEARCH_SERIES
        setUrl(urlPrefix + tvOrMoviePath + globalConstantsModule.API_KEY+ globalConstantsModule.ADULT_FALSE +
            `&${params.toString()}`)
    }
    const handleLoadMore = ()=>{
        if ((page+1)<=maxPage){
            let newPage = page+1
            setPage(newPage)
            doFetch(`${url}&page=${newPage}`)
        }
    }

    const makeHistoryItem = ()=>{
        const objectString =
            Object.entries(historyItems)
                .map(([key, value]) => `${key} = ${value}`)
                .join(', ');
        return {
            request: `${url}`,
            details: `${tvOrMovie}, ${objectString}`
        }

    }
    useEffect(()=>{
        if (url) {
            setPage(1);
            setMaxPage(1);
            setAllData(null);
            doFetch(url)
            dispatchHistory({type:"ADD", item:makeHistoryItem()})
        }
    },[url, dispatchHistory, doFetch])

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
            <SearchForm setTvOrMovie={setTvOrMovie} tvOrMovie={tvOrMovie} handleSubmit={handleSubmit} isByText={isByText}
                        inputs={inputs} setInputs={setInputs}/>
            <div className="row text-center my-2">
                <div className="col-12 my-2">
                    <Error error={error}/>
                    <DisplayDataApi data={allData} isBuyOption={true}/>
                    <Spinner isLoading={isLoading}/>
                </div>
                <LoadMoreButton handleLoadMore={handleLoadMore} page={page} maxPage={maxPage} allData={allData}/>
            </div>
        </>

    )
}