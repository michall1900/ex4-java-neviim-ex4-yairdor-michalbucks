import useCartApi from "../../customHooks/useCartApi";
import {BiMessageError} from "react-icons/bi";
import {useEffect} from "react";

export default function DeleteFromCart({itemData, setIsClicked}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()

    useEffect(()=>{
        if (!!data && !error){
            setIsClicked(true)
        }

    },[data, error, setIsClicked])

    const handelDelete = ()=>{
        dispatchCartOperation({type:"DELETE", id:itemData.id})
    }
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