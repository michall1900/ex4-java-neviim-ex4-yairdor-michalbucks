import React, { createContext, useReducer } from 'react';

const HistoryContext = createContext();
const ERROR_MSG_CHOCE = 'Invalid history handler choice'
const ERROR_MSG = 'useHistory must be used within a HistoryProvider'
/**
 * This is a reducer for the history - enable to add item, delete or delete all the history.
 * @param history The history current state.
 * @param action The action that should be done.
 * @returns {Map<any, any>|Map<unknown, unknown>}
 * @throws Error while inserting invalid choice. The choices are: ADD, DELETE, DELETE_ALL
 */
const historyReducer = (history, action) => {
    switch (action.type) {
        case 'ADD': {
            const newHistory = new Map(history)
            newHistory.set(action.item.request, {details: action.item.details, tvOrMovie:action.item.tvOrMovie});
            //console.log("history add - ", action.item.request, action.item.details)
            return newHistory;
        }
        case 'DELETE': {
            const newHistory = new Map(history)
            newHistory.delete(action.item.request);
            //console.log("history delete - ", action.item.request)
            return newHistory;
        }
        case 'DELETE_ALL': {
            //console.log("History click")
            return new Map();
        }
        default:
            throw Error(ERROR_MSG_CHOCE);
    }
};

/**
 * The History provider.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryProvider = ({ children }) => {
    const [history, dispatchHistory] = useReducer(historyReducer, new Map());
    const value = {history, dispatchHistory}
    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

/**
 * Use history - return the relevant history states - history, dispatchHistory.
 * @returns {unknown}
 */
function useHistory() {
    const context = React.useContext(HistoryContext)
    if (!context) {
        throw new Error(ERROR_MSG)
    }
    return context
}

export {HistoryProvider, useHistory };