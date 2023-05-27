import React, {createContext, useState} from 'react';

const CounterContext = createContext();

const CounterProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState({})
    const value = {cartCount, setCartCount}
    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

function useHistoryItems() {
    const context = React.useContext(HistoryItemContext)
    if (!context) {
        throw new Error('useHistoryItems must be used within a HistoryItemsProvider')
    }
    return context
}

export {HistoryItemsProvider, useHistoryItems };