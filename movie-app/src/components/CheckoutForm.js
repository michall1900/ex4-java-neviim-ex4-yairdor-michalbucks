import {useState} from "react";
import {useCartCounterProvider} from "../contexts/CounterContext";
import globalConstantsModule from "../utilities/globalConstantsModule";

export default function CheckoutForm (){
    const {cartCount} = useCartCounterProvider();
    const [inputs, setInputs] = useState({})

    const handelInputChange = (event)=>{
        const {name, value} = event.target
        setInputs((prevInputs)=>(
            {...prevInputs, [name]:value}
        ))
    }
    const handelSubmit = (event)=>{
        event.preventDefault()
        console.log("HEREEE")
        console.log(inputs)
    }
    return(
        <>
            <span className="fw-bold h4 my-5">
                Total cost = {cartCount * globalConstantsModule.ITEM_PRICE}$
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
        </>
    )
}