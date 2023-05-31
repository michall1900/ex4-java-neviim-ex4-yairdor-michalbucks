import {useEffect, useReducer} from "react";
import useDataApi from "./useDataApi";

const URL_PREFIX = "/api/cart"
const ERROR_INVALID_CHOICE = 'Invalid counter handler choice'
/**
 * This is a reducer that handle with requests connected to the cart (in the api)
 * @param state the current state of the reducer
 * @param action The action that should be done.
 * @returns {(*&{url: string, content: {headers: {"Content-Type": string}}})|(*&{url: string, content: null})}
 * @throws Error in invalid choice. Choices are:ADD, DELETE, DELETE_ALL, GET_ITEMS, GET_IDS
 */
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
            //console.log("Add to cart ", action.item)
            return {...state, url:URL_PREFIX, content:content}
        }
        case 'DELETE': {
            content.method = "DELETE"
            //console.log("Delete item - cart -", action.id)
            return {...state, url:`${URL_PREFIX}/item/${action.id}`, content:content};
        }
        case 'DELETE_ALL': {
            content.method = "DELETE"
            //console.log("Delete all cart -")
            return {...state, url:`${URL_PREFIX}`, content:content};

        }
        case 'GET_ITEMS':{
            //console.log("Get items cart -")
            return {...state, url:`${URL_PREFIX}`, content:null};
        }

        case 'GET_IDS':{
            //console.log("Get ids cart -")
            return {...state, url:`${URL_PREFIX}/ids`, content:null}
        }
        default:
            throw Error(ERROR_INVALID_CHOICE);
    }
};
/**
 * This is a custom hook to handle with cart api.
 * @returns {{isLoading: *, dispatchCartOperation: () => void, data: *, error: *}}
 */
const useCartApi = ()=>{
    //console.log('use cart api called and render again')
    const [cartOperation, dispatchCartOperation] =  useReducer(counterReducer, {url:null, content: null});
    const [{data, isLoading, error}, doFetch, setFetchTrigger, setContent] = useDataApi(null, null, null);

    /**
     * To fetch again the data when needed.
     */
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