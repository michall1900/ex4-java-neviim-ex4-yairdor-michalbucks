export default function Error({error}){
    return(
        {error&& error.length &&
        (<div className="my-2 bg-danger bg-opacity-50">
            {error}
        </div>)
        }
    )
}