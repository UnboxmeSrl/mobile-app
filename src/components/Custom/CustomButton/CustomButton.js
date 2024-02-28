import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const CustomButton = ({ title, handlePress }) => {
  return (
    <View style={styles.btnMainContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
        <Text style={styles.btnText}> {title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  btnMainContainer: {
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  btnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },
})
