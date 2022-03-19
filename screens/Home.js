import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MainLayout } from './';
import { useSelector,useDispatch } from "react-redux";
import { getHoldings,getCoinHoldings  }  from "../stores/market/marketAction";
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';
import { BalanceInfo, ChartComponent, IconTxtBtn } from '../components';
import { set } from 'react-native-reanimated';

const Home = () => {
    const {myHoldings , coins} = useSelector(state => state.marketReducer)
    const [selectedCoin, setselectedCoin] = useState(null)
    console.log("My Holdings Home   = ",myHoldings);

    let totalWallet  = myHoldings.reduce((a , b)=> a + (b.total || 0),0)
    let valueChange  = myHoldings.reduce((a , b)=> a + (b.price_change_percentage_7d_in_currency || 0),0)
    let perchange = valueChange / (totalWallet - valueChange) * 100

    const dispatch = useDispatch()
    console.log("This is Full Coins = ",coins);
    console.log("This is Full Holdings = ",myHoldings);
        useEffect(() => {
            dispatch(getHoldings(holdings = dummyData.holdings))
            dispatch(getCoinHoldings())
        }, [perchange]);

        const renderWalletIfoSecttion = () =>{
            return(
                <View style={{
                    paddingHorizontal:SIZES.padding,
                    borderBottomLeftRadius:25,
                    borderBottomRightRadius:25,
                    backgroundColor:COLORS.gray
                }}>
                    <BalanceInfo
                        title ="Your Wallet"
                        displayAmt =  {totalWallet}
                        changePer = {perchange}
                        containerStyle = {{
                            marginVertical:10,
                        }}
                    />
                    <View style={{
                        flexDirection:'row',
                        marginTop:15,
                        marginBottom:-15,
                        paddingHorizontal:SIZES.radius
                    }}>
                        <IconTxtBtn
                            label = "Transfer"
                            icon={icons.send}
                            containerStyle={{
                                flex:1,
                                height:40,
                                marginRight:SIZES.radius
                            }}
                            onPress={()=>{
                                console.log("Transfer");
                            }}
                        />
                        <IconTxtBtn
                            label = "Withdraw"
                            icon={icons.withdraw}
                            containerStyle={{
                                flex:1,
                                height:40,
                                marginRight:SIZES.radius
                            }}
                            onPress={()=>{
                                console.log("Transfer");
                            }}
                        />
                    </View>
                </View>
            )
        }

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor:COLORS.black,
            }}>

                {/* Header Section */}

                    {
                        renderWalletIfoSecttion()
                    }

                {/* Body Section */}

                    <ChartComponent
                        containerStyle={{
                            marginTop:SIZES.padding * 2
                        }}
                        chartPrices = { selectedCoin ? selectedCoin?.sparkline_in_7d?.price:  coins[0]?.sparkline_in_7d?.price}
                    />
                {/* Top Crypto  */}
                <FlatList
                    data={coins}
                    keyExtractor = {item =>item.id}
                    contentContainerStyle={{
                        marginTop:30,
                        paddingHorizontal:SIZES.padding
                    }}
                    ListHeaderComponent ={
                        <View style={{
                            marginBottom:SIZES.radius
                        }}>
                            <Text style={{
                                color:COLORS.white,
                                ...FONTS.h3,
                                fontSize:18
                            }}>Top Cryptocurrency</Text>
                        </View>
                    }
                    renderItem = {({ item  })=>{
                        let priceColor = 
                            (item.price_change_percentage_7d_in_currency === 0 ) ? COLORS.lightGray :
                            (item.price_change_percentage_7d_in_currency > 0 ) ? COLORS.lightGreen :COLORS.red
                        return(
                            <TouchableOpacity 
                            onPress={()=>{
                                setselectedCoin(item)
                            }}
                            style={{
                                height:55,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <View style={{
                                    width:35
                                }}>
                                    <Image
                                        source={{uri:item.image}}
                                        style={{
                                            height:20,
                                            width:20

                                        }}
                                    />
                                </View>
                                <View style={{
                                    flex:1
                                }}>
                                    <Text style={{
                                        ...FONTS.h3,
                                        color:COLORS.black
                                    }}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        textAlign:'right',
                                        color:COLORS.black,
                                        ...FONTS.h4
                                    }}>
                                       $ {item.current_price}
                                    </Text>
                                    <View style={{
                                        flexDirection:'row'
                                    }}>
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 &&
                                                <Image
                                                    source={icons.upArrow}
                                                    style={{
                                                        height:10,
                                                        width:10,
                                                        tintColor:priceColor,
                                                        transform:item.price_change_percentage_7d_in_currency > 0 ?[{rotate:'45deg'}] : [{rotate:"125deg"}]
                                                    }}
                                                />
                                        }
                                        <Text style={{
                                            color:priceColor,
                                            marginLeft:5,
                                            ...FONTS.body5,
                                            lineHeight:15
                                        }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View
                            style={{
                                marginBottom:50
                            }}
                        ></View>
                    }
                />

            </View>
        </MainLayout>
    )
}

export default Home;
