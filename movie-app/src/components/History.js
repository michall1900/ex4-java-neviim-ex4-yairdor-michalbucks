import {useHistory} from "../contexts/HistoryContext";
import {useState} from "react";
import HistorySearchAgainDisplay from "./searchApi/searchHistory/HistorySearchAgainDisplay";
import HistoryListPageDisplay from "./searchApi/searchHistory/HistoryListPageDisplay";

export default function History(){
    const {history} = useHistory()
    const [searchClicked, setSearchClicked] = useState(false)
    const [url, setUrl] = useState(null)


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