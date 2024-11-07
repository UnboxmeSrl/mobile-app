import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from '../../BottomSheet';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {useEmailSent, useForgotPassword} from './hooks';
import {COLORS, FONTS} from '../../../constants';
import emailSent from '../../../assets/icons/emailSent.png';

const EmailSent = React.forwardRef(({}, ref) => {
  const {email, setEmail, isSendPress, emailSentRef, handleGoBack} =
    useEmailSent();

  return (
    <>
      <BottomSheet ref={ref}>
        <View style={styles.mainContainer}>
          <CustomTitle title={'Email sent to you'} />
          <View style={styles.descriptionContainer}>
            <Text allowFontScaling={false} style={styles.descriptionText}>
              We’ll send you an email with a link to reset your password
            </Text>
          </View>
          <View style={styles.emailContainer}>
            <Image source={emailSent} />
          </View>
          <CustomButton
            btnStyle={{flexDirection: 'row',}}
            iconProps={{name: 'arrowleft', size: 25}}
            iconStyle={{position: 'absolute', left: verticalScale(90)}}
            // image={emailSent}
            title={'Go Back'}
            handlePress={() => handleGoBack(ref)}
          />
        </View>
      </BottomSheet>
    </>
  );
});

export default EmailSent;

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
    // marginTop: verticalScale(32),
    // width: verticalScale(40),
    // height: verticalScale(40),
    alignSelf: 'center',
    // backgroundColor: 'blue',
  },
  btnContainer: {
    // marginTop: '30%',
    // backgroundColor: 'green',
  },
});
