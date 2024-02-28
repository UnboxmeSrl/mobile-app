import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

const CustomTitle = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

export default CustomTitle

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: scale(24),
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    color: COLORS.achromaticBlack,
  },
})
