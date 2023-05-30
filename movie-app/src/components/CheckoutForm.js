import useCartApi from "../customHooks/useCartApi";
import {useEffect, useState} from "react";
import {useCartCounterProvider} from "../contexts/CounterContext";
import globalConstantsModule from "../utilities/globalConstantsModule";
import useDataApi from "../customHooks/useDataApi";
import Spinner from "./Spinner";
import Error from "./Error";


export default function CheckoutForm ({setIsAfterPurchase , setFetchAgain, setStayingError, stayingError}){
    const {cartCount} = useCartCounterProvider();
    const [inputs, setInputs] = useState({})
    const [{ data, isLoading, error}, doFetch, setFetchTrigger, setContent] = useDataApi()
    const {data:cartIdsAnswer, isLoading:isLoadingCartIds, error:errorCartIds, dispatchCartOperation} = useCartApi()
    console.log(error)
    useEffect(()=>{
        console.log("RENDERRRR")
        dispatchCartOperation({type:"GET_IDS"})
    },[dispatchCartOperation])

    const handelInputChange = (event)=>{
        const {name, value} = event.target
        setInputs((prevInputs)=>(
            {...prevInputs, [name]:value}
        ))
    }

    useEffect(()=>{
        if(!!data) {
            console.log("hello")
            setIsAfterPurchase(true)
            setFetchAgain(true)
        }
    },[data,setIsAfterPurchase, setFetchAgain])

    useEffect(()=>{
        if (!!error && error.includes(globalConstantsModule.NOT_SYNCHRONIZED_ERROR)){
            console.log("Includes!")
            dispatchCartOperation({type:"GET_IDS"})
            setFetchAgain(true);
            setStayingError(error + ". Trying to fetch again data..");
        }
        else if(!!error){
            setStayingError("")
        }
    },[error, dispatchCartOperation, setFetchAgain])

    const handelSubmit = (event)=>{
        event.preventDefault()
        console.log(JSON.stringify({"purchase":(inputs), "ids":(cartIdsAnswer)}))
        setContent({
            method: "Post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"purchase": inputs, "ids":cartIdsAnswer})
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