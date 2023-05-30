
import AddToCartButton from "./AddToCartButton";
import DeleteFromCart from "../cart_page/DeleteFromCart";
import DisplayPrice from "../DisplayPrice";

/**
 * This component is handle with displaying the price's row - price with delete button/ add button.
 * @param itemData
 * @param setIsClicked
 * @param isInCart
 * @param isBuyOption
 * @returns {JSX.Element}
 * @constructor
 */
export default function PriceRow({itemData, setIsClicked, isInCart, isBuyOption}){


    return(
        <div className="row my-2">
            <DisplayPrice/>
            <div className="col-4 text-end">
                {isBuyOption?
                    <AddToCartButton isInCart={isInCart} itemData={itemData} setIsClicked={setIsClicked}/>:
                    <DeleteFromCart itemData={itemData} setIsClicked={setIsClicked}/>
                }

            </div>
        </div>
    )
}