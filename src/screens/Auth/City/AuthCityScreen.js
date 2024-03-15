import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader, CustomTextInput } from '../../../components'
import { COLORS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useAuthCity } from './hooks'
import { verticalScale } from 'react-native-size-matters'

const AuthCityScreen = () => {
  const { isBtnDisabled, city, setCity, handleBackPress, handleNextPress } = useAuthCity()
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'City'} step={5} handleBackPress={handleBackPress} />
      <CustomTextInput placeholder={'City'} value={city} handleOnChangeText={setCity} />
      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>
    </View>
  )
}

export default AuthCityScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(170),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
