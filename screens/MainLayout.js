import { StyleSheet, Text, View,Animated } from 'react-native'
import React, { useRef,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, icons, SIZES } from '../constants';
import { IconTxtBtn } from '../components';

const MainLayout = ({children}) => {
  const {isTradeVisible} = useSelector(state => state.tabReducer);  
  console.log("This is isTradeVisible MianLayout = ",isTradeVisible);
  const dispatch = useDispatch();
  const modalAnimatedValue = useRef(new Animated.Value(0)).current

 useEffect(()=>{
    if(isTradeVisible){
      Animated.timing(modalAnimatedValue,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }).start();
    }
    else{
      Animated.timing(modalAnimatedValue,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }).start();
    }
  },[isTradeVisible])

  const modalY = modalAnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[SIZES.height , SIZES.height - 280]
  })

  return (
    <View style={{flex:1}}>
        {children}

        {/* Dim Bg */}
        {
          isTradeVisible && 
            <Animated.View
              style={{
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0,
                backgroundColor:COLORS.transparentBlack
              }}
              opacity={modalAnimatedValue}
            />
        }


        {/* Animation Modal */}
      <Animated.View style={{
        position:'absolute',
        left:0,
        top:modalY,
        width:"100%",
        padding:SIZES.padding,
        backgroundColor:COLORS.primary
      }}>
        <IconTxtBtn
          label="Transfer"
          icon={icons.send}
          onPress={()=>{console.log("Transfer");}}
        />
        <IconTxtBtn
          label="Withdraw"
          icon={icons.withdraw}
          onPress={()=>{console.log("withdraw");}}
          containerStyle={{
            marginTop:10
          }}
        />
        
      </Animated.View>
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({})