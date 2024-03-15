import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { CustomButton, CustomHeader } from '../../../components'
import { useAuthGender } from './hooks'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const AuthGenderScreen = () => {
  const {
    isLoading,
    genderList,
    selectedGender,
    isBtnDisabled,
    setSelectedGender,
    handleBackPress,
    handleNextPress,
  } = useAuthGender()

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Gender'} step={2} handleBackPress={handleBackPress} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={moderateScale(20)} color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View style={styles.genderFlatlistContainer}>
            <FlatList
              data={genderList}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isSelected = selectedGender?.id === item?.id
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedGender(item)}
                    style={[styles.genderContainer, isSelected && styles.genderContainerWithSelection]}
                  >
                    <Text
                      style={[styles.genderText, isSelected && styles.genderTextWithSelection]}
                    >{`${item?.Sex}`}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <View style={styles.btnContainer}>
            <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
          </View>
        </>
      )}
    </View>
  )
}

export default AuthGenderScreen

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderFlatlistContainer: {
    marginTop: verticalScale(24),
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  genderTextWithSelection: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.primary,
  },
  genderText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(16),
  },
  genderContainerWithSelection: {
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(2),
    borderColor: COLORS.primary,
  },
  genderContainer: {
    height: verticalScale(56),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: COLORS.isabelLine,
    marginTop: verticalScale(16),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
