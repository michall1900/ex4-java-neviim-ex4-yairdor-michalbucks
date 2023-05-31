import useCartApi from "../../custom_hooks/useCartApi";
import {useEffect, useState} from "react";
import {useCartCounterProvider} from "../../contexts/CounterContext";
import globalConstantsModule from "../../utilities/globalConstantsModule";
import useDataApi from "../../custom_hooks/useDataApi";
import Spinner from "../Spinner";
import Error from "../Error";

/**
 * This component is handle with checkout form
 * @param setIsAfterPurchase A set to state that telling the checkout success.
 * @param setFetchAgain To get the number of items again.
 * @param setStayingError To save the error message when the cart needs a refresh.
 * @param stayingError The error itself.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CheckoutForm ({setIsAfterPurchase , setFetchAgain, setStayingError, stayingError}){
    const {cartCount} = useCartCounterProvider();
    const [inputs, setInputs] = useState({})
    const [{ data, isLoading, error}, doFetch, setFetchTrigger, setContent] = useDataApi()
    const {data:cartIdsAnswer, isLoading:isLoadingCartIds, error:errorCartIds, dispatchCartOperation} = useCartApi()

    /**
     * To fetch the ids at the first time.
     */
    useEffect(()=>{
        dispatchCartOperation({type:"GET_IDS"})
    },[dispatchCartOperation])

    /**
     * Handle with the insertion to the input.
     * @param event
     */
    const handelInputChange = (event)=>{
        const {name, value} = event.target
        setInputs((prevInputs)=>(
            {...prevInputs, [name]:value}
        ))
    }

    /**
     * Effect that is telling to the called component that the purchase success.
     */
    useEffect(()=>{
        if(!!data) {
            setIsAfterPurchase(true)
            setFetchAgain(true)
        }
    },[data,setIsAfterPurchase, setFetchAgain])

    /**
     * An effect to handle with the given error - save it if there is refresh to the cart.
     */
    useEffect(()=>{
        if (!!error && error.includes(globalConstantsModule.NOT_SYNCHRONIZED_ERROR)){
            dispatchCartOperation({type:"GET_IDS"})
            setFetchAgain(true);
            setStayingError(error + ". Trying to fetch again data..");
        }
        else if(!!error){
            setStayingError("")
        }
    },[error, dispatchCartOperation, setFetchAgain, setStayingError])

    /**
     * Handling with user's submit - send a request and waiting for purchase response.
     * @param event
     */
    const handelSubmit = (event)=>{
        event.preventDefault()
        setContent({
            method: "Post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"purchase": inputs, "ids":cartIdsAnswer})
            //body: JSON.stringify({"purchase": {}, "ids":cartIdsAnswer})
        })
        setFetchTrigger(true)
        doFetch("/api/purchase")
    }
    return(
        <>
            <span className="fw-bold h4 my-5">
                Total cost = {cartCount * globalConstantsModule.ITEM_PRICE}$
            </span>
            <span className="my-2">
                <Spinner isLoading={isLoadingCartIds} isSmall={true}/>
                <Error error={errorCartIds}/>
            </span>
            <form className="form-floating my-2" onSubmit={handelSubmit}>
                <div className="row text-start">
                    <div className="col-12 col-md-4 my-4">
                        <label htmlFor="floatingFirstName" className="fw-bold">First name</label>
                        <input type="text" className="form-control" id="floatingFirstName" required maxLength="30"
                               value={inputs.firstName || ""} name="firstName" onChange={handelInputChange}/>
                    </div>
                    <div className="col-12 col-md-4 my-4">
                        <label htmlFor="floatingLastName" className="fw-bold">Last name</label>
                        <input type="text" className="form-control" id="floatingLastName" required maxLength="30"
                               value={inputs.lastName || ""} name="lastName" onChange={handelInputChange}/>
                    </div>
                    <div className="col-12 col-md-4 my-4">
                        <label htmlFor="floatingEmail" className="fw-bold">Email</label>
                        <input type="email" className="form-control" id="floatingEmail" required maxLength="30"
                               value={inputs.email || ""} name="email" onChange={handelInputChange}/>

                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </div>
                </div>
            </form>
            <span className="my-2">
                <Spinner isLoading={isLoading} isSmall={true}/>
                <Error error={stayingError? stayingError :error}/>
            </span>
        </>
    )
}