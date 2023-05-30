
import globalConstantsModule from "../../../utilities/globalConstantsModule";
import SearchTmdbApiDisplay from "../api_items_display/SearchTmdbApiDisplay";
import {HistoryItemsProvider} from "../../../contexts/HistoryItemsContext";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.SEARCH_BY_NAME
/**
 * This component is setting the parameters for search by text display.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchByString(){


    return(
        <>
            <h3>
                Search by free text
            </h3>
            <HistoryItemsProvider>
                <SearchTmdbApiDisplay isByText={true} urlPrefix={URL_PREFIX}/>
            </HistoryItemsProvider>
        </>


    )
}