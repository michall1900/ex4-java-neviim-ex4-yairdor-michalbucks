
import globalConstantsModule from "../../utilities/globalConstantsModule";
import SearchApiDisplay from "./apiItemsDisplay/SearchApiDisplay";
import {HistoryItemsProvider} from "../../contexts/HistoryItemsContext";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.SEARCH_BY_NAME
export default function SearchByString(){


    return(
        <>
            <h3>
                Search by free text
            </h3>
            <HistoryItemsProvider>
                <SearchApiDisplay isByText={true} urlPrefix={URL_PREFIX}/>
            </HistoryItemsProvider>
        </>


    )
}