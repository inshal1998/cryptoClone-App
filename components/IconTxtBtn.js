import { TouchableOpacity,StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

const IconTxtBtn = ({label,icon,containerStyle,onPress}) => {
  return (
      <TouchableOpacity style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          height:50,
          backgroundColor:COLORS.white,
          borderRadius:SIZES.radius,
          ...containerStyle
      }}
      onPress={onPress}
      > 
        <Image
            source={icon}
            resizeMode="contain"
            style={{
                width:20,
                height:20
            }}
        />
        <Text style={{
            marginLeft:SIZES.base,
            ...FONTS.h3
        }}>{label}</Text>
      </TouchableOpacity>
  )
}

export default IconTxtBtn

const styles = StyleSheet.create({})