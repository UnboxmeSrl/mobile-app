import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader } from '../../../components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { COLORS, FONTS } from '../../../constants'
import { useAuthUserType } from './hooks'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const AuthUserTypeScreen = () => {
  const { isBtnDisabled, userTypeList, selectedUserType, setSelectedUserType, handleBackPress, handleNextPress } =
    useAuthUserType()
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'What are you?'} step={7} handleBackPress={handleBackPress} />
      <View style={styles.userTypeFlatlistContainer}>
        <FlatList
          data={userTypeList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isSelected = selectedUserType?.id === item?.id
            return (
              <TouchableOpacity
                onPress={() => setSelectedUserType(item)}
                style={[styles.userTypeContainer, isSelected && styles.userTypeContainerWithSelection]}
              >
                <Text
                  style={[styles.userTypeText, isSelected && styles.userTypeTextWithSelection]}
                >{`${item?.name}`}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>
    </View>
  )
}

export default AuthUserTypeScreen

const styles = StyleSheet.create({
  userTypeFlatlistContainer: {
    marginTop: verticalScale(24),
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  userTypeTextWithSelection: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.newPrimary,
  },
  userTypeText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(16),
  },
  userTypeContainerWithSelection: {
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(2),
    borderColor: COLORS.newPrimary,
  },
  userTypeContainer: {
    height: verticalScale(56),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: COLORS.lightNewPrimaryA6,
    marginTop: verticalScale(16),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
})
