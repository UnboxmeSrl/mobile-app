import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { useNewCoupon } from './hooks'
import FastImage from 'react-native-fast-image'
import { hasNotch } from '../../utils'

const NewCouponScreen = () => {
  const {
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
  } = useNewCoupon()

  return (
    <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Coupon</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainInnerView}>
        <View style={styles.userDetailsContainer}>
          {loginData?.Profile_pic ? (
            <FastImage
              resizeMode="cover"
              source={{
                priority: FastImage.priority.high,
                uri: loginData?.Profile_pic?.url,
              }}
              style={styles.userImage}
            />
          ) : (
            <Image source={IMAGES.testImage} style={styles.userImage} />
          )}
          <View style={styles.userFullNameContainer}>
            <Text style={styles.fullNameText}>{loginData?.name}</Text>
          </View>
          <View>
            <Text style={styles.userNameText}>{`@${loginData?.name}`}</Text>
          </View>
        </View>
        <View style={styles.leftCutter} />
        <View style={styles.rightCutter} />
        <View style={styles.divider} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.amenitiesContainer}>
          <View style={styles.amenityContainer}>
            <Text style={styles.amenityTitle}>{`${bookingDetails?._actions_turbo?.Drinks} X Drinks`}</Text>
            <Image source={IMAGES.drinks} style={styles.amenityIcon} />
          </View>
          <View style={styles.amenityContainer}>
            <Text style={styles.amenityTitle}>{`${bookingDetails?._actions_turbo?.Plates} X Meals`}</Text>
            <Image source={IMAGES.meals} style={styles.amenityIcon} />
          </View>
          <View style={styles.amenityContainer}>
            <Text style={styles.amenityTitle}>{` ${bookingDetails?._actions_turbo?.Extra_People} X Persons`}</Text>
            <Image source={IMAGES.extraPerson} style={styles.extraPersonIcon} />
          </View>
        </ScrollView>

        <View style={styles.dateTimeContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Date</Text>
            <Text style={styles.timeText}>{`${bookingDate?.getDate()} ${month} ${bookingDate?.getFullYear()}`}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Time</Text>
            <Text style={styles.timeText}>
              {`${timeFrame?.Start}:${timeFrame?.Minute_Start} - ${timeFrame?.End}:${timeFrame?.Minute_End}`}
            </Text>
          </View>
        </View>

        <View style={styles.tiktokContainer}>
          <Text style={styles.tiktokTitleText}>Content Type</Text>
          <View style={styles.tiktokIconTextContainer}>
            <FastImage
              resizeMode="contain"
              source={{ priority: FastImage.priority.high, uri: icon }}
              style={styles.contentTypeImage}
            />
            {/* <Image resizeMode="cover" source={icon} style={styles.contentTypeImage} /> */}
            <Text style={styles.tiktokDescription}>{actionName}</Text>
          </View>
        </View>

        <View style={styles.placeContainer}>
          <Text style={styles.tiktokTitleText}>Place</Text>
          <TouchableOpacity
            style={styles.restaurantRedirectContainer}
            onPress={() => handleRestaurantRedirect(bookingDetails?._restaurant_turbo)}
          >
            <Text style={styles.socialMediaTitleText}>{`${bookingDetails?._restaurant_turbo?.Name}`} </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentBriefContainer} onPress={handleContentBriefPress}>
            <Text style={styles.socialMediaTitleText}>Content brief </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewDescriptionContainer}>
        <Text style={styles.viewDescriptionText}>
          * Show the present coupon to the restaurant staff to claim your deal
        </Text>
      </View>
      <View style={styles.goToContentBtnMainContainer}>
        <TouchableOpacity onPress={handleGoToContentPress} style={styles.goToContentBtnContainer}>
          <Text style={styles.goToContentBtnText}>Go to Content</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default NewCouponScreen

const styles = StyleSheet.create({
  amenitiesContainer: {
    marginTop: verticalScale(10),
  },
  amenityContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightNewPrimaryA6,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    height: verticalScale(38),
    justifyContent: 'center',
    marginLeft: scale(10),
    width: scale(125),
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
    marginVertical: verticalScale(20),
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
    backgroundColor: COLORS.lightNewPrimary40,
    paddingTop: getStatusBarHeight() + (hasNotch && verticalScale(15)),
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
    transform: [{ rotate: '180deg' }],
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
})
