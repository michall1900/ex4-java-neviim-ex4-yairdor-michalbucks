import React, {createContext, useEffect, useState} from 'react';
import useDataApi from "../custom_hooks/useDataApi";

const CounterContext = createContext();

const GET_CART_COUNTER = "/api/cart/counter"
const ERROR_MSG = 'useCartCounterProvider must be used within a CounterProvider'

/**
 * This context handle with the counter of the cart.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const CounterProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0)
    const [isFetchAgain, setFetchAgain] = useState(false)
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null, null, null)


    const value = {isLoading, error, setFetchAgain,cartCount}

    /**
     * to update the counter in data changes.
     */
    useEffect(()=>{
        if (!error && !!data && !Number.isNaN(data) && Number.isInteger(data) && (+data)>=0){
            setCartCount(!!data? +data:0)
        }

    },[data,error])

    /**
     * To fetch again the counter from the api.
     */
    useEffect(()=>{
        if (isFetchAgain){
            setFetchTrigger(true)
            doFetch(GET_CART_COUNTER)
            //console.log("Fetchingggggg again")
            setFetchAgain(false)
        }

    }, [isFetchAgain, doFetch, setFetchTrigger])

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

/**
 * Return the
 * @returns {unknown}
 */
function useCartCounterProvider() {
    const context = React.useContext(CounterContext)
    if (!context) {
        throw new Error(ERROR_MSG)
    }
    return context
}

export {CounterProvider, useCartCounterProvider};