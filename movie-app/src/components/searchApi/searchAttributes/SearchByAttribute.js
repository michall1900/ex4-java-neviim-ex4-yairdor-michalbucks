import globalConstantsModule from "../../../utilities/globalConstantsModule";
import SearchApiDisplay from "../apiItemsDisplay/SearchApiDisplay";
import {HistoryItemsProvider} from "../../../contexts/HistoryItemsContext";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.DISCOVER_SEARCH
export default function SearchByAttribute(){
    return(
        <>
            <h3>
                Search by free text
            </h3>
            <HistoryItemsProvider>
                <SearchApiDisplay isByText={false} urlPrefix={URL_PREFIX}/>
            </HistoryItemsProvider>

        </>


    )
}