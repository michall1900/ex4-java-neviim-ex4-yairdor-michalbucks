/**
 * This component is handle with clicking on back to main search button.
 * @param dispatchButton The dispatcher for switching between search buttons.
 * @param dispatchOption The option that needs to be transfers to the dispatch.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BackToMainSearchButton({dispatchButton, dispatchOption}){
    return(
        <div className={"col-12 text-center my-4"}>
            <button className={"btn btn-outline-primary"}
                    onClick={()=>{dispatchButton({type: dispatchOption})}}>
                Back to main search page
            </button>
        </div>
    )
}