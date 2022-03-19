export const IS_TRADE_VISIBLE = 'IS_TRADE_VISIBLE';

export const isTrade = payload => dispatch => {
    console.log("Dispatch",dispatch ," ------ ",payload);
    dispatch({
        type:IS_TRADE_VISIBLE,
        payload
    })
}