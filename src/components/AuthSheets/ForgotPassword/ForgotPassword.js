import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from '../../BottomSheet';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {useForgotPassword} from './hooks';
import {COLORS, FONTS} from '../../../constants';
import {EmailSent} from '../EmailSent';

const ForgotPassword = React.forwardRef(({}, ref) => {
  const {email, setEmail, isSendPress, handleForgotPassword, emailSentRef} =
    useForgotPassword();

  return (
    <>
      <BottomSheet ref={ref}>
        <View style={styles.mainContainer}>
          <CustomTitle title={'Forgot password'} />
          <View style={styles.descriptionContainer}>
            <Text allowFontScaling={false} style={styles.descriptionText}>
              Please enter the email address or phone number you signed up with.
            </Text>
          </View>
          <View style={styles.emailContainer}>
            <CustomTextInput
              placeholder={'Ex: Chakir@gmail.com'}
              value={email}
              handleOnChangeText={setEmail}
              keyboardType="email-address"
              isRemoveTextIconVisible={true}
            />
          </View>
          <View style={styles.btnContainer}>
            <CustomButton
              title={'Continue'}
              handlePress={() => handleForgotPassword(ref)}
            />
          </View>
        </View>
        <EmailSent ref={emailSentRef} />
      </BottomSheet>
    </>
  );
});

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    fontWeight: '400',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginLeft: scale(15),
    marginTop: verticalScale(12),
    width: '90%',
  },
  emailContainer: {
    marginTop: verticalScale(32),
  },
  btnContainer: {
    marginTop: '30%',
  },
});
