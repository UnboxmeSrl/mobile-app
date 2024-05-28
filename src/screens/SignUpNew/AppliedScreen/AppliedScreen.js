import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useApplied} from './hooks';
import {COLORS, FONTS} from '../../../constants';
import {IMAGES} from '../../../assets';
import {commonStyle} from '../../../utils';

const AppliedScreen = () => {
  const {handleGuestPress, handleFollowPress, handleTutorialPress} =
    useApplied();
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={IMAGES.appliedScreenBackground}
        style={styles.backgroundStyle}>
        <View style={styles.viewForMargin}>
          <View style={styles.appLogoContainer}>
            <Image
              resizeMode={'contain'}
              source={IMAGES.appLogo}
              style={styles.appLogoImage}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text
              allowFontScaling={false}
              style={styles.titleText}>{`You have applied! `}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text
            allowFontScaling={false}
            style={
              styles.descriptionText
            }>{`Within 24H you will receive a response on your email `}</Text>
        </View>

        <TouchableOpacity
          onPress={handleFollowPress}
          style={styles.followBtnContainer}
          activeOpacity={0.7}>
          <Image
            source={IMAGES.followInstagram}
            style={styles.followInstagramIcon}
          />
          <Text allowFontScaling={false} style={styles.followBtnText}>
            Follow us on Instagram
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTutorialPress}
          style={styles.tutorialBtnContainer}
          activeOpacity={0.7}>
          <Image source={IMAGES.playBlack} style={styles.playIcon} />
          <Text allowFontScaling={false} style={styles.playBtnText}>
            Watch tutorials
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.queryContainer}>
          <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
          <Text allowFontScaling={false} style={styles.queryText}>
            Questions? Send us a message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleGuestPress}
          style={styles.guestBtnContainer}>
          <Image source={IMAGES.addUser} style={styles.addUserIcon} />
          <Text allowFontScaling={false} style={styles.guestBtnText}>
            Continue as Guest
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default AppliedScreen;

const styles = StyleSheet.create({
  playIcon: {
    height: moderateScale(15),
    marginRight: scale(15),
    tintColor: COLORS.black,
    width: moderateScale(14.25),
  },
  playBtnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  tutorialBtnContainer: {
    flexDirection: 'row',
    width: '90%',
    height: verticalScale(40),
    marginTop: verticalScale(10),
    borderColor: COLORS.white,
    backgroundColor: COLORS.newRedPrimary,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  followInstagramIcon: {
    height: moderateScale(24),
    marginRight: scale(15),
    tintColor: COLORS.white,
    width: moderateScale(24),
  },
  followBtnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(14),
  },
  followBtnContainer: {
    flexDirection: 'row',
    width: '90%',
    height: verticalScale(40),
    marginTop: verticalScale(90),
    borderColor: COLORS.black,
    backgroundColor: COLORS.veryLight02,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  appLogoImage: {
    height: verticalScale(118),
    width: scale(99),
  },
  appLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
    width: '95%',
  },
  addUserIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.white,
    width: moderateScale(20),
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(10),
    width: '80%',
  },
  descriptionText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  guestBtnContainer: {
    height: verticalScale(40),
    borderColor: COLORS.white,
    width: '90%',
    borderWidth: moderateScale(1),
    marginTop: verticalScale(24),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  guestBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  queryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(90),
    width: '90%',
  },
  queryIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.white,
    width: moderateScale(20),
  },
  queryText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
  },
  titleContainer: {
    alignSelf: 'center',
    width: '95%',
    marginTop: verticalScale(10),
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(25),
    textAlign: 'center',
  },
  viewForMargin: {
    ...commonStyle.containerPaddingTop,
  },
});
