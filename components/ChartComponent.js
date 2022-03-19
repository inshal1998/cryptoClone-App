import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment, { min }  from "moment";
import { 
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation
 } from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from '../constants';

const ChartComponent = ({containerStyle ,chartPrices }) => {

  let startUnixTimeStamp = moment().subtract(7,'days').unix()  
  let data = chartPrices ? chartPrices ?.map(( item, index )=>{
    return{
      x : startUnixTimeStamp + (index +1) * 3600,
      y: item
    }
  }): []
  const points = monotoneCubicInterpolation({data, range: 40});


  const formatUSD = (value) =>{
    'worklet';
    if(value === '')
      return 'aa'
    return `$${Number(value).toFixed(2)}`
  }

  const formatDateTime = (value)=>{
    'worklet';
    if(value === ''){
      return ''
    }
    var selectedDate = new Date(value * 1000);
    let date = `0${selectedDate.getDate()}`.slice(-2)
    let month = `0${selectedDate.getMonth()+1}`.slice(-2)
    return `${date} / ${month}`
  }

  const formatno = (value, roundingPoint)=>{
    if(value > 1e9){
      return `${(value / 1e9).toFixed(roundingPoint)} B`
    }else if (value > 1e6){
      return `${(value / 1e6).toFixed(roundingPoint)} M`
    }else if (value > 1e3){
      return `${(value / 1e3).toFixed(roundingPoint)} K`
    }else{
      return value.toFixed(roundingPoint)
    }
  }

  const getYAxisValue = () =>{
    if(chartPrices != undefined){
      let minValue = Math.min(...chartPrices)
      let maxValue = Math.max(...chartPrices)
      let midValue = (minValue + maxValue) /2
      let higherMidValue = (midValue + maxValue) /2;
      let lowerMidValue = (midValue + minValue) /2;
      let roundingPoint = 2;
      return [
        formatno(maxValue , roundingPoint),
        formatno(minValue , roundingPoint),
        formatno(midValue , roundingPoint),
        formatno(higherMidValue , roundingPoint),
        formatno(lowerMidValue , roundingPoint)
      ]
    }else{
      return []
    }
  }

  return (
    <View style={{
      ...containerStyle
    }}>
      <View style={{
        position:'absolute',
        left:SIZES.padding,
        top:0,
        bottom:0,
        justifyContent:'space-between'
      }}>
        {
          getYAxisValue().map((item , index)=>{
            return(
              <Text style={{
                color:COLORS.black,
                ...FONTS.body5,
              }}key={index}>{item}</Text>
            )
          })
        }
      </View>
      {
        data.length > 0 && 
          <ChartPathProvider
            data = {{
              points,
              smoothingStrategy:'bezier'
            }}
          >
              <ChartPath
                height = {150}
                width= {SIZES.width}
                strokeWidth = {2}
                stroke = {COLORS.lightGreen}
                gestureEnabled={true}
              />
                <ChartDot>
                  <View style={{
                    position:'absolute',
                    left:-35,
                    alignItems:'center',
                    backgroundColor:COLORS.transparentBlack1
                  }}>
                      <View
                        style={{
                          justifyContent:'center',
                          alignItems:'center',
                          height:25,
                          width:25,
                          backgroundColor:COLORS.white,
                          borderRadius:50
                        }}
                      >
                        <View
                          style={{
                            width:15,
                            height:15,
                            borderRadius:10,
                            backgroundColor:COLORS.lightGreen
                          }}
                        />
                      </View>
                      <ChartYLabel
                        format={formatUSD}
                          style={{
                            ...FONTS.body5,
                            color:COLORS.black
                          }}
                      />
                      <ChartXLabel
                        format={formatDateTime}
                        style={{
                          marginTop:1,
                          width:60,
                          color:COLORS.lightGray3,
                          ...FONTS.body5,
                          // lineHeight:10
                        }}
                      />
                  </View>
                </ChartDot>
          </ChartPathProvider>
      }
    </View>
  )
}

export default ChartComponent

const styles = StyleSheet.create({})