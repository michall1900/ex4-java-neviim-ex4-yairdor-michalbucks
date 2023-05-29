import React, {createContext, useEffect, useState} from 'react';
import useDataApi from "../customHooks/useDataApi";

const CounterContext = createContext();

const GET_CART_COUNTER = "/api/cart/counter"

const CounterProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0)
    const [isFetchAgain, setFetchAgain] = useState(true)
    const [{data, isLoading, error}, doFetch, setFetchTrigger] = useDataApi(null, null, null)


    const value = {isLoading, error, setFetchAgain,cartCount}


    useEffect(()=>{
        if (!error){
            setCartCount(!!data? +data:0)
        }

    },[data,error])

    useEffect(()=>{
        if (isFetchAgain){
            console.log("Fetching")
            doFetch(GET_CART_COUNTER)
            setFetchTrigger(true)
            setFetchAgain(false)
        }

    }, [isFetchAgain, doFetch, setFetchTrigger])

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

function useCartCounterProvider() {
    const context = React.useContext(CounterContext)
    if (!context) {
        throw new Error('useCartCounterProvider must be used within a CounterProvider')
    }
    return context
}

export {CounterProvider, useCartCounterProvider};