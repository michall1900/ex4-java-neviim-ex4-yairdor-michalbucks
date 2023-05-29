import globalConstantsModule from "../../utilities/globalConstantsModule";
import noPicture from "../../images/no picture.jpg";
import useCartApi from "../../customHooks/useCartApi";
import {useCartCounterProvider} from "../../contexts/CounterContext";
import {useEffect} from "react";
import {BiMessageError} from "react-icons/bi";

export default function AddToCartButton({isInCart, itemData, setIsClicked}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()
    const {setFetchAgain} = useCartCounterProvider()
    const makeAddBody = (itemData)=> {
        return {
            id:itemData.id,
            name:itemData.name?? itemData.title ?? itemData.original_name ?? itemData.original_title ?? "",
            overview:itemData.overview ?? "",
            date:itemData.first_air_date ?? itemData.release_date ?? "",
            posterPath: (itemData.poster_path)? globalConstantsModule.GET_IMAGE_URL_PREFIX+itemData.poster_path: noPicture,
            popularity:itemData.popularity ?? ""
        }
    }
    useEffect(()=>{
        if (!error && !!data){
            setFetchAgain(true)
            setIsClicked(true)
        }

    },[data, error, setFetchAgain, setIsClicked])

    const handleBuy = () => {
        dispatchCartOperation({type: "ADD", item:makeAddBody(itemData)})
    }
    const handleIconHover = () => {
        if (error) {
            return error + "You can try again.";
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
                isInCart ?
                    (<button className="btn btn-secondary btn-sm" disabled> Purchased</button>) :
                    <button className="btn btn-primary btn-sm" onClick={isLoading ? "" : handleBuy}>
                        Add to cart
                        {!!error &&
                            (<span className="text-danger">
                            <BiMessageError title={handleIconHover()}/>
                        </span>)}
                    </button>}

        </>

    )
}