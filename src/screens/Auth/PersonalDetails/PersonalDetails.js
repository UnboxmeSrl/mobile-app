import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { CustomButton, CustomHeader, CustomTextInput } from '../../../components'
import { COLORS, FONTS } from '../../../constants'
import { usePersonalDetails } from './hooks'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../../assets/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const PersonalDetails = () => {
  const {
    name,
    setName,
    surname,
    setSurname,
    nickName,
    setNickName,
    phoneNumber,
    setPhoneNumber,
    isFocused,
    setIsFocused,
  } = usePersonalDetails()

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <CustomHeader title={'personal details'} />
        <CustomTextInput placeholder={'Name'} value={name} handleOnChangeText={setName} />
        <CustomTextInput placeholder={'Surname'} value={surname} handleOnChangeText={setSurname} />
        <CustomTextInput placeholder={'Nickname'} value={nickName} handleOnChangeText={setNickName} />
        <View style={styles.phoneNumberMainContainer}>
          <View style={styles.countryCodeContainer}>
            <Text>+21</Text>
            <Image source={IMAGES.downArrow} style={styles.downArrowIcon} />
          </View>
          <View
            style={[styles.phoneNumberTextInputContainer, isFocused && styles.phoneNumberTextInputContainerWithFocus]}
          >
            <TextInput
              placeholder={'Phone number'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={styles.phoneNumberTextInput}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={() => {}} />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default PersonalDetails

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(70),
  },
  phoneNumberMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  downArrowIcon: {
    height: verticalScale(6.38),
    width: scale(11.63),
  },
  countryCodeContainer: {
    marginTop: verticalScale(15),
    height: verticalScale(48),
    width: '20%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  phoneNumberTextInputContainer: {
    marginTop: verticalScale(15),
    height: verticalScale(48),
    width: '66%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
  },
  phoneNumberTextInput: {
    marginLeft: scale(10),
    fontFamily: FONTS.quicksand,
    fontWeight: '600',
    fontSize: moderateScale(14),
    width: '100%',
  },
  phoneNumberTextInputContainerWithFocus: {
    borderWidth: moderateScale(2),
    borderColor: COLORS.black,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
