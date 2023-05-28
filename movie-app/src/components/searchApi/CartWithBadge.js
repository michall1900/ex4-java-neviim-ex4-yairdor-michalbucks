import {useCartCounterProvider} from "../../contexts/CounterContext";
import Spinner from "../Spinner";
import { BiMessageError } from 'react-icons/bi';
import {AiOutlineShoppingCart} from "react-icons/ai";

export default function CartWithBadge(){
    const {isLoading, error,cartCount} = useCartCounterProvider()
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