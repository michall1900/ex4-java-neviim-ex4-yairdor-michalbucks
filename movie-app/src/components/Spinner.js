/**
 * This component display a spinner
 * @param isLoading to tell if the component should be displayed.
 * @param isSmall to tell how to show this component.
 * @returns {JSX.Element|string}
 * @constructor
 */
export default function Spinner({isLoading, isSmall}){

    return(
        isLoading? (
            <div className={`spinner-border${isSmall? " spinner-border-sm":""}`} role="status">
            <span className="visually-hidden">Loading...</span></div>): ""
    )
}