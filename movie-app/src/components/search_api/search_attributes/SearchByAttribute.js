import globalConstantsModule from "../../../utilities/globalConstantsModule";
import SearchTmdbApiDisplay from "../api_items_display/SearchTmdbApiDisplay";
import {HistoryItemsProvider} from "../../../contexts/HistoryItemsContext";

const URL_PREFIX = globalConstantsModule.API_URL_PREFIX + globalConstantsModule.DISCOVER_SEARCH
/**
 * This component initialized the parameters for SearchTmdbApiDisplay when the user click on search by attribute.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchByAttribute(){
    return(
        <>
            <h3>
                Search by free text
            </h3>
            <HistoryItemsProvider>
                <SearchTmdbApiDisplay isByText={false} urlPrefix={URL_PREFIX}/>
            </HistoryItemsProvider>

        </>


    )
}