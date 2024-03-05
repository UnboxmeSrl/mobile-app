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
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
  } = useSignUpWithEmail(closeSignUpSheet)

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
              placeholder={'Code'}
              value={verificationCode}
              handleOnChangeText={setVerificationCode}
              isRemoveTextIconVisible={true}
            />
          </>
        )}

        <CustomButton
          title={'Send a message'}
          handlePress={isSendPress ? handleSignUpPressAfterCodeSend : handleSignUpPress}
          disabled={isBtnDisabled}
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
