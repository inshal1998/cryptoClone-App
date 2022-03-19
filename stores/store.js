import {combineReducers,createStore,applyMiddleware} from 'redux';
import tabReducer from "./tabs/tabReducer";
import marketReducer from "./market/marketReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    tabReducer,
    marketReducer
})

export const Store =  createStore(rootReducer,applyMiddleware(thunk));