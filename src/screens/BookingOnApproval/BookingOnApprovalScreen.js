import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { useBookingOnApproval } from './hooks'
import { commonStyle } from '../../utils'

const BookingOnApprovalScreen = () => {
  const {
    bookingDetails,
    approvalStage,
    currentDate,
    currentMonth,
    currentWeekDay,
    timeFrame,
    isLoading,
    handleBackPress,
    handleGoToSchedulePress,
  } = useBookingOnApproval()
  const approvalIcon =
    approvalStage === 'pending'
      ? IMAGES.approvalPending
      : approvalStage === 'success'
      ? IMAGES.approvalSuccess
      : IMAGES.approvalReject

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.pendingIconTextContainer}>
        <View>
          <Image resizeMode="cover" source={approvalIcon} style={styles.approvalIcon} />
        </View>
        <View style={styles.pendingTextContainer}>
          <Text style={styles.pendingText}>
            Your booking is on
            {` ${approvalStage === 'pending' ? `approval` : approvalStage === 'success' ? `approved` : `rejected`}`}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.onApprovalItemsMainContainer,
          approvalStage === 'pending'
            ? { backgroundColor: COLORS.cornSilk, borderColor: COLORS.americanYellow }
            : approvalStage === 'success'
            ? { backgroundColor: COLORS.honeyDewGreen, borderColor: COLORS.mayGreen }
            : { backgroundColor: COLORS.seaShellRed, borderColor: COLORS.follyRed },
        ]}
      >
        <View style={styles.restaurantDetailsMainRow}>
          <View style={styles.restaurantImageContainer}>
            <FastImage
              resizeMode="cover"
              source={{ priority: FastImage.priority.high, uri: bookingDetails?._offers_turbo?.Offer_Cover?.url }}
              style={styles.serviceImage}
            />
          </View>
          <View style={styles.restaurantNameContainer}>
            <Text style={styles.restaurantNameText}>{bookingDetails?._offers_turbo?.Offer_Name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingUsersText}>240</Text>
              <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
            </View>
          </View>
          <View
            style={[
              styles.onApprovalTextContainer,
              approvalStage === 'pending'
                ? { backgroundColor: COLORS.americanYellow }
                : approvalStage === 'success'
                ? { backgroundColor: COLORS.mayGreen }
                : { backgroundColor: COLORS.tartOrange },
            ]}
          >
            <Text style={styles.onApprovalText}>{`${
              approvalStage === 'pending'
                ? `On Approval`
                : approvalStage === 'success'
                ? `Verified`
                : `Content Rejected`
            }`}</Text>
          </View>
        </View>

        <View style={styles.nameLocationMainRow}>
          <View style={styles.locationImageContainer}>
            <FastImage
              resizeMode="cover"
              source={{ priority: FastImage.priority.high, uri: bookingDetails?._restaurant_turbo?.Cover?.url }}
              style={styles.locationImage}
            />
          </View>
          <View style={styles.locationNameContainer}>
            <Text style={styles.locationNameText}>{bookingDetails?._restaurant_turbo?.Name}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText} numberOfLines={4}>
                {bookingDetails?._restaurant_turbo?.Adress}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.selectedDateMainContainer}>
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateNumberText}>{currentDate}</Text>
            <Text style={styles.selectedDateMonthText}>{currentMonth?.slice(0, 3)}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.selectedDateTitleText}>Selected Date</Text>
            <Text
              style={styles.selectedDateWithTimeText}
            >{`${currentWeekDay}, ${timeFrame?.Start}:${timeFrame?.Minute_Start} - ${timeFrame?.End}:${timeFrame?.Minute_End}`}</Text>
          </View>
        </View>

        {approvalStage === 'pending' && (
          <View style={styles.lastDescriptionContainer}>
            <Text style={styles.descriptionText}>
              The owner has received your request and we are waiting for confirmation. Write in Chat fo questions.
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.howItWorksContainer}>
        <Text style={styles.socialMediaTitleText}>Check brief </Text>
        <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
      </TouchableOpacity>

      <View style={styles.goToScheduleBtnMainContainer}>
        {isLoading ? (
          <View style={styles.goToScheduleBtnContainer}>
            <ActivityIndicator color={COLORS.black22} size={30} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleGoToSchedulePress} style={styles.goToScheduleBtnContainer}>
            <Text style={styles.goToScheduleBtnText}>Go to schedule </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default BookingOnApprovalScreen

const styles = StyleSheet.create({
  approvalIcon: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  backIcon: {
    height: verticalScale(30),
    tintColor: COLORS.achromaticBlack,
    width: scale(30),
  },
  descriptionText: {
    color: COLORS.philippineGold,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  goToScheduleBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  goToScheduleBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  goToScheduleBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: scale(20),
    marginVertical: verticalScale(20),
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(56),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  lastDescriptionContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(19),
    width: '95%',
  },
  locationContainer: {
    width: '100%',
    paddingRight: scale(90),
  },
  locationImage: {
    borderRadius: moderateScale(67),
    height: moderateScale(67),
    width: moderateScale(67),
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
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    ...commonStyle.containerPaddingTop,
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(23),
  },
  onApprovalItemsMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.cornSilk,
    borderColor: COLORS.americanYellow,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(32),
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
    borderBottomLeftRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    height: verticalScale(28),
    justifyContent: 'center',
    width: scale(85),
  },
  pendingIconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
  pendingTextContainer: {
    marginTop: verticalScale(5),
    width: '60%',
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
    transform: [{ rotate: '180deg' }],
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
    marginTop: verticalScale(5),
  },
  timeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: scale(10),
    width: '60%',
  },
})
