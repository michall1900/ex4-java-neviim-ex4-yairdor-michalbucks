import {useEffect, useReducer} from "react";
import useDataApi from "./useDataApi";

const URL_PREFIX = "/api/cart"
const ERROR_INVALID_CHOICE = 'Invalid counter handler choice'

const validateIds = (jsonObj)=>{
    if (!jsonObj)
        return true;
    return Array.isArray(jsonObj) && jsonObj.every((val)=>
        val.startsWith("Movies.") || val.startsWith("Series.")
    )
}

const validateItems = (jsonObj)=>{
    if (!jsonObj)
        return true;
    return [...Object.entries(jsonObj)].every(([key, value])=> {
        function isValidDateFormat(dateCheck) {
            return (typeof dateCheck === 'string' || dateCheck instanceof String) &&
                /^\d{4}-\d{2}-\d{2}$/.test(dateCheck) && !isNaN(Date.parse(dateCheck));
        }

        return key && /^(Movies\.|Series\.)\d+$/.test(key) && key === value.id &&
        (!value.date || (isValidDateFormat(value.date)))
    })
}
/**
 * This is a reducer that handles with requests connected to the cart (in the api)
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
            return {...state, url:URL_PREFIX, content:content, validFunc: null}//, trigger:state.content===content}
        }
        case 'DELETE': {
            content.method = "DELETE"
            //console.log("Delete item - cart -", action.id)
            return {...state, url:`${URL_PREFIX}/item/${action.id}`, content:content, validFunc:null};
        }
        case 'DELETE_ALL': {
            content.method = "DELETE"
            //console.log("Delete all cart -")
            return {...state, url:`${URL_PREFIX}`, content:content, validFunc:null};

        }
        case 'GET_ITEMS':{
            //console.log("Get items cart -")
            return {...state, url:`${URL_PREFIX}`, content:null, validFunc:(()=>validateItems)};
        }

        case 'GET_IDS':{
            //console.log("Get ids cart -")
            return {...state, url:`${URL_PREFIX}/ids`, content:null,  validFunc:(()=>validateIds)}
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
    const [cartOperation, dispatchCartOperation] =  useReducer(counterReducer, {url:null, content: null, validFunc:null});
    const [{data, isLoading, error}, doFetch, setFetchTrigger, setContent, setCheckIsValidJson] = useDataApi(null, null, null,null);

    /**
     * To fetch again the data when needed.
     */
    useEffect(()=>{
        if (cartOperation.url){
            setCheckIsValidJson(cartOperation.validFunc)
            setContent(cartOperation.content)
            doFetch(cartOperation.url)
            setFetchTrigger(true)
        }

    }, [cartOperation, doFetch, setContent, setFetchTrigger, setCheckIsValidJson])



    return {data, isLoading, error, dispatchCartOperation}
}

export default useCartApi