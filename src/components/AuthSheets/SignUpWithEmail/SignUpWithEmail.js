import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';
import {BottomSheet} from '../../BottomSheet';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {useCreatePassword} from '../CreatePassword/hooks';
// import {useSignUpWithEmail} from './hooks';

const SignUpWithEmail = React.forwardRef(({closeSignUpSheet}, ref) => {
  // const {
  //   email,
  //   setEmail,
  //   error,
  //   // verificationCode,
  //   // setVerificationCode,
  //   isBtnDisabled,
  //   // isSendPress,
  //   setIsSendPress,
  //   // handleSignUpPress,
  //   handleSignUpPressAfterCodeSend,
  //   handleReset,
  // } = useSignUpWithEmail(closeSignUpSheet);

  const {
    isBtnDisabled: isBtnDisabledPass,
    error: passError,
    password,
    setPassword,
    email,
    setEmail,
    confirmPassword,
    setConfirmPassword,
    handleCreatePasswordPress,
  } = useCreatePassword();

  const onClickSignup = async () => {
    const valid = await handleCreatePasswordPress();
    if (valid) {
      closeSignUpSheet?.();
    }
  };
  return (
    <BottomSheet
      onClose={() => {
        // setIsSendPress(false);
      }}
      ref={ref}>
      <View style={styles.mainContainer}>
        <CustomTitle title={'Sign Up with Email'} />
        <CustomTextInput
          handleOnChangeText={setEmail}
          isRemoveTextIconVisible={true}
          keyboardType="email-address"
          handleReset={() => setEmail('')}
          placeholder={'Ex: Chakir@gmail.com'}
          value={email}
        />

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
        {passError?.message && (
          <View style={styles.errorContainer}>
            <Text allowFontScaling={false} style={styles.errorText}>
              {passError?.message}
            </Text>
          </View>
        )}
        <CustomButton
          disabled={isBtnDisabledPass}
          handlePress={onClickSignup}
          title={'Sign Up'}
        />
      </View>
    </BottomSheet>
  );
});

export default SignUpWithEmail;

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
  resendOtp: {
    paddingTop: 8,
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  },
});
