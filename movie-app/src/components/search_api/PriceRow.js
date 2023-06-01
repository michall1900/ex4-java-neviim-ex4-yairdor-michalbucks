
import AddToCartButton from "./AddToCartButton";
import DeleteFromCart from "../cart_page/DeleteFromCart";
import DisplayPrice from "../DisplayPrice";

/**
 * This component is handle with displaying the price's row - price with delete button/ add button.
 * @param itemData The current item
 * @param setIsClicked To handle click on button
 * @param isInCart to disabled double add.
 * @param isBuyOption To know if there is a need to add buy option or delete option.
 * @param tvOrMovie for id to cart.
 * @returns {JSX.Element}
 * @constructor
 */
export default function PriceRow({itemData, setIsClicked, isInCart, isBuyOption, tvOrMovie}){


    return(
        <div className="row my-2">
            <DisplayPrice/>
            <div className="col-4 text-end">
                {isBuyOption?
                    <AddToCartButton isInCart={isInCart} itemData={itemData} setIsClicked={setIsClicked} tvOrMovie={tvOrMovie}/>:
                    <DeleteFromCart itemData={itemData} setIsClicked={setIsClicked}/>
                }

            </div>
        </div>
    )
}