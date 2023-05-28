
import AddToCartButton from "./AddToCartButton";

export default function PriceRow({itemData, setIsClicked, isInCart}){


    return(
        <div className="row my-2">
            <div className="col-10 text-bolder text-end">
                Price : 3.99$
            </div>
            <div className="col-2 text-end">
                <AddToCartButton isInCart={isInCart} itemData={itemData} setIsClicked={setIsClicked}/>
            </div>
        </div>
    )
}