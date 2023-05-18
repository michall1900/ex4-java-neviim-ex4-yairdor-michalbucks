
import {useReducer} from "react";
import History from "./History";
import SearchByAttribute from "./SearchByAttribute";
import SearchByString from "./SearchByString";
import BackToMainSearchButton from "./BackToMainSearchButton";
import SearchButtons from "./SearchButtons";

const CLICKED_OPTIONS = {main:"MAIN_SEARCH",search_from_history:"HISTORY_SEARCH", search_by_free_text:"STRING_SEARCH",  search_by_attributes:"ATTRIBUTE_SEARCH"}
const historyReducer = (history,action)=>{
    switch (action.type){
        case "ADD":{
            history.set(action.item.request, action.item.details)
            console.log(history)
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
    const [buttonClickedState,dispatchButton] = useReducer(clickedButtonReducer,
        {isHistoryClicked:false, isStringClicked:false, isAttributeClicked:false})

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className={"col-12 h1 fst-italic fw-bolder my-2"}>
                    Search
                </div>
                {(buttonClickedState.isHistoryClicked || buttonClickedState.isAttributeClicked ||
                    buttonClickedState.isStringClicked)?
                    (<>
                        <BackToMainSearchButton dispatchButton={dispatchButton()} dispatchOption={CLICKED_OPTIONS.main}/>
                        <div className={"col-12 my-2"}>
                            {(buttonClickedState.isHistoryClicked&& <History/>) ||
                            (buttonClickedState.isAttributeClicked&& <SearchByAttribute dispatchHistory={dispatchHistory}/>) ||
                            (buttonClickedState.isStringClicked&& <SearchByString dispatchHistory={dispatchHistory}/>) }
                        </div>
                    </>
                        ):
                    (<SearchButtons CLICKED_OPTIONS={CLICKED_OPTIONS} dispatchButton={dispatchButton}/>)
                }
            </div>
        </div>
    )
}