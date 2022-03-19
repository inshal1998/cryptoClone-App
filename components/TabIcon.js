import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../constants'

const TabIcon = ({focused,icon,iconStyle,label,isTrade}) => {
    if (isTrade === true) {
        return(
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                width:60,
                height:60,
                borderRadius:30,
                backgroundColor:COLORS.black
            }}>
                <Image
                    source={icon}
                    style={{
                        width:25,
                        height:25,
                        tintColor:COLORS.white,
                        ...iconStyle
                    }}
                />
                <Text style={{color:COLORS.white,...FONTS.h4}}>{label}</Text>
            </View>
        )
    } else {
        return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image
                    source={icon}
                    style={{
                        height: 25,
                        width: 25,
                        resizeMode: 'contain',
                        tintColor: focused ? COLORS.white : COLORS.secondary,
                        ...iconStyle
                    }}
                />
                <Text style={{
                    color: focused ? COLORS.white : COLORS.secondary,
                    ...FONTS.h4
                }}>
                    {label}
                </Text>
            </View>
        )
    }
}

export default TabIcon

const styles = StyleSheet.create({})
