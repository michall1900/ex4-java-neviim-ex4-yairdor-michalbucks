import {useCartCounterProvider} from "../../contexts/CounterContext";
import Spinner from "../Spinner";
import { BiMessageError } from 'react-icons/bi';
import {AiOutlineShoppingCart} from "react-icons/ai";

/**
 * This component put a badge (counter) and icon to the cart option.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CartWithBadge(){
    const {isLoading, error,cartCount} = useCartCounterProvider()

    /**
     * Handle with showing the Error message.
     * @returns {*|string}
     */
    const handleIconHover = () => {
        if (error) {
            return error;
        }
        return '';
    };
    return(
        <span className="position-relative">
            Cart
            <AiOutlineShoppingCart className={"mx-2"}/>
            <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${!!error? "":"bg-primary"}`}>
                {(isLoading && (<Spinner isLoading={isLoading} isSmall={true}/>))||
                    (!!error ?
                        <span className="text-danger">
                            <BiMessageError title={handleIconHover()} />
                        </span>:
                        (cartCount > 99) ? "99+":cartCount)
                }
            </span>
        </span>
    )
}