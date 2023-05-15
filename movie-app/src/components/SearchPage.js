
import useDataApi from '../hooks/useDataApi';
import {useReducer} from "react";
import History from "./History";
import SearchByAttribute from "./SearchByAttribute";
import SearchByString from "./SearchByString";

const historyReducer = (history,action)=>{
    switch (action.type){
        case "ADD":{
            history.set(action.item.request, action.item.details)
            return history
        }
        case "DELETE":{
            history.delete(action.item.request)
            return history
        }
        case "DELETE_ALL":{
            return new Map()
        }
        default:
            throw Error("Invalid history handler choice")
    }
}

const clickedButtonReducer = (clickedButton, action)=>{
    switch(action.type){
        case 'MAIN_SEARCH':
            return {isHistoryClicked:false, isStringClicked:false, isAttributeClicked:false}
        case 'HISTORY_SEARCH':
            return {isHistoryClicked:true, isStringClicked:false, isAttributeClicked:false}
        case 'STRING_SEARCH':
            return {isHistoryClicked:false, isStringClicked:true, isAttributeClicked:false}
        case 'ATTRIBUTE_SEARCH':
            return {isHistoryClicked:false, isStringClicked:false, isAttributeClicked:true}
        default:
            throw new Error("Invalid clicked button choice")
    }
}
export default function SearchPage(){

    const [history, dispatchHistory] = useReducer(historyReducer, new Map())
    const [buttonClickedState,dispatchButton] = useReducer(clickedButtonReducer, {isHistoryClicked:false, isStringClicked:false, isAttributeClicked:false})
    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className={"col-12 h1 fst-italic fw-bolder my-2"}>
                    Search
                </div>
                {(buttonClickedState.isHistoryClicked || buttonClickedState.isAttributeClicked || buttonClickedState.isStringClicked)?
                    (<>
                        <div className={"col-12 text-center my-2"}>
                            <button className={"btn btn-outline-primary"} onClick={()=>{dispatchButton({type: "MAIN_SEARCH"})}}>
                                Back to main search page</button>
                        </div>
                        <div className={"col-12 my-2"}>
                            {(buttonClickedState.isHistoryClicked&& <History/>) ||
                            (buttonClickedState.isAttributeClicked&& <SearchByAttribute/>) ||
                            (buttonClickedState.isStringClicked&& <SearchByString/>) }
                        </div>
                    </>
                        ):
                    (<>
                        <div className={"col-4 text-center my-2"}>
                            <button className={"btn btn-info"} onClick={()=>{dispatchButton({type: "HISTORY_SEARCH"})}}>
                                Search from history</button>
                        </div>
                        <div className={"col-4 text-center my-2"}>
                            <button className={"btn btn-info"} onClick={()=>{dispatchButton({type: "STRING_SEARCH"})}}>
                                Search by free text</button>
                        </div>
                        <div className={"col-4 text-center my-2"}>
                            <button className={"btn btn-info"} onClick={()=>{dispatchButton({type: "ATTRIBUTE_SEARCH"})}}>
                                Search by attributes</button>
                        </div>
                    </>)
                }
            </div>
        </div>
    )
}