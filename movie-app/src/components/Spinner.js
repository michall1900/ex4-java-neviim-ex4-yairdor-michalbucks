export default function Spinner({isLoading, isSmall}){

    return(
        isLoading? (
            <div className={`spinner-border${isSmall? " spinner-border-sm":""}`} role="status">
            <span className="visually-hidden">Loading...</span></div>): ""
    )
}