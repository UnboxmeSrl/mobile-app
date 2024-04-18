import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader } from '../../../components'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { moderateScale, scale } from 'react-native-size-matters'
import { verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../../assets/images'
import { useAuthDateOfBirth } from './hooks'
import DatePicker from 'react-native-date-picker'
import { hasNotch } from '../../../utils'

const AuthDateOfBirthScreen = () => {
  const {
    isBtnDisabled,
    isDatePickerOpen,
    setIsDatePickerOpen,
    // date,
    selectedDate,
    setSelectedDate,
    handleBackPress,
    handleNextPress,
  } = useAuthDateOfBirth()

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Date of birth'} step={3} handleBackPress={handleBackPress} />
      <TouchableOpacity onPress={() => setIsDatePickerOpen(true)} style={styles.dateContainer} activeOpacity={0.5}>
        <Text style={styles.dateText}>
          {`${
            selectedDate
              ? `${selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate()}/${
                  selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
                }/${selectedDate.getFullYear()}`
              : 'DD/MM/YYYY'
          }`}
        </Text>
        <Image source={IMAGES.calender} style={styles.calenderIcon} />
      </TouchableOpacity>
      <DatePicker
        date={selectedDate ?? new Date()}
        modal
        mode={'date'}
        onCancel={() => {
          setIsDatePickerOpen(false)
        }}
        onConfirm={(date) => {
          setIsDatePickerOpen(false)
          setSelectedDate(date)
        }}
        open={isDatePickerOpen}
      />
      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>
    </View>
  )
}

export default AuthDateOfBirthScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(170),
  },
  dateText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(14),
  },
  dateContainer: {
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
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: getStatusBarHeight() + (hasNotch && verticalScale(15)),
  },
  calenderIcon: {
    height: verticalScale(18.42),
    width: scale(18),
    tintColor: COLORS.achromaticBlack,
  },
})
