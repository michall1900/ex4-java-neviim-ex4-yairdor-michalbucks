import CounterDisplay from "../CounterDisplay";
import useCartApi from "../../custom_hooks/useCartApi";
import {useCartCounterProvider} from "../../contexts/CounterContext";
import {useEffect, useState} from "react";
import Spinner from "../Spinner";
import Error from "../Error";
import DisplayDataApi from "../search_api/api_items_display/DisplayDataApi";
import globalConstantsModule from "../../utilities/globalConstantsModule";
import ResponsiveButton from "../ResponsiveButton";
import {BsTrash} from "react-icons/bs";

/**
 * This Component is handle with cart page display.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CartPage(){
    const {data: responseDeleteAll, isLoading: isLoadingDeleteAll, error: errorDeleteAll,
        dispatchCartOperation:dispatchDeleteAll} = useCartApi()
    const {data:newData, isLoading: isLoadingNewData, error: errorNewData, dispatchCartOperation:dispatchNewData} = useCartApi()
    const {error:errorCount, isLoading:isLoadingCount, cartCount, setFetchAgain} = useCartCounterProvider()
    const [isClicked, setIsClicked] = useState(false);
    useEffect(()=>{
        dispatchNewData({type: "GET_ITEMS"})
    },[dispatchNewData])
    /**
     * The effect handle with changed data - fetching the cart counter again.
     */
    useEffect(()=>{
        if (!!newData || !!errorNewData){
            setFetchAgain(true)
            setIsClicked(false)
        }

    },[newData, responseDeleteAll, setFetchAgain, errorNewData])

    /**
     * This effect is handle with the case that delete all press success.
     */
    useEffect(()=>{
        if (!!responseDeleteAll){
            dispatchNewData({type: "GET_ITEMS"})
        }
    }, [responseDeleteAll, dispatchNewData])

    /**
     * This effect is handle with the case that user is clicked on add/delete and its successfully done.
     */
    useEffect(()=>{
        if(isClicked){
            dispatchNewData({type: "GET_ITEMS"})
        }
    },[isClicked, dispatchNewData, setIsClicked])

    /**
     * This function is handle with pressing on delete all
     */
    const handleDeleteAll =()=>{
        if (!isLoadingDeleteAll)
            dispatchDeleteAll({type:"DELETE_ALL"})
    }

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <div className={"col-12 h1 fst-italic fw-bolder my-2"}>
                    Cart
                </div>
                <div className="col-12 my-2">
                    <CounterDisplay/>
                </div>
                {!errorCount && !isLoadingCount && cartCount>0 &&
                (<div className="col-12 my-2 fw-bold">
                    Total cost = {cartCount * globalConstantsModule.ITEM_PRICE}$
                </div>)}
                <div className="col-12 my-2">
                    {!!cartCount &&<ResponsiveButton handleClick={handleDeleteAll} isLoading={isLoadingDeleteAll}
                                                      buttonName="Clear All" btnClassName="btn-primary btn-sm"
                                                      icon={<BsTrash/>} error={errorDeleteAll}/>}
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