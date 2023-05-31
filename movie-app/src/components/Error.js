/**
 * This component displaying the error message.
 * @param error The error message
 * @returns {JSX.Element|null}
 * @constructor
 */
export default function Error({error}){
    return (
        (error && error.length) ? <span className="bg-danger bg-opacity-50">{error}</span> : null
    );
}