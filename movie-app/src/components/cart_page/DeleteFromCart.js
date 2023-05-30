import useCartApi from "../../custom_hooks/useCartApi";
import {BiMessageError} from "react-icons/bi";
import {useEffect} from "react";

/**
 * This component handle with pressing on delete button from cart.
 * @param itemData
 * @param setIsClicked
 * @returns {JSX.Element}
 * @constructor
 */
export default function DeleteFromCart({itemData, setIsClicked}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()

    /**
     * Effect that is handle with success deletion.
     */
    useEffect(()=>{
        if (!!data && !error){
            setIsClicked(true)
        }

    },[data, error, setIsClicked])

    /**
     * Asking to delete.
     */
    const handelDelete = ()=>{
        dispatchCartOperation({type:"DELETE", id:itemData.id})
    }
    /**
     * Handle with displaying the error message on the button.
     * @returns {string}
     */
    const handleIconHover = () => {
        if (error) {
            return error + ". Try again later..";
        }
        return '';
    };
    return(
        <>
            {isLoading ?
                (<button className="btn btn-primary btn-sm" type="button" disabled="">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>) :
                    <button className="btn btn-danger btn-sm" onClick={isLoading ? "" : handelDelete}>
                        Delete
                        {!!error &&
                            (<span className="text-danger">
                            <BiMessageError title ={handleIconHover()}/>
                        </span>)}
                    </button>}
        </>

    )
}