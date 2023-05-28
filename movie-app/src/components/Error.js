export default function Error({error}){
    return (
        (error && error.length) ? <span className="bg-danger bg-opacity-50">{error}</span> : null
    );
}