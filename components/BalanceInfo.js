import { ColorPropType, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const BalanceInfo = ({title , displayAmt , changePer , containerStyle}) => {
  return (
    <View style={{
        ...containerStyle,
        justifyContent:'center',
    }}>
      <Text style={{
          ...FONTS.h3,
          color:COLORS.lightGray3
      }}>{title}</Text>
      <View style={{
          flexDirection:'row',
          alignItems:'flex-end'
      }}>
        <Text style={{
            ...FONTS.h3,
            color:COLORS.lightGray3
        }}>$</Text>
        <Text style={{
            marginLeft:SIZES.base,
            ...FONTS.h2,
            color:COLORS.white
        }}>{displayAmt}</Text>
        <Text style={{
            color:COLORS.lightGray3,
            ...FONTS.h3,
            paddingLeft:5
        }}>USD</Text>
      </View>
      <View style={{
          flexDirection:"row",
          alignItems:'flex-end'
      }}>
      {
          changePer != 0 && 
            <Image
                source = {icons.upArrow}
                style={{
                    width:10,
                    height:10,
                    alignSelf:'center',
                    tintColor:(changePer > 0 ) ? COLORS.lightGreen : COLORS.red,
                    transform:(changePer > 0 ) ? [{rotate : '45deg'}] : [{rotate : '125deg'}]
                }}
            />
        }
        <Text style={{
            marginLeft:SIZES.base,
            alignSelf:"flex-end",
            color: (changePer == 0) ?COLORS.lightGray3 : (changePer > 0) ? COLORS.lightGreen : COLORS.red,
            ...FONTS.h4
        }}>{changePer.toFixed(2)} % </Text>
        <Text style={{
            marginLeft:SIZES.radius,
            alignSelf:'flex-end',
            color:COLORS.lightGray3,
            ...FONTS.h5
        }}>
            7d change
        </Text>
    </View>
    </View>

)
}

export default BalanceInfo

const styles = StyleSheet.create({})