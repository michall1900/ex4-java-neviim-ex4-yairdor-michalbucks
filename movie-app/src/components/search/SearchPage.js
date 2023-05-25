
import {useReducer} from "react";
import History from "../History";
import SearchByAttribute from "./SearchByAttribute";
import SearchByString from "./SearchByString";
import BackToMainSearchButton from "./BackToMainSearchButton";
import SearchButtons from "./SearchButtons";



const CLICKED_OPTIONS = {main:"MAIN_SEARCH",search_from_history:"HISTORY_SEARCH", search_by_free_text:"STRING_SEARCH",  search_by_attributes:"ATTRIBUTE_SEARCH"}


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
                        <BackToMainSearchButton dispatchButton={dispatchButton} dispatchOption={CLICKED_OPTIONS.main}/>
                        <div className={"col-12 my-2"}>
                            {(buttonClickedState.isHistoryClicked&& <History/>) ||
                            (buttonClickedState.isAttributeClicked&& <SearchByAttribute/>) ||
                            (buttonClickedState.isStringClicked&& <SearchByString/>) }
                        </div>
                    </>
                        ):
                    (<SearchButtons CLICKED_OPTIONS={CLICKED_OPTIONS} dispatchButton={dispatchButton}/>)
                }
            </div>
        </div>
    )
}