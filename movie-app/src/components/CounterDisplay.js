import {useCartCounterProvider} from "../contexts/CounterContext";
import Spinner from "./Spinner";
import Error from "./Error";
import {useEffect} from "react";
export default function CounterDisplay(){
    const {isLoading, error ,setFetchAgain, cartCount} = useCartCounterProvider();

    useEffect(()=>{
        setFetchAgain(true)
    },[setFetchAgain])

    return(
        <div className="col-12 my-2 fw-bold fs-5">
            {
            (!!error&& <Error error={"Can't get the number of items that you have been select."}/> )||
            (isLoading && <Spinner isLoading={isLoading}/> )||
            "You choose " + cartCount + " items."
        }
        </div>
    )
}