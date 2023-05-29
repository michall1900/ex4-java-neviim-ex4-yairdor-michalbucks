import {useEffect, useState} from "react";
import {useCartCounterProvider} from "../contexts/CounterContext";
import CheckoutForm from "./CheckoutForm";
import Error from "./Error";
import Spinner from "./Spinner";
import useDataApi from "../customHooks/useDataApi";

export default function CheckOutPage(){

    const {isLoading, error ,setFetchAgain, cartCount} = useCartCounterProvider();
    const [isAfterPurchase, setIsAfterPurchase] = useState(true)

    useEffect(()=>{
        setFetchAgain(true)

    },[setFetchAgain])

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className="col-12 h1 fst-italic fw-bolder my-2">
                    Checkout
                </div>
                <div className="col-12 my-5">
                    {(isLoading || !!error)?
                        (<>
                                <Error error={error}/>
                                <Spinner isLoading={isLoading} isSmall={true}/>
                            </>
                        )
                        :
                        ((!!cartCount && cartCount>0)? <CheckoutForm setIsAfterPurchase={setIsAfterPurchase} setFetchAgain={setFetchAgain}/>:
                            <span className="fw-bold h4 my-5">
                            {isAfterPurchase? "Thank you for buying!" :
                                "The cart is empty. Come back to this page after you pick some movies and/or series."}
                        </span>)}
                </div>
            </div>
        </div>
    )
}