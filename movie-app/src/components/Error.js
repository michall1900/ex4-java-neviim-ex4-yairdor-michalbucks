export default function Error({error}){
    return (
        (error && error.length) ? <div className="bg-danger bg-opacity-50">{error}</div> : null
    );
}