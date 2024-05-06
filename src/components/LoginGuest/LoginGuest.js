import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SCREEN_NAMES} from '../../constants';
import {navigate} from '../../services';
import {CustomButton} from '../Custom';

const LoginGuest = () => {
  const navigateToLogin = () => navigate(SCREEN_NAMES.SignUpNew);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text
        allowFontScaling={false}
        style={styles.titleText}>{`Want to use all the functionality?`}</Text>
      <Text
        allowFontScaling={false}
        style={
          styles.descriptionText
        }>{`Register or login into your account to able to book through Claris.`}</Text>
      <CustomButton title={'Login'} handlePress={navigateToLogin} />
      <View style={{marginTop: verticalScale(-40)}}>
        <CustomButton title={'Register'} handlePress={navigateToLogin} />
      </View>
    </SafeAreaView>
  );
};

export default LoginGuest;

const styles = StyleSheet.create({
  descriptionText: {
    marginTop: verticalScale(10),
    textAlign: 'center',
    color: COLORS.darkSilver,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  titleText: {
    marginTop: verticalScale(20),
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(18),
    justifyContent: 'center',
  },
});
