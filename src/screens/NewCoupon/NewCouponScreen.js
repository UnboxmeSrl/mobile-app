import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useNewCoupon } from './hooks'

const NewCouponScreen = () => {
  const { handleBackPress, handleGoToContentPress } = useNewCoupon()
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
          <Image source={IMAGES.testImage} style={styles.userImage} />
          <View style={styles.userFullNameContainer}>
            <Text style={styles.fullNameText}>Alexandro Medugno</Text>
          </View>
          <View style={{}}>
            <Text style={styles.userNameText}>@Medugno</Text>
          </View>
        </View>
        <View style={styles.leftCutter} />
        <View style={styles.rightCutter} />
        <View style={styles.divider} />

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

        <View style={styles.dateTimeContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Date</Text>
            <Text style={styles.timeText}>24 January 2024</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Time</Text>
            <Text style={styles.timeText}>13 PM - 16 PM </Text>
          </View>
        </View>

        <View style={styles.tiktokContainer}>
          <Text style={styles.tiktokTitleText}>Content Type</Text>
          <View style={styles.tiktokIconTextContainer}>
            <Image resizeMode="cover" source={IMAGES.tiktok} style={styles.tiktokIcon} />
            <Text style={styles.tiktokDescription}>Full Tik Tok</Text>
          </View>
        </View>

        <View style={styles.placeContainer}>
          <Text style={styles.tiktokTitleText}>Place</Text>
          <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.socialMediaTitleText}>Super Blue Salon </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentBriefContainer}>
            <Text style={styles.socialMediaTitleText}>Content brief </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewDescriptionContainer}>
        <Text style={styles.viewDescriptionText}>
          * Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id.
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  amenityContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
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
  contentBriefContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginTop: verticalScale(30),
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
  fullNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  goToContentBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
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
    width: '100%',
  },
  goToContentBtnText: {
    color: COLORS.primary,
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
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftCutter: {
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(25),
    height: moderateScale(25),
    left: scale(-12),
    position: 'absolute',
    top: verticalScale(150),
    width: moderateScale(25),
  },
  mainContainer: {
    backgroundColor: COLORS.lightPink,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  mainInnerView: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(5),
    elevation: 20,
    marginHorizontal: '5%',
    paddingBottom: verticalScale(20),
    shadowColor: '#171717',
    shadowOffset: { height: 4, shadowOpacity: 0.2, shadowRadius: moderateScale(3), width: -2 },
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
