import React, { createContext, useReducer } from 'react';

const HistoryContext = createContext();

// Reducer for history state
const historyReducer = (history, action) => {
    switch (action.type) {
        case 'ADD': {
            history.set(action.item.request, action.item.details);
            console.log(history);
            return history;
        }
        case 'DELETE': {
            history.delete(action.item.request);
            return history;
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