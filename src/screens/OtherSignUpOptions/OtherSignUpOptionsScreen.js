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
      <CommonHeader title={'Sign Up'} />
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.descriptionText}>
          {`Create your account to be able to be selected into the `}
          <Text style={styles.innerText}>{`Claris community`}</Text>.
        </Text>
        <Text
          style={
            styles.descriptionSecond
          }>{`The community accepts both influencers and models of all genders.`}</Text>
      </View>
      <View style={styles.signUpBtnMainContainer}>
        <TouchableOpacity
          onPress={navigateToEmailModal}
          style={styles.signUpBtnContainer}>
          <Text style={styles.signUpBtnText}>{`Sign up with email`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {`By signing up, you `}
          <Text style={styles.changedText}>{`agree`}</Text>
          {` to Claris’s`}
          <Text style={styles.changedText}>{` Terms of Use `}</Text>
          {`and `}
          <Text style={styles.changedText}>{` Privacy Policy. `}</Text>
        </Text>
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
    marginTop: verticalScale(30),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  descriptionContainer: {
    marginTop: verticalScale(20),
    width: '85%',
    alignSelf: 'center',
  },
  signUpBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
    marginTop: '130%',
  },
  signUpBtnMainContainer: {
    marginTop: verticalScale(14),
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
    paddingHorizontal: scale(10),
    fontFamily: FONTS.quicksand,
    color: COLORS.greyFont,
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginTop: verticalScale(-20),
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
