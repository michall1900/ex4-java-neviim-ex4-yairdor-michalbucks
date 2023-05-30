import {useHistory} from "../../../contexts/HistoryContext";
import {useState} from "react";
import HistorySearchAgainDisplay from "./HistorySearchAgainDisplay";
import HistoryListPageDisplay from "./HistoryListPageDisplay";

/**
 * This component is handle with history display.
 * @returns {JSX.Element}
 * @constructor
 */
export default function History(){
    const {history} = useHistory()
    const [searchClicked, setSearchClicked] = useState(false)
    const [url, setUrl] = useState(null)

    /**
     * A function that is handle with case that user press on search again button.
     * @param request
     */
    const searchAgain = (request) =>{
        setUrl(request)
        setSearchClicked(true)
    }

    return(
        <>
            <h3>
                Search History
            </h3>
            <div className="row my-4">
                {(!!history && !!history.size)?
                    searchClicked?
                        (<HistorySearchAgainDisplay url={url} setSearchClicked={setSearchClicked}/>) :
                        (<HistoryListPageDisplay searchAgain={searchAgain}/>)
                    :
                    (<div className="col text-center fw-bolder">
                        Empty
                    </div>)
                }
            </div>
        </>

    )
}