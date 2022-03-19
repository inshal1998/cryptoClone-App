import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Portfolio, Market, Profile, MainLayout } from "../screens"
import { COLORS, icons } from "../constants"
import { TabIcon } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { isTrade  } from "../stores/tabs/tabAction";
const Tab = createBottomTabNavigator()


const CustomTabBarBtn = ({children,onPress}) => {
    return(
        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const Tabs = () => {
    const {isTradeVisible} = useSelector(state => state.tabReducer);
    
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isTradeVisible){
                            return(
                                <TabIcon
                                    focused={focused}
                                    label="Home"
                                    icon={icons.home}
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners = {{
                    tabPress: e => {
                        if(isTradeVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isTradeVisible){
                            return(
                                <TabIcon
                                    focused={focused}
                                    label="Portfolio"
                                    icon={icons.briefcase}
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners = {{
                    tabPress: e => {
                        if(isTradeVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarButton:(props)=>{
                        return(
                            <CustomTabBarBtn {...props} 
                                onPress={()=>{
                                    dispatch(isTrade(!isTradeVisible))
                                }}
                            />
                        )
                    },
                    tabBarIcon: ({ focused }) => {
                            return(
                                <TabIcon
                                    focused={focused}
                                    label={ isTradeVisible ? "Cancel" : "Trade" } 
                                    icon={isTradeVisible? icons.close  :  icons.trade}
                                    iconStyle={isTradeVisible ? {
                                        width:15,
                                        height:15
                                    }:null}
                                    isTrade={true}
                                />
                            )
                    }
                }}
                
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isTradeVisible){
                            return(
                                    <TabIcon
                                        focused={focused}
                                        label="Market"
                                        icon={icons.market}
                                        isTrade={false}
                                    />
                            )
                        }
                    }
                }}
                listeners = {{
                    tabPress: e => {
                        if(isTradeVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isTradeVisible){
                            return(
                                <TabIcon
                                    focused={focused}
                                    label="Profile"
                                    icon={icons.profile}
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners = {{
                    tabPress: e => {
                        if(isTradeVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;