import {useCartCounterProvider} from "../contexts/CounterContext";
import Spinner from "./Spinner";
import Error from "./Error";

const ERROR_MSG = "Can't get the number of items that you have been select."

/**
 * This component is displaying the counter on the screen.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CounterDisplay(){
    const {isLoading, error , cartCount} = useCartCounterProvider();


    return(
        <div className="col-12 my-2 fw-bold fs-5">
            {
            (!!error&& <Error error={ERROR_MSG}/> )||
            (isLoading && <Spinner isLoading={isLoading}/> )||
            `You choose ${cartCount} items.`
        }
        </div>
    )
}