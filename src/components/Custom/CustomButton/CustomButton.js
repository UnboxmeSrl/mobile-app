import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const CustomButton = ({ title, handlePress, disabled = false, isLoading = false }) => {
  return (
    <View style={styles.btnMainContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        style={[styles.btnContainer, disabled && styles.disabledBtnContainer]}
      >
        {isLoading ? (
          <ActivityIndicator size={30} color={COLORS.black22} />
        ) : (
          <Text style={[styles.btnText, disabled && styles.disabledBtnText]}> {title}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  disabledBtnText: {
    color: COLORS.gray,
  },
  disabledBtnContainer: {
    backgroundColor: COLORS.cultured,
  },
  btnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
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
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },
})
