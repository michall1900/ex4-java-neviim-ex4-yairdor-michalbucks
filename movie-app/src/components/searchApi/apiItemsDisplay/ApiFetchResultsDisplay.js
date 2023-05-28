import useDataApi from "../../../customHooks/useDataApi";
import {useEffect, useState} from "react";
import Error from "../../Error";
import DisplayDataApi from "./DisplayDataApi";
import Spinner from "../../Spinner";
import LoadMoreButton from "./LoadMoreButton";

export default function ApiFetchResultsDisplay({url}){
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(url,null,null)
    const [allData, setAllData] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)


    const handleLoadMore = ()=>{
        if ((page+1)<=maxPage){
            let newPage = page+1
            setPage(newPage)
            setFetchTrigger(true)
            doFetch(`${url}&page=${newPage}`)
        }
    }

    useEffect(()=>{
        if (url) {
            setPage(1);
            setMaxPage(1);
            setAllData(null);
            doFetch(url)
            setFetchTrigger(true)
        }
    },[url, doFetch, setFetchTrigger])

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
                <DisplayDataApi itemsData={allData} isBuyOption={true}/>
                <Spinner isLoading={isLoading}/>
            </div>
            <LoadMoreButton handleLoadMore={handleLoadMore} page={page} maxPage={maxPage} allData={allData}/>
        </div>
    )
}