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
import {
  moderateScale,
  s,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {IMAGES} from '../../../assets/images';
import {CustomButton, CustomHeader, CustomTextInput} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthPersonalDetails} from './hooks';
import CountryFlag from 'react-native-country-flag';
import AppSelect from '../../../components/Elements/AppSelect';
import DatePicker from 'react-native-date-picker';

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
    isDatePickerOpen,
    setIsDatePickerOpen,
    selectedDate,
    setSelectedDate,
    setCity,
    city,
    onSelectNationality,
    nationality,
    genderList,
    selectedGender,
    setSelectedGender,
  } = useAuthPersonalDetails();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title={'Personal details'} step={1} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={styles.content}>
          <CustomTextInput
            placeholder={'Name'}
            value={name}
            handleOnChangeText={setName}
            inputWrapperStyle={styles.cstInputWrapper}
            style={styles.cstInputContainer}
          />
          <CustomTextInput
            placeholder={'Surname'}
            value={surname}
            handleOnChangeText={setSurname}
            inputWrapperStyle={styles.cstInputWrapper}
            style={styles.cstInputContainer}
          />
          <CustomTextInput
            placeholder={'Nickname'}
            value={nickName}
            handleOnChangeText={setNickName}
            inputWrapperStyle={styles.cstInputWrapper}
            style={styles.cstInputContainer}
          />
          <CustomTextInput
            placeholder={'City where you are based most of the time'}
            value={city}
            handleOnChangeText={setCity}
            inputWrapperStyle={styles.cstInputWrapper}
            style={styles.cstInputContainer}
          />

          <AppSelect
            data={
              genderList?.map(data => {
                return {
                  id: data.id,
                  name: data.Sex,
                };
              }) || []
            }
            setSelectedValue={setSelectedGender}
            selectedValue={selectedGender}
            placeholder={'select your gender'}
          />

          <CountryPicker
            onSelect={onSelectNationality}
            containerButtonStyle={styles.countryContainer}
            withEmoji={true}
            withFlagButton={true}
            withFilter={true}
            renderFlagButton={({onOpen}) => {
              return (
                <TouchableOpacity
                  onPress={() => onOpen()}
                  style={styles.countryContainer}
                  activeOpacity={0.5}>
                  <View style={styles.innerCountryContainer}>
                    {nationality?.cca2 ? (
                      <CountryFlag
                        isoCode={nationality?.cca2 ?? 'de'}
                        size={20}
                      />
                    ) : (
                      <Image
                        source={IMAGES.sampleFlag}
                        style={styles.flagIcon}
                        resizeMode={'contain'}
                      />
                    )}
                    <Text
                      allowFontScaling={false}
                      style={styles.countryText}>{`${
                      nationality?.name ?? 'Country of origin'
                    }`}</Text>
                  </View>
                  <Image
                    source={IMAGES.downArrow}
                    style={styles.downArrowIcon}
                  />
                </TouchableOpacity>
              );
            }}
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
                placeholderTextColor={COLORS.grey}
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

          <View>
            <TouchableOpacity
              onPress={() => setIsDatePickerOpen(true)}
              style={styles.dateContainer}
              activeOpacity={0.5}>
              <Text allowFontScaling={false} style={styles.dateText}>
                {`${
                  selectedDate
                    ? `${
                        selectedDate.getDate() < 10
                          ? `0${selectedDate.getDate()}`
                          : selectedDate.getDate()
                      }/${
                        selectedDate.getMonth() + 1 < 10
                          ? `0${selectedDate.getMonth() + 1}`
                          : selectedDate.getMonth() + 1
                      }/${selectedDate.getFullYear()}`
                    : 'Birthday'
                }`}
              </Text>
              <Image source={IMAGES.calender} style={styles.calenderIcon} />
            </TouchableOpacity>
            <DatePicker
              date={selectedDate ?? new Date()}
              modal
              mode={'date'}
              onCancel={() => {
                setIsDatePickerOpen(false);
              }}
              onConfirm={date => {
                setIsDatePickerOpen(false);
                setSelectedDate(date);
              }}
              open={isDatePickerOpen}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title={'Next'}
        handlePress={handleNextPress}
        disabled={isBtnDisabled}
        btnWrapper={styles.btnWrapper}
      />
    </SafeAreaView>
  );
};

export default AuthPersonalDetailsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: verticalScale(14),
    rowGap: verticalScale(14),
    width: '100%',
  },
  countryCallingCodeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  countryCodeInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cstInputContainer: {
    marginTop: 0,
    width: '100%',
  },
  cstInputWrapper: {
    width: '100%',
  },
  cstInputFocusStyle: {
    width: '100%',
  },
  btnWrapper: {
    marginTop: 0,
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
    // marginTop: verticalScale(15),
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
    // marginTop: verticalScale(15),
    height: verticalScale(48),
    flex: 1,
    // width: '66%',
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
  countryContainer: {
    height: verticalScale(48),
    paddingHorizontal: scale(15),
    width: '100%',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 28,
  },
  countryText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    marginLeft: scale(10),
  },
  dateText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(14),
  },
  dateContainer: {
    // marginTop: verticalScale(15),
    height: verticalScale(48),
    paddingHorizontal: scale(15),
    width: '100%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderIcon: {
    height: verticalScale(18.42),
    width: scale(18),
    tintColor: COLORS.achromaticBlack,
  },
});
