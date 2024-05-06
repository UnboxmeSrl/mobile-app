import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from '../../BottomSheet';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {COLORS, FONTS} from '../../../constants';
import {useSignInWithEmail} from './hooks';

const SignInWithEmail = React.forwardRef(
  ({isFromBookRedirected = false}, ref) => {
    const {
      email,
      setEmail,
      isError,
      loading,
      password,
      setPassword,
      handleLoginPress,
    } = useSignInWithEmail(isFromBookRedirected);

    return (
      <BottomSheet ref={ref}>
        <View style={styles.mainContainer}>
          <CustomTitle title={'Enter your email'} />
          <CustomTextInput
            handleOnChangeText={setEmail}
            isRemoveTextIconVisible={true}
            keyboardType="email-address"
            placeholder={'Ex: Chakir@gmail.com'}
            value={email}
          />
          <CustomTextInput
            handleOnChangeText={setPassword}
            isSecureTextInput={true}
            placeholder={'Password'}
            value={password}
          />
          {isError && (
            <View style={styles.errorContainer}>
              <Text allowFontScaling={false} style={styles.errorText}>
                Something went wrong.
              </Text>
            </View>
          )}
          <View style={styles.btnContainer}>
            <CustomButton
              disabled={loading}
              handlePress={() => handleLoginPress(ref)}
              isLoading={loading}
              title={'Login'}
            />
          </View>
          <TouchableOpacity>
            <Text allowFontScaling={false} style={styles.forgotPasswordText}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  },
);

export default SignInWithEmail;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  forgotPasswordText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: verticalScale(24),
  },
});
