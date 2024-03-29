import useDataApi from "../../../custom_hooks/useDataApi";
import {useEffect, useState} from "react";
import Error from "../../Error";
import Spinner from "../../Spinner";
import LoadMoreButton from "./LoadMoreButton";
import DisplayReferringIds from "../DisplayReferringIds";

/**
 * This component is handle with the display of tmdb items including the error messages/ the loading display and load
 * more button.
 * @param url The url to get the data from it.
 * @param tvOrMovie for id to cart.
 * @returns {JSX.Element}
 * @constructor
 */
export default function TmdbApiFetchResultsDisplay({url, tvOrMovie}){
    const isValidJson = (jsonData)=>{
        if (!jsonData || !jsonData.results)
            return true;
        else if (!Array.isArray(jsonData.results))
            return false;
        return jsonData.results.every((val)=> {
            function isValidDateFormat(dateCheck) {
                return (typeof dateCheck === 'string' || dateCheck instanceof String) &&
                    /^\d{4}-\d{2}-\d{2}$/.test(dateCheck) && !isNaN(Date.parse(dateCheck));
            }
            let date =  val.first_air_date ?? val.release_date??null
            return (((!!date&& isValidDateFormat(date)) || !date) && !!val.id)
        })
    }
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null,null,null,isValidJson)
    const [allData, setAllData] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    /**
     * This function is handle with pressing on load more button.
     */
    const handleLoadMore = ()=>{
        if ((page+1)<=maxPage){
            let newPage = page+1
            setPage(newPage)
            setFetchTrigger(true)
            doFetch(`${url}&page=${newPage}`)

        }
    }
    /**
     * This Effect is handle with the first time that the url is changed - reset states, fetch...
     */
    useEffect(()=>{
        if (url) {
            setPage(1);
            setMaxPage(1);
            setAllData(null);
            doFetch(url)
            setFetchTrigger(true)
        }
    },[url, doFetch, setFetchTrigger])

    /**
     * This effect handle with the new given data and set the max page parameter.
     */
    useEffect(() => {
        if (!!data && !!data.results && !error) {
            setAllData((prevAllData) => {
                if (data.page && data.page === 1) {
                    setMaxPage((data.total_pages)? data.total_pages: 1)
                    return data.results;
                } else {
                    return [...prevAllData, ...data.results];
                }
            });
        }
    }, [data, error]);

    return(
        <div className="row text-center my-2">
            <div className="col-12 my-2">
                <Error error={error}/>
                <DisplayReferringIds itemsData={allData} isBuyOption={true} tvOrMovie={tvOrMovie}/>
                <Spinner isLoading={isLoading}/>
            </div>
            <LoadMoreButton handleLoadMore={handleLoadMore} page={page} maxPage={maxPage} allData={allData}/>
        </div>
    )
}