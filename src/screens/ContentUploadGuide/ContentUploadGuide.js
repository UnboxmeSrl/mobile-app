import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useContentUploadGuide} from './hooks';
import FastImage from 'react-native-fast-image';

const ContentUploadGuide = () => {
  const {
    icon,
    // actionName,
    actionDescription,
    bookingDetails,
    // permissionError,
    // handleOpenCouponPress,
    openCoupon,
    handleBackPress,
  } = useContentUploadGuide();
  // console.log('permissionError', permissionError);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainScrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}>
            <Image
              resizeMode="cover"
              source={IMAGES.back}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text allowFontScaling={false} style={styles.headerTitleText}>
              What to do
            </Text>
          </View>
        </View>

        <View style={styles.actionIconContainer}>
          <FastImage
            resizeMode="contain"
            source={{
              priority: FastImage.priority.high,
              uri: icon,
            }}
            style={styles.actionIcon}
          />
        </View>
        <View style={styles.guideTextMainContainer}>
          {/* {bookingDetails?._actions_turbo?.stories > 0 && (
            <View style={styles.guideTextContainer}>
              <Text allowFontScaling={false} style={styles.guideText}>
                {`\u2022   ${bookingDetails?._actions_turbo?.stories} x Stories`}
              </Text>
            </View>
          )} */}
          {/* <View style={styles.guideTextContainer}>
            <Text allowFontScaling={false} style={styles.guideText}>
              {`\u2022   ${1} x ${actionName}`}
            </Text>
          </View> */}
          {bookingDetails?._actions_turbo?.photos > 0 && (
            <View style={styles.guideTextContainer}>
              <Text allowFontScaling={false} style={styles.guideText}>
                {`\u2022   ${bookingDetails?._actions_turbo?.photos} x Photos`}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          <Text allowFontScaling={false} style={styles.descriptionText}>
            {actionDescription}
          </Text>
          {/* <Text allowFontScaling={false} style={styles.descriptionText}>
            You can publish the stories when you are at the venue and upload the
            {` ${actionName}`} respecting the deadline through the content
            schedule
          </Text> */}
        </View>

        <View style={styles.openCouponBtnMainContainer}>
          <TouchableOpacity
            onPress={openCoupon}
            style={[
              styles.openCouponBtnContainer,
              !bookingDetails?.Approved && styles.disabledBtnContainer,
            ]}
            disabled={!bookingDetails?.Approved}>
            <Text allowFontScaling={false} style={styles.openCouponBtnText}>
              Open Coupon
            </Text>
          </TouchableOpacity>
          {/* {permissionError && (
            <Text style={styles.permissionErrorText}>
              {permissionError.includes('Enable permission') && (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Location permission is denied: {'\n'}
                </Text>
              )}
              {permissionError}
            </Text>
          )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentUploadGuide;

const styles = StyleSheet.create({
  actionIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  actionIcon: {
    height: verticalScale(90),
    width: scale(100),
  },
  descriptionContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: verticalScale(15),
  },
  descriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },
  guideTextMainContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: verticalScale(40),
  },
  guideTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  guideText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    width: '90%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  mainScrollView: {
    backgroundColor: COLORS.white,
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  backIconContainer: {
    alignItems: 'flex-end',
    width: '15%',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  openCouponBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  openCouponBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    padding: moderateScale(24),
    marginTop: verticalScale(100),
    width: '100%',
  },
  openCouponBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  disabledBtnContainer: {
    backgroundColor: COLORS.cultured,
    opacity: 0.7,
  },
  permissionErrorText: {
    marginTop: verticalScale(15),
    paddingHorizontal: scale(12),
    color: 'red',
    // color: COLORS.whiteShadedTransparent,
  },
});
