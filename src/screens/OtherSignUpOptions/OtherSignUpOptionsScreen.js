import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {CommonHeader, CreatePassword, SignUpWithEmail} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useOtherSignUpOptions} from './hooks';

const OtherSignUpOptionsScreen = () => {
  const {
    ref,
    createPasswordRef,
    closeSignUpSheet,
    navigateToEmailModal,
    onSuccess,
  } = useOtherSignUpOptions();

  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <View style={styles.content}>
        <CommonHeader title={'Sign Up'} />
        <View style={styles.titleDescriptionContainer}>
          <Text allowFontScaling={false} style={styles.descriptionText}>
            {`Create your account to be able to be selected into the `}
            <Text
              allowFontScaling={false}
              style={styles.innerText}>{`Claris community`}</Text>
            .
          </Text>
          <Text
            allowFontScaling={false}
            style={
              styles.descriptionSecond
            }>{`The community accepts both influencers and models of all genders.`}</Text>
        </View>

        <View style={styles.signUpBtnMainContainer}>
          <TouchableOpacity
            onPress={navigateToEmailModal}
            style={styles.signUpBtnContainer}>
            <Text
              allowFontScaling={false}
              style={styles.signUpBtnText}>{`Sign up with email`}</Text>
          </TouchableOpacity>

          <View style={styles.descriptionContainer}>
            <Text allowFontScaling={false} style={styles.descriptionText}>
              {`By signing up, you `}
              <Text
                allowFontScaling={false}
                style={styles.changedText}>{`agree`}</Text>
              {` to Claris’s`}
              <Text
                allowFontScaling={false}
                style={styles.changedText}>{` Terms of Use `}</Text>
              {`and `}
              <Text
                allowFontScaling={false}
                style={styles.changedText}>{` Privacy Policy. `}</Text>
            </Text>
          </View>
        </View>
      </View>
      <SignUpWithEmail ref={ref} closeSignUpSheet={closeSignUpSheet} />
      <CreatePassword ref={createPasswordRef} />
    </SafeAreaView>
  );
};

export default OtherSignUpOptionsScreen;

const styles = StyleSheet.create({
  titleDescriptionContainer: {
    justifyContent: 'center',
    marginHorizontal: scale(16),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
    alignSelf: 'center',
  },
  signUpBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
    // marginTop: '50%',
  },
  signUpBtnMainContainer: {
    padding: moderateScale(24),
    width: '100%',
  },
  signUpBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  changedText: {
    fontFamily: FONTS.quicksandBold,
  },
  innerText: {
    fontFamily: FONTS.quicksandBold,
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.greyFont,
    fontSize: moderateScale(14),
    textAlign: 'center',
    lineHeight: verticalScale(15),
  },
  descriptionSecond: {
    paddingHorizontal: scale(10),
    fontFamily: FONTS.quicksand,
    color: COLORS.greyFont,
    fontSize: moderateScale(14),
    textAlign: 'center',
    lineHeight: verticalScale(15),
  },
});
