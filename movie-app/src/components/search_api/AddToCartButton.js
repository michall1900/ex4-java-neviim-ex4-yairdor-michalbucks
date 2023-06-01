import globalConstantsModule from "../../utilities/globalConstantsModule";
import noPicture from "../../images/no picture.jpg";
import useCartApi from "../../custom_hooks/useCartApi";
import {useCartCounterProvider} from "../../contexts/CounterContext";
import {useEffect} from "react";
import ResponsiveButton from "../ResponsiveButton";

/**
 * This component is handle with clicking on add to cart button.
 * @param isInCart - a boolean says if the current item is inside the cart.
 * @param itemData - The current item that display
 * @param setIsClicked - Setting click on button to search again ids if needed.
 * @param tvOrMovie - for the id.
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddToCartButton({isInCart, itemData, setIsClicked, tvOrMovie}){
    const {data, isLoading, error, dispatchCartOperation} = useCartApi()
    const {setFetchAgain} = useCartCounterProvider()
    /**
     * This function is making the item that should be added to cart.
     * @param itemData The item with all of its data.
     * @returns {{date: (*|string), overview: (string), popularity: (string), name: (*|string), id, posterPath: (string|*)}}
     */
    const makeAddBody = (itemData)=> {
        return {
            id:`${tvOrMovie}.${itemData.id}`,
            name:itemData.name?? itemData.title ?? itemData.original_name ?? itemData.original_title ?? "",
            overview:itemData.overview ?? "",
            date:itemData.first_air_date ?? itemData.release_date ?? "",
            posterPath: (itemData.poster_path)? globalConstantsModule.GET_IMAGE_URL_PREFIX+itemData.poster_path: noPicture,
            popularity:itemData.popularity ?? ""
        }
    }
    /**
     * This effect is handle with case that add success.
     */
    useEffect(()=>{
        if (!error && !!data){
            setFetchAgain(true)
            setIsClicked(true)
        }

    },[data, error, setFetchAgain, setIsClicked])

    /**
     * This function is handle the buy operation - add the item to the cart.
     */
    const handleBuy = () => {
        dispatchCartOperation({type: "ADD", item:makeAddBody(itemData)})
    }


    return(
        isInCart? (<button className="btn btn-secondary btn-sm" disabled> Purchased</button>):
                <ResponsiveButton error={error} isLoading={isLoading} btnClassName={"btn-primary btn-sm"}
                buttonName="Add to cart" handleClick={handleBuy}/>

    )
}