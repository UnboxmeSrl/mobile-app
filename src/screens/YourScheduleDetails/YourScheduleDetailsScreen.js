import React from 'react';
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
import {CustomModal} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useYourScheduleDetails} from './hooks';
import SwipeButton from 'rn-swipe-button';
import {getFormattedTime, xanoImageSize} from '../../utils';

const YourScheduleDetailsScreen = () => {
  const {
    actionNumId,
    actionName,
    amenityDetails,
    icon,
    currentDate,
    currentMonth,
    currentWeekDay,
    timeFrame,
    bookingDetails,
    approvalStage,
    isAlertVisible,
    isDeleting,
    isEvent,
    handleAlertVisible,
    handleBackPress,
    handleSwipeSuccess,
    handleOpenCouponPress,
    handleContentBriefPress,
    handlePositiveBtnPress,
  } = useYourScheduleDetails();

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
              Booking
            </Text>
          </View>
        </View>

        <View style={styles.onApprovalItemsMainContainer}>
          <View style={styles.restaurantDetailsMainRow}>
            <View style={styles.restaurantImageContainer}>
              <FastImage
                resizeMode="cover"
                source={{
                  priority: FastImage.priority.high,
                  uri: `${bookingDetails?._offers_turbo?.Offer_Cover?.url}?tpl=${xanoImageSize}.jpg`,
                }}
                style={styles.serviceImage}
              />
            </View>
            <View style={styles.restaurantNameContainer}>
              <Text allowFontScaling={false} style={styles.restaurantNameText}>
                {bookingDetails?._offers_turbo?.Offer_Name}
              </Text>
              <View style={styles.ratingContainer}>
                <Text allowFontScaling={false} style={styles.ratingUsersText}>
                  {bookingDetails?._offers_turbo?.Credits}
                </Text>
                <Image
                  source={IMAGES.ratingStar}
                  style={styles.ratingIconImage}
                />
              </View>
            </View>
            <View
              style={[
                styles.onApprovalTextContainer,
                approvalStage === 'pending'
                  ? {backgroundColor: COLORS.americanYellow, width: scale(90)}
                  : approvalStage === 'success'
                  ? {backgroundColor: COLORS.mayGreen}
                  : {backgroundColor: COLORS.tartOrange},
              ]}>
              <Text allowFontScaling={false} style={styles.onApprovalText}>{`${
                approvalStage === 'pending'
                  ? `On Approval`
                  : approvalStage === 'success'
                  ? `Verified`
                  : `Content Rejected`
              }`}</Text>
            </View>
          </View>

          {actionNumId === 7 || actionNumId === 8 || actionNumId === 9 ? (
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
                    <Text
                      allowFontScaling={false}
                      style={styles.amenitiesDescription}>
                      {amenityDetails?.amenityDescription}
                    </Text>
                  </View>
                </View>
              </>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.amenityMainContainer,
                  styles.firstAmenityMainContainer,
                ]}>
                <View style={styles.amenityIconContainer}>
                  <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
                </View>
                <View style={styles.amenityTitleDescriptionContainer}>
                  <Text
                    allowFontScaling={false}
                    style={
                      styles.amenitiesTitle
                    }>{`${bookingDetails?._actions_turbo?.Plates} X Meals`}</Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.amenitiesDescription}>
                    at your choice
                  </Text>
                </View>
              </View>

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
                    style={
                      styles.amenitiesTitle
                    }>{`${bookingDetails?._actions_turbo?.Drinks} X Drinks`}</Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.amenitiesDescription}>
                    at your choice
                  </Text>
                </View>
              </View>

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

          <View style={styles.nameLocationMainRow}>
            <View style={styles.locationImageContainer}>
              <FastImage
                resizeMode="cover"
                source={{
                  priority: FastImage.priority.high,
                  uri: `${bookingDetails?._restaurant_turbo?.Cover?.url}?tpl=${xanoImageSize}.jpg`,
                }}
                style={styles.locationImage}
              />
            </View>
            <View style={styles.locationNameContainer}>
              <Text allowFontScaling={false} style={styles.locationNameText}>
                {bookingDetails?._restaurant_turbo?.Name}
              </Text>
              <View style={styles.locationTextContainer}>
                <Text allowFontScaling={false} style={styles.locationText}>
                  {bookingDetails?._restaurant_turbo?.Adress}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.selectedDateMainContainer}>
            <View style={styles.selectedDateContainer}>
              <Text
                allowFontScaling={false}
                style={styles.selectedDateNumberText}>
                {currentDate}
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.selectedDateMonthText}>
                {currentMonth?.slice(0, 3)}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text
                allowFontScaling={false}
                style={styles.selectedDateTitleText}>
                Selected Date
              </Text>
              {actionNumId !== 9 ? (
                <Text
                  allowFontScaling={false}
                  style={
                    styles.selectedDateWithTimeText
                  }>{`${currentWeekDay}, ${timeFrame?.Start}:${timeFrame?.Minute_Start} - ${timeFrame?.End}:${timeFrame?.Minute_End}`}</Text>
              ) : (
                <Text
                  allowFontScaling={false}
                  style={styles.selectedDateWithTimeText}>{`${currentWeekDay}${
                  isEvent
                    ? `, ${getFormattedTime(bookingDetails?.booking_time)}`
                    : ``
                }`}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.removeBtnContainer}
              onPress={handleAlertVisible}>
              <Text allowFontScaling={false} style={styles.removeBtnText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.actionRequestedContainer}>
            <Text allowFontScaling={false} style={styles.actionRequestedText}>
              Action Requested:
            </Text>
          </View>
        </View>

        <View style={styles.timeReelsContainer}>
          <View style={styles.tiktokContainer}>
            <Text allowFontScaling={false} style={styles.tiktokTitleText}>
              Content Type
            </Text>
            <View style={styles.tiktokIconTextContainer}>
              <FastImage
                resizeMode="contain"
                source={{
                  priority: FastImage.priority.high,
                  uri: icon,
                }}
                style={styles.tiktokIcon}
              />
              {/* <Image resizeMode="cover" source={icon} style={styles.tiktokIcon} /> */}
              <Text
                allowFontScaling={false}
                style={styles.tiktokDesctiption}>{`${actionName}`}</Text>
            </View>
          </View>
          <View style={styles.deadlineTimeContainer}>
            <Text allowFontScaling={false} style={styles.timeTitleText}>
              Deadline
            </Text>
            <View style={styles.infoContainer}>
              <Image
                resizeMode="contain"
                source={IMAGES.info}
                style={styles.infoIcon}
              />
              <Text
                allowFontScaling={false}
                style={
                  styles.timeText
                }>{`${bookingDetails?._actions_turbo?.Days_deadline} days after booking`}</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.contentDetailsContainer}>
            <Text allowFontScaling={false} style={styles.contentDetailsText}>
              Content details :
            </Text>
          </View>
        </View>
        <View style={styles.redirectsContainer}>
          <TouchableOpacity
            style={styles.contentBriefContainer}
            onPress={handleContentBriefPress}>
            <Text allowFontScaling={false} style={styles.socialMediaTitleText}>
              Content Brief & Tags
            </Text>
            <Image
              resizeMode="contain"
              source={IMAGES.back}
              style={styles.rightIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.howItWorksContainer}>
            <Text allowFontScaling={false} style={styles.socialMediaTitleText}>
              How it works
            </Text>
            <Image
              resizeMode="contain"
              source={IMAGES.back}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>

        <SwipeButton
          containerStyles={swipeButtonStyles.swipeBtnMainContainer}
          height={verticalScale(60)}
          width={'90%'}
          shouldResetAfterSuccess={true}
          disabled={!bookingDetails?.Approved}
          onSwipeSuccess={handleSwipeSuccess}
          railStyles={swipeButtonStyles.swipeBtnRail}
          railBackgroundColor={COLORS.newPrimary}
          railFillBackgroundColor={COLORS.newPrimary}
          thumbIconBackgroundColor={COLORS.newPrimary}
          thumbIconComponent={() => (
            <Image
              source={IMAGES.swipeButton}
              style={swipeButtonStyles.swipeBtnIcon}
            />
          )}
          // thumbIconImageSource={IMAGES.swipeButton}
          thumbIconStyles={swipeButtonStyles.swipeThumbIcon}
          // thumbIconWidth={100}
          title={'Check in Now'}
          titleColor={COLORS.white}
          titleStyles={swipeButtonStyles.swipeBtnTitle}
        />

        {/* <View style={styles.openCouponBtnMainContainer}>
          <TouchableOpacity
            onPress={handleOpenCouponPress}
            style={[
              styles.openCouponBtnContainer,
              !bookingDetails?.Approved && styles.disabledBtnContainer,
            ]}
            disabled={!bookingDetails?.Approved}>
            <Text allowFontScaling={false} style={styles.openCouponBtnText}>
              Open Coupon
            </Text>
          </TouchableOpacity>
        </View> */}

        <CustomModal
          visible={isAlertVisible}
          title={'Cancel booking'}
          description={'Do you really want to cancel the booking?'}
          handlePositiveBtnPress={handlePositiveBtnPress}
          handleNegativeBtnPress={handleAlertVisible}
          isLoading={isDeleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourScheduleDetailsScreen;

const styles = StyleSheet.create({
  mainScrollView: {
    backgroundColor: COLORS.white,
  },
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
    marginLeft: scale(20),
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
  actionRequestedContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(24),
  },
  actionRequestedText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17.77),
    marginTop: verticalScale(10),
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
    height: verticalScale(56),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  contentDetailsContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(24),
  },
  contentDetailsText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17.77),
    marginTop: verticalScale(10),
  },
  deadlineTimeContainer: {
    marginRight: scale(15),
    width: '40%',
  },
  disabledBtnContainer: {
    backgroundColor: COLORS.cultured,
    opacity: 0.7,
  },
  extraPersonIcon: {
    height: moderateScale(13.23),
    marginLeft: scale(15),
    width: moderateScale(20.25),
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
    width: '70%',
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  infoIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  locationImage: {
    borderRadius: moderateScale(42),
    height: moderateScale(42),
    width: moderateScale(42),
  },
  locationImageContainer: {
    marginLeft: scale(13),
  },
  locationNameContainer: {
    marginLeft: scale(15),
  },
  locationNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  locationText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    textDecorationLine: 'underline',
  },
  locationTextContainer: {
    width: '100%',
    paddingRight: scale(50),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(23),
  },
  onApprovalItemsMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    paddingBottom: verticalScale(10),
    width: '95%',
  },
  onApprovalText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  onApprovalTextContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(10),
    height: verticalScale(28),
    justifyContent: 'center',
    width: scale(62),
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
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  openCouponBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(9),
  },
  ratingIconImage: {
    height: moderateScale(16),
    marginLeft: scale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  redirectsContainer: {
    paddingHorizontal: scale(10),
  },
  removeBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  removeBtnText: {
    color: COLORS.tartOrange,
    fontFamily: FONTS.quicksandBold,
  },
  restaurantDetailsMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  restaurantImageContainer: {
    marginLeft: scale(13),
  },
  restaurantNameContainer: {
    width: '40%',
  },
  restaurantNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  rightIcon: {
    height: moderateScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{rotate: '180deg'}],
    width: moderateScale(25),
  },
  selectedDateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightNewPrimary,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    width: '20%',
  },
  selectedDateMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    flexDirection: 'row',
    height: verticalScale(60),
    marginTop: verticalScale(23),
    width: '95%',
  },
  selectedDateMonthText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateTitleText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  selectedDateWithTimeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(9),
  },
  serviceImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  tiktokContainer: {
    justifyContent: 'center',
    marginLeft: scale(15),
    width: '50%',
  },
  tiktokDesctiption: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
    // marginTop: verticalScale(5),
    width: '60%',
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: scale(10),
    width: '60%',
  },
  timeReelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    width: '100%',
  },
  timeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
    marginTop: verticalScale(5),
  },
  timeTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
});

const swipeButtonStyles = StyleSheet.create({
  swipeBtnRail: {
    borderColor: COLORS.newPrimary,
  },
  swipeBtnTitle: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
  },
  swipeThumbIcon: {
    borderRadius: moderateScale(24),
    borderWidth: 0,
  },
  swipeBtnIcon: {
    height: moderateScale(52),
    width: moderateScale(52),
  },
  swipeBtnMainContainer: {
    alignSelf: 'center',
    borderRadius: moderateScale(24),
    marginTop: verticalScale(30),
    borderWidth: 0,
    marginBottom: verticalScale(30),
  },
});
