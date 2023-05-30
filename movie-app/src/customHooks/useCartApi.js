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
            console.log("Add to cart ", action.item)
            return {...state, url:URL_PREFIX, content:content}
        }
        case 'DELETE': {
            content.method = "DELETE"
            console.log("Delete item - cart -", action.id)
            return {...state, url:`${URL_PREFIX}/item/${action.id}`, content:content};
        }
        case 'DELETE_ALL': {
            content.method = "DELETE"
            console.log("Delete all cart -")
            return {...state, url:`${URL_PREFIX}`, content:content};

        }
        case 'GET_ITEMS':{
            console.log("Get items cart -")
            return {...state, url:`${URL_PREFIX}`, content:null};
        }

        case 'GET_IDS':{
            console.log("Get ids cart -")
            return {...state, url:`${URL_PREFIX}/ids`, content:null}
        }
        default:
            throw Error('Invalid counter handler choice');
    }
};

const useCartApi = ()=>{
    console.log('use cart api called and render again')
    const [cartOperation, dispatchCartOperation] =  useReducer(counterReducer, {url:null, content: null});
    const [{data, isLoading, error}, doFetch, setFetchTrigger, setContent] = useDataApi(null, null, null);


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