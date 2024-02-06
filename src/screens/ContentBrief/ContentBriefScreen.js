import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useContentBrief } from './hooks'

const ContentBriefScreen = () => {
  const { handleBackPress, handleOpenCouponPress } = useContentBrief()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Content Brief</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Realize a Tiktok or a Reel about Pizzami. Show your favourite pizza, talk about the friendly atmosphere and
            show the view you can see outside
          </Text>
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Tags</Text>
        </View>

        <FlatList
          data={[0, 1]}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>@D&G.Salon</Text>
                <TouchableOpacity>
                  <Image resizeMode="cover" source={IMAGES.copy} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Hashtags</Text>
        </View>

        <FlatList
          data={[0, 1, 2, 3]}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>#Woweffect</Text>
                <TouchableOpacity>
                  <Image resizeMode="cover" source={IMAGES.copy} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />

        <View style={styles.socialMediaMainDetailsContainer}>
          <View style={styles.socialMediaImageContainer}>
            <Image resizeMode="cover" source={IMAGES.tiktok} style={styles.testImage} />
          </View>
          <View style={styles.socialMediaNameContainer}>
            <Text style={styles.socialMediaNameText}>Full Tik Tok</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingUsersText}>240</Text>
              <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
            </View>
          </View>
        </View>
        <View style={styles.socialMediaDescriptionContainer}>
          <Text style={styles.socialMediaDescriptionText}>
            A TikTok video fully dedicated to your experience at the Restaurant
          </Text>
        </View>
        <TouchableOpacity style={styles.queryContainer}>
          <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
          <Text style={styles.queryText}>Questions? Send us a message</Text>
        </TouchableOpacity>

        <View style={styles.openCouponBtnMainContainer}>
          <TouchableOpacity onPress={handleOpenCouponPress} style={styles.openCouponBtnContainer}>
            <Text style={styles.openCouponBtnText}>Open Coupon</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default ContentBriefScreen

const styles = StyleSheet.create({
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  backIconContainer: {
    alignItems: 'flex-end',
    width: '15%',
  },
  copyIcon: {
    height: moderateScale(16),
    marginLeft: scale(7),
    width: moderateScale(16),
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(20),
    width: '90%',
  },
  descriptionText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
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
  labelContainer: {
    justifyContent: 'center',
    marginHorizontal: '8%',
    marginTop: verticalScale(20),
    width: '90%',
  },
  labelText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  openCouponBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  openCouponBtnMainContainer: {
    marginTop: verticalScale(50),
    padding: moderateScale(24),
    width: '100%',
  },
  openCouponBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  queryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(50),
    width: '90%',
  },
  queryIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.primary,
    width: moderateScale(20),
  },
  queryText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
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
  socialMediaDescriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(20),
    width: '90%',
  },
  socialMediaDescriptionText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  socialMediaImageContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    height: verticalScale(67),
    justifyContent: 'center',
    marginLeft: scale(13),
    width: scale(68),
  },
  socialMediaMainDetailsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(45),
  },
  socialMediaNameContainer: {
    marginLeft: scale(20),
    marginTop: verticalScale(5),
    width: '40%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  tagContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '8%',
    marginTop: verticalScale(8),
  },
  tagText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  testImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
})
