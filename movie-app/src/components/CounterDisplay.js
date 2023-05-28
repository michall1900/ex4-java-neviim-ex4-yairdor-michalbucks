import {useCartCounterProvider} from "../contexts/CounterContext";
import Spinner from "./Spinner";
import Error from "./Error";
export default function CounterDisplay(){
    const {isLoading, error ,cartCount} = useCartCounterProvider();

    return(
        <div className="col-12 my-2 fw-bold fs-5">
            Your cart size is: {
            (!!error&& <Error error={error}/> )||
            (isLoading && <Spinner isLoading={isLoading}/> )||
            cartCount
        }
        </div>
    )
}