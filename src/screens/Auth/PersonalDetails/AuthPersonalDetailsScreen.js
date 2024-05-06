import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets/images';
import {CustomButton, CustomHeader, CustomTextInput} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthPersonalDetails} from './hooks';

const AuthPersonalDetailsScreen = () => {
  const {
    isBtnDisabled,
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
    country,
    onSelect,
    handleNextPress,
  } = useAuthPersonalDetails();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader title={'personal details'} step={1} />
        <CustomTextInput
          placeholder={'Name'}
          value={name}
          handleOnChangeText={setName}
        />
        <CustomTextInput
          placeholder={'Surname'}
          value={surname}
          handleOnChangeText={setSurname}
        />
        <CustomTextInput
          placeholder={'Nickname'}
          value={nickName}
          handleOnChangeText={setNickName}
        />
        <View style={styles.phoneNumberMainContainer}>
          <View style={styles.countryCodeContainer}>
            <CountryPicker
              onSelect={onSelect}
              withFilter={true}
              withCallingCode={true}
              renderFlagButton={({onOpen}) => {
                return (
                  <TouchableOpacity
                    onPress={onOpen}
                    style={styles.countryCodeInnerContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.countryCallingCodeText}>{`+${
                      country?.callingCode?.[0] ?? '21'
                    }`}</Text>
                    <Image
                      source={IMAGES.downArrow}
                      style={styles.downArrowIcon}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View
            style={[
              styles.phoneNumberTextInputContainer,
              isFocused && styles.phoneNumberTextInputContainerWithFocus,
            ]}>
            <TextInput
              allowFontScaling={false}
              placeholder={'Phone number'}
              value={phoneNumber}
              onChangeText={val => {
                const strippedInput = val.replace(/\D/g, '');
                setPhoneNumber(strippedInput.trim());
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={styles.phoneNumberTextInput}
              keyboardType={'number-pad'}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            title={'Next'}
            handlePress={handleNextPress}
            disabled={isBtnDisabled}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthPersonalDetailsScreen;

const styles = StyleSheet.create({
  countryCallingCodeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  countryCodeInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  phoneNumberMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  downArrowIcon: {
    marginLeft: scale(5),
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
    color: COLORS.black,
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
  },
});
