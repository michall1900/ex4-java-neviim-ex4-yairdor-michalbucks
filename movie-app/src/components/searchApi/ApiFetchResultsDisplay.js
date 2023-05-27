import useDataApi from "../../customHooks/useDataApi";
import {useEffect, useState} from "react";
import Error from "../Error";
import DisplayDataApi from "./DisplayDataApi";
import Spinner from "../Spinner";
import LoadMoreButton from "./LoadMoreButton";

export default function ApiFetchResultsDisplay({url}){
    const [{data, isLoading, error}, doFetch] = useDataApi(url,null,null)
    const [allData, setAllData] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)


    const handleLoadMore = ()=>{
        if ((page+1)<=maxPage){
            let newPage = page+1
            setPage(newPage)
            doFetch(`${url}&page=${newPage}`)
        }
    }

    useEffect(()=>{
        if (url) {
            setPage(1);
            setMaxPage(1);
            setAllData(null);
            doFetch(url)
        }
    },[url, doFetch])

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
    }, [data, error]);

    return(
        <div className="row text-center my-2">
            <div className="col-12 my-2">
                <Error error={error}/>
                <DisplayDataApi data={allData} isBuyOption={true}/>
                <Spinner isLoading={isLoading}/>
            </div>
            <LoadMoreButton handleLoadMore={handleLoadMore} page={page} maxPage={maxPage} allData={allData}/>
        </div>
    )
}