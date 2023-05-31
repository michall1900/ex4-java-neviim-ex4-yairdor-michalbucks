import React, {createContext, useState} from 'react';

const HistoryItemContext = createContext();

/**
 * This component is handle with history items save.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
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