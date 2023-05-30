import globalConstantsModule from "../utilities/globalConstantsModule";
import {useState, useReducer, useEffect} from "react";
const SERVER_ERROR_STRING = "Can't login to server. Please try again later."
const CANT_FIND_SERVER_ERROR_CODE = 500
const ERROR_MESSAGE = "There is a problem with getting response from the server, please try again later";

/**
 * Check the response. If there is an error, it throws it with description.
 * @param response Server's response.
 * @returns {Promise<*>} A json object.
 * @throws Error if there was an error with the server's response.
 */
const checkResponse = async (response) =>{
    if (!response.ok) {
        const err = await getErrorMessage(response);
        throw new Error(`Some error occurred ${response.status}. ${err}`);
    }
    return response.json();
}
/**
 * Extract the error message or display a default one.
 * @param response The server's response.
 * response.text().
 * @returns {Promise<*|string>} A string with the error message.
 */
const getErrorMessage = async (response) =>{
    let text = null;
    if (response.status >= CANT_FIND_SERVER_ERROR_CODE){
        return SERVER_ERROR_STRING;
    }
    try{
        text = await response.text();
        let jsonData = JSON.parse(text);
        return (!!jsonData.errors)? jsonData.errors.join(", "): jsonData.status_message??ERROR_MESSAGE;
    }
    catch {
        return text??ERROR_MESSAGE;
    }
}
const dataFetchReducer = (state,action)=>{
    switch (action.type){
        case globalConstantsModule.FETCH_INIT:{
            console.log("Initialized fetch, isLoading-true, error - null")
            return {...state, isLoading: true, error: null};
        }
        case globalConstantsModule.FETCH_SUCCESS:{
            console.log("Initialized fetch, isLoading-false, data - ", action.data)
            return {...state, isLoading: false, error: null, data:action.data};
        }
        case globalConstantsModule.FETCH_FAILURE:{
            console.log("Fetch Failed, isLoading-false, Error- true", action.error)
            return {...state, isLoading: false, error: action.error};
        }

        default:
            throw new Error("Invalid choice for fetch")
    }
}

const useDataApi = (initialUrl,initialData, initialContent)=>{
    console.log("use data api called/ rendered")
    const [url,setUrl] = useState(initialUrl);
    const [fetchState, dispatch] = useReducer(dataFetchReducer, { data:initialData, isLoading: false, error:null})
    const [content, setContent] = useState(initialContent)
    const [fetchTrigger, setFetchTrigger] = useState(false);

    useEffect(()=>{
        // let didCancel = false
        const fetchData = async ()=>{
            dispatch({type:globalConstantsModule.FETCH_INIT})
            try{
                const response = await fetch(url,content)
                //console.log(didCancel, "after fetch, before json")
                // if (!didCancel){
                    const jsonData = await checkResponse(response)
                    dispatch({type:globalConstantsModule.FETCH_SUCCESS, data:jsonData})
                //}

            }
            catch(error){
                //console.log(didCancel, "in error")
                //if (!didCancel)
                    dispatch({type:globalConstantsModule.FETCH_FAILURE, error:error.message??ERROR_MESSAGE})
            }
        }
        console.log("Inside use data api effect, check if there is need to fetch")
        if(!!url&& fetchTrigger) {
            console.log("Fetching.. ",url, fetchTrigger)
            setFetchTrigger(false)
            fetchData();
        }
        // return () => {
        //     console.log("did cancel true on exit")
        //     didCancel = true;
        // };
    }, [url, content, fetchTrigger])

    return [fetchState, setUrl, setFetchTrigger, setContent]
}

export default useDataApi;