import React, {useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {useNewCoupon} from './hooks';
import {getFormattedTime} from '../../utils';

const NewCouponScreen = () => {
  const {
    isEvent,
    profilePicUrl,
    amenityDetails,
    actionNumId,
    actionName,
    icon,
    timeFrame,
    isReel,
    bookingDate,
    month,
    bookingDetails,
    loginData,
    handleBackPress,
    handleGoToContentPress,
    handleContentBriefPress,
    handleRestaurantRedirect,
  } = useNewCoupon();
  // const getIcons = useCallback(serviceName => {
  //   if (serviceName === 'Plates') return IMAGES.mealDish;
  //   else if (serviceName === 'Drinks') return IMAGES.clinkingGlasses;
  //   else if (serviceName === 'Side') return IMAGES.side;
  //   else if (serviceName === 'Dessert') return IMAGES.dessert;
  // }, []);
  // console.log(
  //   bookingDetails?.MinuteStart,
  //   bookingDetails?.HourStart,
  //   'HourStart',
  // );
  const getIcons = useCallback(serviceName => {
    const serviceNameKey = serviceName?.replace(' ', '');
    // console.log('serviceName.trim()', serviceNameKey || '');
    return IMAGES[serviceNameKey];
  }, []);
  // console.log(
  //   bookingDetails?._offers_turbo?.isBigInfluencer,
  //   // bookingDetails?._offers_turbo?.isBigInfluencer,
  //   'bookingDetails?._offers_turbo?.isBigInfluencer',
  // );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}>
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
              Coupon
            </Text>
          </View>
        </View>

        <View style={styles.mainInnerView}>
          <View style={styles.userDetailsContainer}>
            {loginData?.Profile_pic ? (
              <FastImage
                resizeMode="cover"
                source={{
                  priority: FastImage.priority.high,
                  uri: profilePicUrl,
                }}
                style={styles.userImage}
              />
            ) : (
              <Image source={IMAGES.testImage} style={styles.userImage} />
            )}
            <View style={styles.userFullNameContainer}>
              <Text allowFontScaling={false} style={styles.fullNameText}>
                {loginData?.name}
              </Text>
            </View>
            <View>
              <Text
                allowFontScaling={false}
                style={styles.userNameText}>{`@${loginData?.name}`}</Text>
            </View>
          </View>
          {/* <View style={styles.leftCutter} /> */}
          {/* <View style={styles.rightCutter} /> */}
          <View style={styles.divider} />

          {actionNumId === 7 ||
          actionNumId === 8 ||
          actionNumId === 9 ||
          actionNumId === 53 ||
          actionNumId === 54 ? (
            <View style={styles.specialAmenity}>
              <>
                <View
                  style={[
                    styles.amenityIconContainer,
                    styles.firstAmenityMainContainer,
                    styles.specialAmenitiesIconContainer,
                  ]}>
                  <Image
                    source={amenityDetails?.amenityIcon}
                    style={styles.amenityBigIcon}
                  />
                </View>
                <View
                  style={[
                    styles.amenityMainContainer,
                    styles.specialAmenitiesMainContainer,
                  ]}>
                  <View style={styles.amenityTitleDescriptionContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.amenitiesTitle}>
                      {amenityDetails?.amenityName}
                    </Text>
                    {/* <Text
                      allowFontScaling={false}
                      style={styles.amenitiesDescription}>
                      {amenityDetails?.amenityDescription}
                    </Text> */}
                  </View>
                </View>
              </>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {bookingDetails?._offers_turbo?.isBigInfluencer &&
              bookingDetails?._offers_turbo?.services?.length > 0 ? (
                bookingDetails?._offers_turbo?.services?.map(
                  subServices =>
                    subServices?.quantity > 0 && (
                      <View
                        style={[
                          styles.amenityMainContainer,
                          styles.firstAmenityMainContainer,
                        ]}>
                        <View style={styles.amenityIconContainer}>
                          {getIcons(subServices?.name) && (
                            <Image
                              source={getIcons(subServices?.name)}
                              style={styles.amenityIcon}
                            />
                          )}
                        </View>
                        <View style={styles.amenityTitleDescriptionContainer}>
                          <Text
                            allowFontScaling={false}
                            style={styles.amenitiesTitle}>
                            {subServices?.quantity} x{' '}
                            {subServices?.name === 'Plates'
                              ? 'meals'
                              : subServices?.name}
                          </Text>
                        </View>
                      </View>
                    ),
                )
              ) : (
                <>
                  {bookingDetails?._actions_turbo?.Plates > 0 && (
                    <View style={styles.amenityMainContainer}>
                      <View style={styles.amenityIconContainer}>
                        <Image
                          source={IMAGES.mealDish}
                          style={styles.amenityIcon}
                        />
                      </View>
                      <View style={styles.amenityTitleDescriptionContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.amenitiesTitle}>
                          {bookingDetails?._actions_turbo?.Plates} x Meals
                        </Text>
                      </View>
                    </View>
                  )}
                  {bookingDetails?._actions_turbo?.Drinks > 0 && (
                    <View style={styles.amenityMainContainer}>
                      <View style={styles.amenityIconContainer}>
                        <Image
                          source={IMAGES.clinkingGlasses}
                          style={styles.amenityIcon}
                        />
                      </View>
                      <View style={styles.amenityTitleDescriptionContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.amenitiesTitle}>
                          {bookingDetails?._actions_turbo?.Drinks} x Drinks
                        </Text>
                      </View>
                    </View>
                  )}
                  <View
                    style={[
                      styles.amenityMainContainer,
                      styles.friendAmenityContainer,
                    ]}>
                    <View style={styles.amenityTitleDescriptionContainer}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.amenitiesTitle,
                          styles.friendAmenityText,
                        ]}>{`+${bookingDetails?._actions_turbo?.Extra_People}`}</Text>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.amenitiesDescription,
                          styles.friendAmenityTitle,
                        ]}>
                        Friend
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          )}
          {actionNumId === 9 && (
            <View style={styles.comingWithInfluencerTextContainer}>
              <Text
                allowFontScaling={false}
                style={
                  styles.comingWithInfluencerText
                }>{`Coming with ${bookingDetails?.additional_influencer} influencer friends.`}</Text>
            </View>
          )}

          <View style={styles.dateTimeContainer}>
            <View style={styles.timeContainer}>
              <Text allowFontScaling={false} style={styles.timeTitleText}>
                Date
              </Text>
              <Text
                allowFontScaling={false}
                style={
                  styles.timeText
                }>{`${bookingDate?.getDate()} ${month} ${bookingDate?.getFullYear()}`}</Text>
            </View>
            {actionNumId !== 9 &&
              (!!timeFrame ||
                (bookingDetails?.HourStart && bookingDetails?.HourEnd)) && (
                <View style={styles.timeContainer}>
                  <Text allowFontScaling={false} style={styles.timeTitleText}>
                    Time
                  </Text>
                  <Text allowFontScaling={false} style={styles.timeText}>
                    {isEvent
                      ? `${getFormattedTime(bookingDetails?.booking_time)}`
                      : `${
                          timeFrame
                            ? timeFrame?.Start
                            : bookingDetails?.HourStart
                        }:${
                          timeFrame
                            ? timeFrame?.Minute_Start
                            : bookingDetails?.MinuteStart
                        } - ${
                          timeFrame ? timeFrame?.End : bookingDetails?.HourEnd
                        }:${
                          timeFrame
                            ? timeFrame?.Minute_End
                            : bookingDetails?.MinuteEnd
                        }`}
                  </Text>
                </View>
              )}
          </View>

          <View style={styles.tiktokContainer}>
            <Text allowFontScaling={false} style={styles.tiktokTitleText}>
              Content Type
            </Text>
            <View style={styles.tiktokIconTextContainer}>
              <FastImage
                resizeMode="contain"
                source={{priority: FastImage.priority.high, uri: icon}}
                style={styles.contentTypeImage}
              />
              {/* <Image resizeMode="cover" source={icon} style={styles.contentTypeImage} /> */}
              <Text allowFontScaling={false} style={styles.tiktokDescription}>
                {actionName}
              </Text>
            </View>
          </View>

          <View style={styles.placeContainer}>
            <Text allowFontScaling={false} style={styles.tiktokTitleText}>
              Place
            </Text>
            <TouchableOpacity
              style={styles.restaurantRedirectContainer}
              onPress={() =>
                handleRestaurantRedirect(bookingDetails?._restaurant_turbo)
              }>
              <Text
                allowFontScaling={false}
                style={styles.socialMediaTitleText}>
                {`${bookingDetails?._restaurant_turbo?.Name}`}
              </Text>
              <Image
                resizeMode="contain"
                source={IMAGES.back}
                style={styles.rightIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contentBriefContainer}
              onPress={handleContentBriefPress}>
              <Text
                allowFontScaling={false}
                style={styles.socialMediaTitleText}>
                Content brief
              </Text>
              <Image
                resizeMode="contain"
                source={IMAGES.back}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewDescriptionContainer}>
          <Text allowFontScaling={false} style={styles.viewDescriptionText}>
            * Show the present coupon to the restaurant staff to claim your deal
          </Text>
        </View>
        <View style={styles.goToContentBtnMainContainer}>
          <TouchableOpacity
            onPress={handleGoToContentPress}
            style={styles.goToContentBtnContainer}>
            <Text allowFontScaling={false} style={styles.goToContentBtnText}>
              Go to Content
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewCouponScreen;

const styles = StyleSheet.create({
  specialAmenity: {
    flexDirection: 'row',
  },
  specialAmenitiesMainContainer: {
    marginLeft: scale(5),
  },
  specialAmenitiesIconContainer: {
    marginTop: verticalScale(10),
  },
  firstAmenityMainContainer: {
    marginLeft: scale(10),
  },
  friendAmenityTitle: {
    textAlign: 'center',
  },
  friendAmenityText: {
    textAlign: 'center',
  },
  friendAmenityContainer: {
    justifyContent: 'center',
    marginRight: scale(30),
  },
  amenityMainContainer: {
    height: verticalScale(45),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
  },
  amenityIconContainer: {
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  amenityBigIcon: {
    height: moderateScale(48),
    width: moderateScale(48),
  },
  amenityTitleDescriptionContainer: {
    justifyContent: 'center',
  },
  amenitiesTitle: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  amenitiesDescription: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(11),
  },
  comingWithInfluencerTextContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(15),
  },
  comingWithInfluencerText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
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
  contentBriefContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentTypeImage: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  divider: {
    alignSelf: 'center',
    borderColor: COLORS.platinum,
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginTop: verticalScale(16),
    width: '80%',
  },
  extraPersonIcon: {
    height: moderateScale(13.23),
    marginLeft: scale(15),
    width: moderateScale(20.25),
  },
  fullNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  goToContentBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  goToContentBtnMainContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    marginBottom: verticalScale(30),
    width: '100%',
  },
  goToContentBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
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
  restaurantRedirectContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftCutter: {
    backgroundColor: COLORS.lightNewPrimary40,
    borderRadius: moderateScale(25),
    height: moderateScale(25),
    left: scale(-12),
    position: 'absolute',
    top: verticalScale(150),
    width: moderateScale(25),
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: COLORS.lightNewPrimaryA6,
    backgroundColor: COLORS.white,
  },
  mainInnerView: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(5),
    marginHorizontal: '5%',
    paddingBottom: verticalScale(20),
    shadowColor: '#171717',
    shadowOffset: {
      height: 4,
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(3),
      width: -2,
    },
    width: '90%',
  },
  placeContainer: {
    marginLeft: scale(25),
    marginTop: verticalScale(16),
  },
  rightCutter: {
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(25),
    height: moderateScale(25),
    position: 'absolute',
    right: scale(-10),
    top: verticalScale(150),
    width: moderateScale(25),
  },
  rightIcon: {
    height: moderateScale(25),
    marginRight: scale(20),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{rotate: '180deg'}],
    width: moderateScale(25),
  },
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  tiktokContainer: {
    marginLeft: scale(25),
    marginTop: verticalScale(16),
    width: '50%',
  },
  tiktokDescription: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
    marginTop: verticalScale(5),
  },
  tiktokIcon: {
    height: moderateScale(49),
    width: moderateScale(49),
  },
  tiktokIconTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  tiktokTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  timeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
  },
  timeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
  },
  timeTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  userDetailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  userFullNameContainer: {
    marginTop: verticalScale(16),
  },
  userImage: {
    borderRadius: moderateScale(20.18),
    height: moderateScale(113),
    width: moderateScale(113),
  },
  userNameText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
  },
  viewDescriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8%',
    marginTop: verticalScale(10),
  },
  viewDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
});
