
import AddToCartButton from "./AddToCartButton";
import DeleteFromCart from "../cart_page/DeleteFromCart";
import DisplayPrice from "../DisplayPrice";

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