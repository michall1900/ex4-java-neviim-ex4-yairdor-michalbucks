import {BiMessageError} from "react-icons/bi";

/**
 * Handle with responsive buttons
 * @param handleClick - the function that handle with click on the button.
 * @param isLoading - a boolean says if the item is loading
 * @param error - The error message
 * @param btnClassName - the class name of the button (exclude btn)
 * @param buttonName - the name of the button
 * @param icon an icon near to the name of the button (component).
 * @returns {JSX.Element}
 * @constructor
 */
export default function ResponsiveButton({handleClick, isLoading, error, btnClassName, buttonName, icon}){
    /**
     * The function is setting the error message on the button.
     * @returns {string}
     */
    const handleIconHover = () => {
        if (error) {
            return error + "You can try again.";
        }
        return '';
    };

    return(
        <>
            {isLoading ?
                (<button className={`btn ${btnClassName}`} type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>) :
                <button className={`btn ${btnClassName}`} onClick={handleClick} disabled={isLoading}>
                    {icon && <span className="me-2">{icon}</span>}
                    {buttonName}
                    {!!error &&
                        (<span className="text-danger">
                        <BiMessageError title={handleIconHover()}/>
                    </span>)}
                </button>}

        </>

    )
}