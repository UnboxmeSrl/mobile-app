import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { CustomCarousel } from '../../components/CustomCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useServiceDetails } from './hooks'

const ServiceDetails = () => {
  const {
    services,
    categoriesIds,
    serviceDetails,
    filter,
    serviceCategories,
    onCategoryChange,
    handleBackPress,
    handleBookPress,
  } = useServiceDetails()
  console.log('Restaurant Details', JSON.stringify(serviceDetails))
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View>
          <CustomCarousel
            Component={({ item, index }) => {
              return (
                <FastImage
                  resizeMode="cover"
                  source={{ priority: FastImage.priority.high, uri: item?.url }}
                  style={styles.imageStyle}
                />
              )
            }}
            data={[serviceDetails?.Offer_Cover]}
          />
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.serviceDetailsContainer}>
          <Text style={styles.restaurantNameText}>{serviceDetails?.Offer_Name}</Text>

          {/* ✅ Uncomment this code when you integrate the api ✅ */}
          {/* <View style={styles.amenitiesContainer}>
            <View style={styles.amenityContainer}>
              <Text style={styles.amenityTitle}>2 X Drinks</Text>
              <Image source={IMAGES.drinks} style={styles.amenityIcon} />
            </View>
            <View style={styles.amenityContainer}>
              <Text style={styles.amenityTitle}>4 X Meals</Text>
              <Image source={IMAGES.meals} style={styles.amenityIcon} />
            </View>
          </View> */}

          <View style={styles.socialMediaContentTitleContainer}>
            <Text style={styles.socialMediaTitleText}>Social Media Content</Text>
          </View>

          {serviceDetails?.Story ? (
            <View style={styles.storyMainContainer}>
              <View style={styles.storyIconNameContainer}>
                <Image source={IMAGES.instagramStory} style={styles.storyIconImage} />
                <Text style={styles.storyTitleText}>3 x Instagram stories</Text>

                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingUsersText}>240</Text>
                  <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
                </View>
              </View>
              <View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoTextTitle}>i</Text>
                </View>
              </View>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mainSocialMediaContainer}>
              <View style={styles.tiktokMainContainer}>
                <View style={styles.tiktokIconNameContainer}>
                  <Image source={IMAGES.tiktok} style={styles.tiktokIconImage} />
                  <Text style={styles.tiktokTitleText}>Tik tok</Text>

                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingUsersText}>240</Text>
                    <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
                  </View>
                </View>
                <View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTextTitle}>i</Text>
                  </View>
                </View>
              </View>

              <View style={styles.orContainer}>
                <Text style={styles.orText}>Or</Text>
              </View>

              <View style={styles.reelsMainContainer}>
                <View style={styles.reelIconNameContainer}>
                  <Image source={IMAGES.reel} style={styles.reelIconImage} />
                  <Text style={styles.reelTitleText}>Reel</Text>

                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingUsersText}>240</Text>
                    <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
                  </View>
                </View>
                <View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoTextTitle}>i</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.socialMediaTitleText}>How it works </Text>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bookBtnMainContainer}>
          <TouchableOpacity onPress={handleBookPress} style={styles.bookBtnContainer}>
            <Text style={styles.bookBtnText}>Book</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: 14,
    marginTop: 8,
  },
  amenitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  amenityContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: 10,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginLeft: 10,
    width: 144,
  },
  amenityIcon: {
    height: 23,
    marginLeft: 15,
    width: 23,
  },
  amenityTitle: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: 14,
  },
  backIcon: {
    height: 30,
    left: 20,
    position: 'absolute',
    top: 20,
    width: 30,
  },
  backIconContainer: {
    position: 'absolute',
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: 16,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },
  bookBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 14,
    padding: 24,
    width: '100%',
  },
  bookBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: 18,
    fontWeight: '600',
  },
  chooseServiceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginTop: 8,
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginTop: 125,
  },
  imageStyle: {
    height: 200,
    width: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginTop: 10,
    width: 22,
  },
  infoText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: 14,
    marginTop: 3,
  },
  infoTextTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  mainSocialMediaContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  orContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  orText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: 14,
  },
  previewText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  previewTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 9,
  },
  ratingIconImage: {
    height: 16,
    marginLeft: 5,
    tintColor: COLORS.primary,
    width: 16,
  },
  ratingUsersText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: 16,
  },
  reelIconImage: {
    height: 29.09,
    width: 32,
  },
  reelIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  reelTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
    marginTop: 9,
  },
  reelsMainContainer: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 10,
    flexDirection: 'row',
    height: 105,
    justifyContent: 'center',
    marginLeft: 10,
    width: '100%',
    width: 163.5,
  },
  restaurantNameText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 20,
    marginTop: 10,
  },
  rightIcon: {
    height: 25,
    marginTop: 10,
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
    width: 25,
  },
  serviceDetailsContainer: {
    paddingHorizontal: 15,
  },
  socialMediaContentTitleContainer: {
    marginTop: 24,
  },
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  storyIconImage: {
    height: 29.09,
    width: 32,
  },
  storyIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  storyMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: 10,
    flexDirection: 'row',
    height: 105,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: verticalScale(15),
    width: '100%',
    width: 163.5,
  },
  storyTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
    marginTop: 9,
    textAlign: 'center',
  },

  tiktokIconImage: {
    height: 29.09,
    width: 32,
  },
  tiktokIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  tiktokMainContainer: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 10,
    flexDirection: 'row',
    height: 105,
    justifyContent: 'center',
    marginLeft: 10,
    width: '100%',
    width: 163.5,
  },
  tiktokTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
    marginTop: 9,
  },
})

export default ServiceDetails
