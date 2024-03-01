import React from 'react'
import { StyleSheet, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { BottomSheet } from '../../BottomSheet'
import { CustomButton, CustomTextInput, CustomTitle } from '../../Custom'
import { useCreatePassword } from './hooks'

const CreatePassword = React.forwardRef(({}, ref) => {
  const {
    isBtnDisabled,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleCreatePasswordPress,
  } = useCreatePassword()

  return (
    <BottomSheet ref={ref}>
      <View style={styles.mainContainer}>
        <CustomTitle title={'Create a password'} />
        <CustomTextInput
          placeholder={'Create a password'}
          value={password}
          handleOnChangeText={setPassword}
          isSecureTextInput={true}
        />
        <CustomTextInput
          placeholder={'Confirm password'}
          value={confirmPassword}
          handleOnChangeText={setConfirmPassword}
          isSecureTextInput={true}
        />
        <View style={styles.btnContainer}>
          <CustomButton
            title={'Continue'}
            handlePress={() => handleCreatePasswordPress(ref)}
            disabled={isBtnDisabled}
          />
        </View>
      </View>
    </BottomSheet>
  )
})

export default CreatePassword

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: '30%',
  },
  codeDescriptionText: {
    fontFamily: FONTS.quicksand,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  codeDescriptionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: verticalScale(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
})
