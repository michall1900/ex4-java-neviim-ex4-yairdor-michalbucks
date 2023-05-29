import CounterDisplay from "./CounterDisplay";
import ClearAllButton from "./searchApi/ClearAllButton";
import useCartApi from "../customHooks/useCartApi";
import {useCartCounterProvider} from "../contexts/CounterContext";
import {useEffect, useState} from "react";
import Spinner from "./Spinner";
import Error from "./Error";
import DisplayDataApi from "./searchApi/apiItemsDisplay/DisplayDataApi";


export default function CartPage(){
    const {data: responseDeleteAll, isLoading: isLoadingDeleteAll, error: errorDeleteAll,
        dispatchCartOperation:dispatchDeleteAll} = useCartApi()
    const {data:newData, isLoading: isLoadingNewData, error: errorNewData, dispatchCartOperation:dispatchNewData} = useCartApi()
    const {setFetchAgain} = useCartCounterProvider()
    const [isClicked, setIsClicked] = useState(true);

    useEffect(()=>{
        console.log("Fetching counter again")
        setFetchAgain(true)

    },[newData, responseDeleteAll, setFetchAgain])

    useEffect(()=>{
        if (responseDeleteAll){
            console.log("Fetching all data again")
            dispatchNewData({type: "GET_ITEMS"})
        }
    }, [responseDeleteAll, dispatchNewData])

    useEffect(()=>{
        console.log("If ", isClicked, "Fetching all items again")
        if(isClicked){
            dispatchNewData({type: "GET_ITEMS"})
            setIsClicked(false)
        }
    },[isClicked, dispatchNewData, setIsClicked])

    const handleDeleteAll =()=>{
        dispatchDeleteAll({type:"DELETE_ALL"})
    }

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className={"col-12 h1 fst-italic fw-bolder my-2"}>
                    Cart
                </div>
                <div className="col-12">
                    <CounterDisplay/>
                </div>
                <div className="col-12 my-2">
                    {isLoadingDeleteAll? <Spinner isLoading={isLoadingDeleteAll} isSmall={true}/>:
                        <ClearAllButton handleClick={handleDeleteAll}/>
                    }
                </div>
                <div className="col-12 my-2">
                    <Error error={errorDeleteAll}/>
                </div>
                <div className="col-12 my-2">
                    {isLoadingNewData && <Spinner isLoading={isLoadingNewData} isSmall={true}/>}
                </div>
                <div className="col-12 my-2">
                    {!!errorNewData? (<Error error={errorNewData}/>): ((!!newData && !!Object.keys(newData).length)?
                        (<DisplayDataApi itemsData={Object.values(newData)} setIsClicked={setIsClicked} isBuyOption={false}/>):
                        ("Empty"))
                    }
                </div>
            </div>
        </div>
    )
}