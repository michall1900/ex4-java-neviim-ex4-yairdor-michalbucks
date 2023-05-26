import React, { createContext, useReducer } from 'react';

const HistoryContext = createContext();

// Reducer for history state
const historyReducer = (history, action) => {
    switch (action.type) {
        case 'ADD': {
            const newHistory = new Map(history)
            newHistory.set(action.item.request, action.item.details);
            console.log(newHistory);
            return newHistory;
        }
        case 'DELETE': {
            const newHistory = new Map(history)
            newHistory.delete(action.item.request);
            return newHistory;
        }
        case 'DELETE_ALL': {
            return new Map();
        }
        default:
            throw Error('Invalid history handler choice');
    }
};

// Custom history provider component
const HistoryProvider = ({ children }) => {
    const [history, dispatchHistory] = useReducer(historyReducer, new Map());
    const value = {history, dispatchHistory}
    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

function useHistory() {
    const context = React.useContext(HistoryContext)
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider')
    }
    return context
}

export {HistoryProvider, useHistory };