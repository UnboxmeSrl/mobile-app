import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { BottomSheet } from '../../BottomSheet'
import { CustomButton, CustomTextInput, CustomTitle } from '../../Custom'
import useSignInWithEmail from './hooks/useSignInWithEmail'

const SignInWithEmail = React.forwardRef(({ isFromBookRedirected = false }, ref) => {
  const { email, setEmail, isError, loading, password, setPassword, handleLoginPress } = useSignInWithEmail(
    isFromBookRedirected
  )

  return (
    <BottomSheet ref={ref}>
      <View style={styles.mainContainer}>
        <CustomTitle title={'Enter your email'} />
        <CustomTextInput
          placeholder={'Ex: Chakir@gmail.com'}
          value={email}
          handleOnChangeText={setEmail}
          keyboardType="email-address"
          isRemoveTextIconVisible={true}
        />
        <CustomTextInput
          placeholder={'Password'}
          value={password}
          handleOnChangeText={setPassword}
          isSecureTextInput={true}
        />
        {isError && (
          <View style={{ marginTop: verticalScale(10), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLORS.error, fontSize: moderateScale(14), fontFamily: FONTS.quicksand }}>
              Something went wrong.
            </Text>
          </View>
        )}
        <View style={styles.btnContainer}>
          <CustomButton
            title={'Login'}
            handlePress={() => handleLoginPress(ref)}
            isLoading={loading}
            disabled={loading}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
})

export default SignInWithEmail

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  forgotPasswordText: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.achromaticBlack,
    fontSize: moderateScale(14),
  },
})
