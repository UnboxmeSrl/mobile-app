import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
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
  console.log('Service Details', JSON.stringify(serviceDetails))
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

          <View style={styles.socialMediaContentTitleContainer}>
            <Text style={styles.socialMediaTitleText}>Social Media Content</Text>
          </View>
          <FlatList
            data={serviceDetails?.actions}
            renderItem={({ item, index }) => {
              const actionName = item?._actions_turbo?.Action_Name
              const diaryItems = ['TikTok Diary', 'Instagram Diary']
              let icon = ''
              switch (actionName) {
                case 'Reel':
                  icon = IMAGES.reel
                  break
                case 'TikTok':
                  icon = IMAGES.tiktok
                  break
                case 'Story':
                  icon = IMAGES.instagramStory
                  break
                case 'Maps & Story':
                  icon = IMAGES.googleMaps
                  break
                case 'Diary Instagram':
                  icon = IMAGES.diary
                  break
              }
              return (
                <>
                  {actionName === 'Diary Instagram' ? (
                    diaryItems.map((diaryItem) => (
                      <View showsVerticalScrollIndicator={false} style={styles.mainSocialMediaContainer}>
                        <View style={styles.socialItemMainContainer}>
                          <View style={styles.tiktokMainContainer}>
                            <View style={styles.tiktokIconNameContainer}>
                              <Image source={icon} style={styles.tiktokIconImage} />
                              <Text style={styles.tiktokTitleText}>{diaryItem}</Text>

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

                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.amenitiesContainer}
                          >
                            <View style={styles.amenityContainer}>
                              <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Drinks} X Drinks`}</Text>
                              <Image source={IMAGES.drinks} style={styles.amenityIcon} />
                            </View>
                            <View style={styles.amenityContainer}>
                              <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Plates} X Meals`}</Text>
                              <Image source={IMAGES.meals} style={styles.amenityIcon} />
                            </View>
                            <View style={styles.amenityContainer}>
                              <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Extra_People} X Meals`}</Text>
                              <Image source={IMAGES.extraPerson} style={styles.extraPersonIcon} />
                            </View>
                          </ScrollView>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View showsVerticalScrollIndicator={false} style={styles.mainSocialMediaContainer}>
                      <View style={styles.socialItemMainContainer}>
                        <View style={styles.tiktokMainContainer}>
                          <View style={styles.tiktokIconNameContainer}>
                            <Image source={icon} style={styles.tiktokIconImage} />
                            <Text style={styles.tiktokTitleText}>{item?._actions_turbo?.Action_Name}</Text>

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

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.amenitiesContainer}>
                          <View style={styles.amenityContainer}>
                            <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Drinks} X Drinks`}</Text>
                            <Image source={IMAGES.drinks} style={styles.amenityIcon} />
                          </View>
                          <View style={styles.amenityContainer}>
                            <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Plates} X Meals`}</Text>
                            <Image source={IMAGES.meals} style={styles.amenityIcon} />
                          </View>
                          <View style={styles.amenityContainer}>
                            <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Extra_People} X Meals`}</Text>
                            <Image source={IMAGES.extraPerson} style={styles.extraPersonIcon} />
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  )}
                  {serviceDetails?.actions?.length > 1 && index === 0 && (
                    <View style={styles.orContainer}>
                      <Text style={styles.orText}>Or</Text>
                    </View>
                  )}
                </>
              )
            }}
          />

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
    fontSize: moderateScale(14),
    marginTop: verticalScale(8),
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
    height: verticalScale(35),
    justifyContent: 'center',
    marginLeft: scale(10),
    width: scale(120),
  },
  amenityIcon: {
    height: moderateScale(23),
    marginLeft: scale(15),
    width: moderateScale(23),
  },
  amenityTitle: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  backIcon: {
    height: moderateScale(30),
    left: 20,
    position: 'absolute',
    top: 20,
    width: moderateScale(30),
  },
  backIconContainer: {
    height: verticalScale(50),
    position: 'absolute',
    width: scale(50),
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
  },
  bookBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  bookBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  chooseServiceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(8),
  },
  extraPersonIcon: {
    height: moderateScale(13.23),
    marginLeft: scale(15),
    width: moderateScale(20.25),
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(50),
    justifyContent: 'space-between',
    marginTop: verticalScale(50),
  },
  imageStyle: {
    height: verticalScale(170),
    width: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderRadius: moderateScale(5),
    borderWidth: 2,
    height: moderateScale(22),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    width: moderateScale(22),
  },
  infoText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
  },
  infoTextTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  mainSocialMediaContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(14),
    width: '100%',
  },
  orContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(20),
    marginTop: verticalScale(10),
  },
  orText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  previewText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  previewTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(50),
    marginTop: verticalScale(7),
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
  reelIconImage: {
    height: moderateScale(29.09),
    width: moderateScale(32),
  },
  reelIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  reelTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    marginTop: verticalScale(9),
  },
  reelsMainContainer: {
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    height: verticalScale(105),
    justifyContent: 'center',
    marginLeft: scale(10),
    width: '100%',
    width: scale(163.5),
  },
  restaurantNameText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    marginTop: verticalScale(10),
  },
  rightIcon: {
    height: moderateScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
    width: moderateScale(25),
  },
  serviceDetailsContainer: {
    paddingHorizontal: scale(15),
  },
  socialItemMainContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    paddingBottom: verticalScale(10),
    width: scale(325),
  },
  socialMediaContentTitleContainer: {
    marginTop: verticalScale(24),
  },
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  storyIconImage: {
    height: moderateScale(29.09),
    width: moderateScale(32),
  },
  storyIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  storyMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    height: verticalScale(105),
    justifyContent: 'center',
    marginLeft: scale(10),
    marginTop: verticalScale(15),
    width: '100%',
    width: scale(163.5),
  },
  storyTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    marginTop: verticalScale(9),
    textAlign: 'center',
  },

  tiktokIconImage: {
    height: moderateScale(29.09),
    width: moderateScale(32),
  },
  tiktokIconNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  tiktokMainContainer: {
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(10),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    width: scale(325),
  },
  tiktokTitleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    marginTop: verticalScale(9),
  },
})

export default ServiceDetails
