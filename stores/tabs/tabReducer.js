import { IS_TRADE_VISIBLE } from "./tabAction";
 const initialState = {
    isTradeVisible: false,
 }

 function tabReducer(state = initialState, action) {
        switch (action.type) {
            case IS_TRADE_VISIBLE:
                return {
                    ...state,
                    isTradeVisible: action.payload
                };
            default:
                return state;
        }
 }
 export default tabReducer;