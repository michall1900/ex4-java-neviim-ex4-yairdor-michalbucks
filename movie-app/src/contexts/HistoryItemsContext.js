import React, {createContext, useReducer, useState} from 'react';

const HistoryItemContext = createContext();

const HistoryItemsProvider = ({ children }) => {
    const [historyItems, setHistoryItems] = useState({})
    const value = {historyItems, setHistoryItems}
    return (
        <HistoryItemContext.Provider value={value}>
            {children}
        </HistoryItemContext.Provider>
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