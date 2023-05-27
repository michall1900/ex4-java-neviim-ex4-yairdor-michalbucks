export default function Spinner({isLoading}){

    return(
        isLoading? (
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span></div>): ""
    )
}