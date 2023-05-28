import {useEffect} from "react";
import useDataApi from "../customHooks/useDataApi";

export default function CartPage(){
    const [{data,isLoading, error}, doFetch, fetchTrigger]= useDataApi(null,null,null)
    useEffect(()=>{
        console.log(data)
    },[data])
    useEffect(()=>{
        doFetch("/api/purchase")
        fetchTrigger(true)
    },[])
    return(
        <h1>
            Cart
        </h1>
    )
}