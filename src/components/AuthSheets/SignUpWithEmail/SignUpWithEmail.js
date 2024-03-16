import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { BottomSheet } from '../../BottomSheet'
import { CustomButton, CustomTextInput, CustomTitle } from '../../Custom'

import { useSignUpWithEmail } from './hooks'

const SignUpWithEmail = React.forwardRef(({ closeSignUpSheet }, ref) => {
  const {
    email,
    setEmail,
    error,
    verificationCode,
    setVerificationCode,
    isBtnDisabled,
    isSendPress,
    setIsSendPress,
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
  } = useSignUpWithEmail(closeSignUpSheet)

  return (
    <BottomSheet
      onClose={() => {
        setIsSendPress(false)
      }}
      ref={ref}
    >
      <View style={styles.mainContainer}>
        <CustomTitle title={'Enter your email'} />
        <CustomTextInput
          handleOnChangeText={setEmail}
          isRemoveTextIconVisible={true}
          keyboardType="email-address"
          placeholder={'Ex: Chakir@gmail.com'}
          value={email}
        />

        {error?.message && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error?.message}</Text>
          </View>
        )}

        {isSendPress && (
          <>
            <View style={styles.codeDescriptionContainer}>
              <Text style={styles.codeDescriptionText}>
                We just sent you a temporary login code. Please check your inbox.
              </Text>
            </View>
            <CustomTextInput
              handleOnChangeText={setVerificationCode}
              isRemoveTextIconVisible={true}
              placeholder={'Code'}
              value={verificationCode}
            />
          </>
        )}

        <CustomButton
          disabled={isBtnDisabled}
          handlePress={isSendPress ? handleSignUpPressAfterCodeSend : handleSignUpPress}
          title={isSendPress ? 'Verify Otp' : 'Send a message'}
        />
      </View>
    </BottomSheet>
  )
})

export default SignUpWithEmail

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  errorContainer: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
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
