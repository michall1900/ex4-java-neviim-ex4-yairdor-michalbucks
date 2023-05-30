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