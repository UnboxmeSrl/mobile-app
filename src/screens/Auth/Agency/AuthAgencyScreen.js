import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader, CustomTextInput } from '../../../components'
import { useAuthAgency } from './hooks'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../../assets/images'

const AuthAgencyScreen = () => {
  const {
    isBtnDisabled,
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleBackPress,
    handleNextPress,
  } = useAuthAgency()

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'your Agency'} step={6} handleBackPress={handleBackPress} />
      <View style={styles.OptionsMainContainer}>
        <TouchableOpacity onPress={() => setSelectedValue(1)} style={styles.freelancerContainer}>
          {selectedValue === 1 ? (
            <Image source={IMAGES.checkMark} style={styles.checkMarkIcon} />
          ) : (
            <View style={styles.roundedView} />
          )}
          <Text style={styles.textStyle}>I am a freelances</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedValue(2)} style={styles.agencyContainer}>
          {selectedValue === 2 ? (
            <Image source={IMAGES.checkMark} style={styles.checkMarkIcon} />
          ) : (
            <View style={styles.roundedView} />
          )}
          <Text style={styles.textStyle}>I work with Agency</Text>
        </TouchableOpacity>
      </View>

      {selectedValue === 2 && (
        <CustomTextInput placeholder={'your Agency'} value={agencyName} handleOnChangeText={setAgencyName} />
      )}

      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>
    </View>
  )
}

export default AuthAgencyScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(150),
  },
  agencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  freelancerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.achromaticBlack,
    fontSize: moderateScale(16),
    marginLeft: scale(20),
  },
  roundedView: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(24),
    borderWidth: moderateScale(1),
    borderColor: COLORS.newPrimary,
  },
  checkMarkIcon: {
    // tintColor: COLORS.newPrimary,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  OptionsMainContainer: {
    marginLeft: scale(24),
    marginTop: verticalScale(24),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
