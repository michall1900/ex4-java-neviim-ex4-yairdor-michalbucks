
import useDataApi from '../hooks/useDataApi';
import {useReducer} from "react";

const historyReducer = (history,action)=>{
    switch (action.type){
        case "add":{
            history.set(action.item.request, action.item.details)
            return history
        }
        case "delete":{
            history.delete(action.item.request)
            return history
        }
        case "deleteAll":{
            return new Map()
        }
        default:
            throw Error("Invalid choice")
    }
}
export default function SearchPage(){
    // const [{ data, isLoading, isError }, doFetch] = useDataApi(
    //     'http://hn.algolia.com/api/v1/search?query=redux',
    //     null,null
    // );

    const [history, dispatch] = useReducer(historyReducer, new Map())

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className={"col-12 h1 fst-italic fw-bolder my-2"}>
                    Search
                </div>
                <div className={"col-12"}>
                    History
                </div>
            </div>
        </div>
    )
}