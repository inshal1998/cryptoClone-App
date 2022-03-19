import axios from "axios";

export const GET_HOLDINGS_BEGIN= "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";

export const GET_COIN_MARKET_BEGIN= "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

export const getHoldingSuccess = (myHoldings)=>{
    return {
        type:GET_HOLDINGS_SUCCESS,
        payload:{myHoldings}
    }
}

export const getHoldingFailure = (error)=>{
    return {
        type:GET_HOLDINGS_FAILURE,
        payload:{error}
    }
}

export const getHoldings = (
        holdings=[],
        currency = "usd",
        orderBy = "market_cap_desc",    
        sparkline =true,
        priceChangePerc="7d",
        perPage=10,
        page=1
    )=>{
        return dispatch =>{
            const ids = holdings.map((item)=>{
                return item.id
            }).join(",")
            let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`
            return axios({
                url:apiUrl,
                method:'GET',
                headers:{
                    Accept:'application/json'
                }
            }).then((response)=>{
                if(response.status === 200){
                    console.log("This is Holding Response = ",response.data);
                    let myHoldings = response.data.map((item)=>{
                        let coin = holdings.find(a => a.id ==item.id)
                        let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
                        return {
                            id:item.id,
                            symbol:item.symbol,
                            name:item.name,
                            image:item.image,
                            current_price:item.current_price,
                            qty:coin.qty,
                            total:coin.qty * item.current_price,
                            price_change_percentage_7d_in_currency:item.price_change_percentage_7d_in_currency,
                            holding_value_change_7d:(item.holding_value_change_7d - price7d ) * coin.qty,
                            sparkline_in_7d:{
                                value:item.sparkline_in_7d.price.map((price)=>{
                                    return price * coin.qty
                                })
                            }
                        }
                    })
                    dispatch(getHoldingSuccess(myHoldings))
                }else{
                    dispatch(getHoldingFailure(response.data))
                }
            }).catch((error)=>{
                dispatch(getHoldingFailure(error))
            })
        }
}

export const getCoinSuccess = (coins) =>{
    return{
        type:GET_COIN_MARKET_SUCCESS,
        payload:{coins}
    }
}

export const getCoinFailure = (error) =>{
    return{
        type:GET_COIN_MARKET_FAILURE,
        payload:{error}
    }
}
export const getCoinBegin = () =>{
    return{
        type:GET_COIN_MARKET_BEGIN,
    }
}
export const getCoinHoldings = (
    currency ="usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 10,
    page =1
) =>{
    return dispatch =>{
        dispatch(getCoinBegin())
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
        return axios ({
            url:apiUrl,
            method:"GET",
            header:{
                Accept:'appiclation/json'
            }
        }).then((response)=>{
            if(response.status ==200){
                console.log("This is Coin Response = ",response.data);
                dispatch(getCoinSuccess(response.data))
            }else{
                dispatch(getCoinFailure(response.status))
            }
        }).catch((error)=>{
            dispatch(getCoinFailure(error))
        })
    }
}
