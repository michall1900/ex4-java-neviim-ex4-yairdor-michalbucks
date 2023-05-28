import {useEffect, useReducer} from "react";
import useDataApi from "./useDataApi";

const URL_PREFIX = "/api/cart"
const counterReducer = (state, action) => {
    let content = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    switch (action.type) {
        case 'ADD': {
            content.method = "POST"
            content.body = JSON.stringify(action.item)

            return {...state, url:URL_PREFIX, content:content}
        }
        case 'DELETE': {
            content.method = "DELETE"
            return {...state, url:`${URL_PREFIX}/item/${action.id}`, content:content};
        }
        case 'DELETE_ALL': {
            content.method = "DELETE"
            return {...state, url:`${URL_PREFIX}`, content:content};

        }
        case 'GET_ITEMS':{
            return {...state, url:`${URL_PREFIX}`, content:null};
        }

        case 'GET_IDS':{
            return {...state, url:`${URL_PREFIX}/ids`, content:null}
        }
        default:
            throw Error('Invalid counter handler choice');
    }
};

const useCartApi = ()=>{

    const [cartOperation, dispatchCartOperation] =  useReducer(counterReducer, {url:null, content: null})
    const [{data, isLoading, error}, doFetch, setFetchTrigger, setContent] = useDataApi(null, null, null)


    useEffect(()=>{
        if (cartOperation.url){
            setContent(cartOperation.content)
            doFetch(cartOperation.url)
            setFetchTrigger(true)
        }

    }, [cartOperation, doFetch, setContent, setFetchTrigger])


    return {data, isLoading, error, dispatchCartOperation}
}

export default useCartApi