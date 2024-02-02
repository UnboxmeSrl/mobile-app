import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useYourScheduleDetails } from './hooks'

const YourScheduleDetailsScreen = () => {
  const { approvalStage, handleBackPress } = useYourScheduleDetails()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.dateSelectTitleText}>Full Combo Lunch</Text>
          </View>
        </View>

        <View style={styles.onApprovalItemsMainContainer}>
          <View style={styles.restaurantDetailsMainRow}>
            <View style={styles.restaurantImageContainer}>
              <Image resizeMode="cover" source={IMAGES.testImage} style={styles.testImage} />
            </View>
            <View style={styles.restaurantNameContainer}>
              <Text style={styles.restaurantNameText}>Simple Lunch</Text>
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

          <View style={styles.amenitiesContainer}>
            <View style={styles.amenityContainer}>
              <Text style={styles.amenityTitle}>2 X Drinks</Text>
              <Image source={IMAGES.drinks} style={styles.amenityIcon} />
            </View>
            <View style={styles.amenityContainer}>
              <Text style={styles.amenityTitle}>4 X Meals</Text>
              <Image source={IMAGES.meals} style={styles.amenityIcon} />
            </View>
          </View>

          <View style={styles.nameLocationMainRow}>
            <View style={styles.locationImageContainer}>
              <Image resizeMode="cover" source={IMAGES.testImage2} style={styles.locationImage} />
            </View>
            <View style={styles.locationNameContainer}>
              <Text style={styles.locationNameText}>Pizzami Bali</Text>
              <View>
                <Text style={styles.locationText}>Chengduu Street 34, Bali</Text>
              </View>
            </View>
          </View>

          <View style={styles.selectedDateMainContainer}>
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateNumberText}>19</Text>
              <Text style={styles.selectedDateMonthText}>Jan</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.selectedDateTitleText}>Selected Date</Text>
              <Text style={styles.selectedDateWithTimeText}>Tuesday, 04:30pm</Text>
            </View>
            <TouchableOpacity style={styles.removeBtnContainer}>
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.actionRequestedContainer}>
            <Text style={styles.actionRequestedText}>Action Requested:</Text>
          </View>
        </View>

        <View style={styles.timeReelsContainer}>
          <View style={styles.tiktokContainer}>
            <Text style={styles.tiktokTitleText}>Content Type</Text>
            <View style={styles.tiktokIconTextContainer}>
              <Image resizeMode="cover" source={IMAGES.tiktok} style={styles.tiktokIcon} />
              <Text style={styles.tiktokDesctiption}>Full Tik Tok</Text>
            </View>
          </View>
          <View style={styles.deadlineTimeContainer}>
            <Text style={styles.timeTitleText}>Deadline</Text>
            <View style={styles.infoContainer}>
              <Image resizeMode="contain" source={IMAGES.info} style={styles.infoIcon} />
              <Text style={styles.timeText}>5 days after booking</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.contentDetailsContainer}>
            <Text style={styles.contentDetailsText}>Content details :</Text>
          </View>
        </View>
        <View style={styles.redirectsContainer}>
          <TouchableOpacity style={styles.contentBriefContainer}>
            <Text style={styles.socialMediaTitleText}>Content Brief & Tags</Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.socialMediaTitleText}>How it works </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.openCouponBtnMainContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.openCouponBtnContainer}>
            <Text style={styles.openCouponBtnText}>Open Coupon </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default YourScheduleDetailsScreen

const styles = StyleSheet.create({
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
  amenitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  amenityContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    height: verticalScale(38),
    justifyContent: 'center',
    marginLeft: scale(10),
    width: scale(111),
  },
  amenityIcon: {
    height: verticalScale(23),
    marginLeft: scale(15),
    width: scale(23),
  },
  amenityTitle: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
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
  openCouponBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  contentBriefContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(56),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
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
  contentDetailsContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(24),
  },
  openCouponBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600'
  },
  contentDetailsText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17.77),
    marginTop: verticalScale(10),
  },
  dateSelectTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  deadlineTimeContainer: {
    marginRight: scale(15),
    width: '40%',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(20),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
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
  redirectsContainer: {
    paddingHorizontal: scale(10)
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
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    textDecorationLine: 'underline',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(23),
  },
  onApprovalItemsMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightPink,
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
  ratingContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(9),
  },
  ratingIconImage: {
    height: moderateScale(16),
    marginLeft: scale(5),
    tintColor: COLORS.primary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
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
    transform: [{ rotate: '180deg' }],
    width: moderateScale(25),
  },
  selectedDateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
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
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.primary,
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
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  testImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  tiktokContainer: {
    marginLeft: scale(15),
    width: '50%',
  },
  tiktokDesctiption: {
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
})
