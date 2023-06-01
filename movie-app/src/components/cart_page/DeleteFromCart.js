import useCartApi from "../../custom_hooks/useCartApi";
import {useEffect} from "react";
import ResponsiveButton from "../ResponsiveButton";

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
    return(
        <ResponsiveButton btnClassName="btn-danger btn-sm" isLoading={isLoading} error={error}
        buttonName="Delete" handleClick={handelDelete}/>

    )
}