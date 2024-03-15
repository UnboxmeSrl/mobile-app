import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuthNationality } from './hooks'
import { CustomButton, CustomHeader } from '../../../components'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CountryPicker from 'react-native-country-picker-modal'
import CountryFlag from 'react-native-country-flag'

const AuthNationalityScreen = () => {
  const { isBtnDisabled, country, handleNextPress, handleBackPress, onSelect } = useAuthNationality()

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Nationality'} step={4} handleBackPress={handleBackPress} />
      <CountryPicker
        onSelect={onSelect}
        containerButtonStyle={styles.countryContainer}
        withEmoji={true}
        withFlagButton={true}
        withFilter={true}
        renderFlagButton={({ onOpen }) => {
          return (
            <TouchableOpacity onPress={() => onOpen()} style={styles.countryContainer} activeOpacity={0.5}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {country?.cca2 ? (
                  <CountryFlag isoCode={country?.cca2 ?? 'de'} size={25} />
                ) : (
                  <Image source={IMAGES.sampleFlag} style={styles.flagIcon} resizeMode={'contain'} />
                )}
                <Text style={styles.countryText}>{`${country?.name ?? 'Country'}`}</Text>
              </View>
              <Image source={IMAGES.downArrow} style={styles.downArrowIcon} />
            </TouchableOpacity>
          )
        }}
      />
      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>
    </View>
  )
}

export default AuthNationalityScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(170),
  },
  flagIcon: {
    width: scale(24),
    height: verticalScale(18),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  countryContainer: {
    marginTop: verticalScale(15),
    height: verticalScale(48),
    paddingHorizontal: scale(15),
    width: '85%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(14),
    marginLeft: scale(10),
  },
  downArrowIcon: {
    height: verticalScale(6.38),
    width: scale(11.63),
  },
})
