import React from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { CommonHeader } from '../../components'
import { CustomCarousel } from '../../components/CustomCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { checkAction, checkActionName } from '../../utils'

import { useServiceDetails } from './hooks'

const ServiceDetails = () => {
  const {
    diaryItems,
    services,
    categoriesIds,
    isImageLoading,
    isLoading,
    isBookBtnPressed,
    setIsImageLoading,
    serviceDetails,
    dealsLeft,
    filter,
    serviceCategories,
    onCategoryChange,
    handleBackPress,
    handleBookPress,
  } = useServiceDetails()

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title={'Deals'} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size={30} />
        </View>
      ) : (
        <ScrollView>
          <View>
            <CustomCarousel
              Component={({ item, index }) => {
                return (
                  <>
                    {isImageLoading && <View style={styles.imageLoader} />}
                    <FastImage
                      resizeMode="cover"
                      source={{ priority: FastImage.priority.high, uri: item?.url }}
                      style={styles.imageStyle}
                      onLoadEnd={() => setIsImageLoading(false)}
                    />
                  </>
                )
              }}
              data={[serviceDetails?.Offer_Cover]}
            />
          </View>

          <View style={styles.titleRatingMainRow}>
            <View style={styles.itemTitleIconContainer}>
              <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} />
              <Text style={styles.titleText}>{`${serviceDetails?._actions_turbo?.Action_Name}`}</Text>
            </View>
            <View style={styles.dealLeftContainer}>
              <Text style={styles.deaLeftText}>{`${dealsLeft}`}</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.amenityMainContainer, styles.firstAmenityMainContainer]}>
              <View style={styles.amenityIconContainer}>
                <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
              </View>
              <View style={styles.amenityTitleDescriptionContainer}>
                <Text style={styles.amenitiesTitle}>{`${serviceDetails?._actions_turbo?.Plates} X Meals`}</Text>
                <Text style={styles.amenitiesDescription}>at your choice</Text>
              </View>
            </View>

            <View style={styles.amenityMainContainer}>
              <View style={styles.amenityIconContainer}>
                <Image source={IMAGES.clinkingGlasses} style={styles.amenityIcon} />
              </View>
              <View style={styles.amenityTitleDescriptionContainer}>
                <Text style={styles.amenitiesTitle}>{`${serviceDetails?._actions_turbo?.Drinks} X Drinks`}</Text>
                <Text style={styles.amenitiesDescription}>at your choice</Text>
              </View>
            </View>

            <View style={[styles.amenityMainContainer, styles.friendAmenityContainer]}>
              <View style={styles.amenityTitleDescriptionContainer}>
                <Text
                  style={[styles.amenitiesTitle, styles.friendAmentityText]}
                >{`+${serviceDetails?._actions_turbo?.Extra_People}`}</Text>
                <Text style={[styles.amenitiesDescription, styles.friendAmenityTitle]}>Friend</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.divider} />

          <View style={styles.contentRequiredRow}>
            <View style={styles.contentRequiredContainer}>
              <Text style={styles.contentRequiredText}>Content required</Text>
            </View>
            <View style={styles.deadlineContainer}>
              <Image source={IMAGES.timeCircle} style={styles.timeCircleIcon} />
              <Text
                style={styles.deadlineText}
              >{`Deadline: ${serviceDetails?._actions_turbo?.Days_deadline} Days`}</Text>
            </View>
          </View>

          <View style={styles.flatlistContainer}>
            <FlatList
              data={[serviceDetails]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const actionNumId = item?._actions_turbo?.action_num_id
                // const diaryItems = ['TikTok Diary', 'Instagram Diary']
                const icon = checkAction(actionNumId)
                console.log('icon', icon, actionNumId)
                return (
                  <>
                    {actionNumId === 3 ? (
                      diaryItems?.map((diaryItem, innerIndex) => (
                        <>
                          <View style={styles.mainSocialItemContainer} key={innerIndex}>
                            <View style={styles.socialMediaImageContainer}>
                              <Image source={icon?.action_icon} style={styles.socialMediaImage} />
                            </View>
                            <View style={styles.socialMediaTitleDescriptionContainer}>
                              <View style={styles.socialMediaTitleContainer}>
                                <Text style={styles.socialMediaTitle}>{diaryItem?.action} video</Text>
                                <View style={styles.ratingsContainer}>
                                  <Text style={styles.ratingsText}>60</Text>
                                  <Image source={IMAGES.star} style={styles.ratingIcon} />
                                </View>
                              </View>
                              <View style={styles.socialMediaDescriptionContainer}>
                                <Text style={styles.socialMediaDescriptionText}>
                                  You have to publish a Tiktok video following the brief and tagging both the venue and
                                  claris.app
                                </Text>
                              </View>
                            </View>
                          </View>
                          {innerIndex == 0 && (
                            <View style={styles.orContainer}>
                              <View style={styles.orDivider} />
                              <Text style={styles.orText}>Or</Text>
                              <View style={styles.orDivider} />
                            </View>
                          )}
                        </>
                      ))
                    ) : actionNumId === 6 ? (
                      <>
                        <View style={styles.mainSocialItemContainer}>
                          <View style={styles.socialMediaImageContainer}>
                            <Image source={IMAGES.reelsAddNew} style={styles.socialMediaImage} />
                          </View>
                          <View style={styles.socialMediaTitleDescriptionContainer}>
                            <View style={styles.socialMediaTitleContainer}>
                              <Text style={styles.socialMediaTitle}>{`Reels`} video</Text>
                              <View style={styles.ratingsContainer}>
                                <Text style={styles.ratingsText}>60</Text>
                                <Image source={IMAGES.star} style={styles.ratingIcon} />
                              </View>
                            </View>
                            <View style={styles.socialMediaDescriptionContainer}>
                              <Text style={styles.socialMediaDescriptionText}>
                                You have to publish a Tiktok video following the brief and tagging both the venue and
                                claris.app
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.orContainer}>
                          <View style={styles.orDivider} />
                          <Text style={styles.orText}>Or</Text>
                          <View style={styles.orDivider} />
                        </View>

                        <View style={styles.mainSocialItemContainer}>
                          <View style={styles.socialMediaImageContainer}>
                            <Image source={IMAGES.tiktokAddNew} style={styles.socialMediaImage} />
                          </View>
                          <View style={styles.socialMediaTitleDescriptionContainer}>
                            <View style={styles.socialMediaTitleContainer}>
                              <Text style={styles.socialMediaTitle}>{`Tiktok`} video</Text>
                              <View style={styles.ratingsContainer}>
                                <Text style={styles.ratingsText}>60</Text>
                                <Image source={IMAGES.star} style={styles.ratingIcon} />
                              </View>
                            </View>
                            <View style={styles.socialMediaDescriptionContainer}>
                              <Text style={styles.socialMediaDescriptionText}>
                                You have to publish a Tiktok video following the brief and tagging both the venue and
                                claris.app
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : (
                      <View style={styles.mainSocialItemContainer}>
                        <View style={styles.socialMediaImageContainer}>
                          <Image source={icon?.action_icon} style={styles.socialMediaImage} />
                        </View>
                        <View style={styles.socialMediaTitleDescriptionContainer}>
                          <View style={styles.socialMediaTitleContainer}>
                            <Text style={styles.socialMediaTitle}>{item?._actions_turbo?.Action_Name} video</Text>
                            <View style={styles.ratingsContainer}>
                              <Text style={styles.ratingsText}>60</Text>
                              <Image source={IMAGES.star} style={styles.ratingIcon} />
                            </View>
                          </View>
                          <View style={styles.socialMediaDescriptionContainer}>
                            <Text style={styles.socialMediaDescriptionText}>
                              You have to publish a Tiktok video following the brief and tagging both the venue and
                              claris.app
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                )
              }}
            />
          </View>

          {/* <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.socialMediaTitleText}>How it works </Text>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity> */}

          <View style={styles.bookBtnMainContainer}>
            <TouchableOpacity onPress={handleBookPress} style={styles.bookBtnContainer} disabled={isBookBtnPressed}>
              {isBookBtnPressed ? (
                <ActivityIndicator size={30} color={COLORS.primary} />
              ) : (
                <Text style={styles.bookBtnText}>Book Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  firstAmenityMainContainer: {
    marginLeft: scale(20),
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  friendAmenityTitle: {
    textAlign: 'center',
  },
  friendAmentityText: {
    textAlign: 'center',
  },
  friendAmenityContainer: {
    // width: scale(80),
    justifyContent: 'center',
  },
  orDivider: {
    borderWidth: 0.5,
    opacity: 0.5,
    alignSelf: 'center',
    borderColor: COLORS.gray,
    width: '20%',
  },
  socialMediaDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(15),
  },
  socialMediaDescriptionContainer: {
    marginTop: verticalScale(10),
  },
  socialMediaTitle: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17),
  },
  socialMediaTitleContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  socialMediaTitleDescriptionContainer: {
    width: '70%',
    marginLeft: scale(10),
    justifyContent: 'center',
  },
  socialMediaImage: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  socialMediaImageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSocialItemContainer: {
    height: verticalScale(150),
    width: '90%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(16),
    marginTop: verticalScale(24),
    flexDirection: 'row',
  },
  flatlistContainer: {
    flex: 1,
    marginBottom: verticalScale(20),
  },
  deadlineText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
  },
  mainSocialItemContainer: {
    height: verticalScale(150),
    alignSelf: 'center',
    width: '90%',
    borderColor: COLORS.gainsboro,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    marginTop: verticalScale(24),
  },
  deadlineContainer: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  orDivider: {
    alignSelf: 'center',
    borderColor: COLORS.gray,
    borderWidth: 0.5,
    opacity: 0.5,
    width: '20%',
  },
  contentRequiredContainer: {
    width: '50%',
    alignItems: 'center',
  },
  socialMediaDescriptionContainer: {
    marginTop: verticalScale(10),
  },
  contentRequiredRow: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    width: '100%',
  },
  socialMediaDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(15),
  },
  contentRequiredText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  dealLeftContainer: {
    // width: '22%',
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(20),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(10),
    borderWidth: moderateScale(1),
    borderColor: COLORS.primary,
  },
  amenityMainContainer: {
    // width: scale(120),
    height: verticalScale(45),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    marginTop: verticalScale(10),
    marginLeft: scale(10),
    paddingHorizontal: scale(10),
    borderColor: COLORS.gainsboro,
    alignItems: 'center',
    justifyContent: 'center',
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
  amenityTitleDescriptionContainer: {
    // width: '60%',
    justifyContent: 'center',
  },
  amenitiesTitle: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  socialMediaTitleDescriptionContainer: {
    width: '70%',
    marginLeft: scale(10),
    justifyContent: 'center',
  },
  amenitiesDescription: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(11),
  },
  socialMediaImageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  flatlistContainer: {
    flex: 1,
    marginBottom: verticalScale(20),
  },
  amenityTitleDescriptionContainer: {
    justifyContent: 'center',
    width: '60%',
  },
  timeCircleIcon: {
    tintColor: COLORS.primary,
    height: moderateScale(18),
    width: moderateScale(18),
  },
  deaLeftText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  // -----------------------------------
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    marginTop: verticalScale(8),
  },

  dealLeftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    height: verticalScale(20),
    borderColor: COLORS.primary,
    marginTop: verticalScale(10),
  },

  divider: {
    borderWidth: 0.5,
    alignSelf: 'center',
    opacity: 0.5,
    borderColor: COLORS.gray,
    marginVertical: verticalScale(20),
    width: '90%',
  },

  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
  },

  itemTitleIconContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    width: '60%',
    marginLeft: scale(20),
    marginRight: scale(20),
    marginTop: verticalScale(10),
  },

  bookBtnMainContainer: {
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },

  ratingIcon: {
    height: moderateScale(11.56),
    width: moderateScale(12),
  },

  bookBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },

  ratingsContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '15%',
    marginLeft: scale(20),
  },

  chooseServiceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(8),
  },
  ratingsText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  extraPersonIcon: {
    height: moderateScale(13.23),
    marginLeft: scale(15),
    width: moderateScale(20.25),
  },
  socialIcon: {
    height: moderateScale(18),
    marginRight: scale(10),
    width: moderateScale(18),
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(50),
    justifyContent: 'space-between',
    marginTop: verticalScale(50),
  },
  imageLoader: {
    backgroundColor: COLORS.lightPink,
    height: verticalScale(170),
    position: 'absolute',
    width: '100%',
  },
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(15),
  },
  imageStyle: {
    alignSelf: 'center',
    borderRadius: moderateScale(24),
    height: verticalScale(170),
    width: '90%',
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
  titleRatingMainRow: {
    flexDirection: 'row',
    width: '95%',
    marginTop: verticalScale(5),
    justifyContent: 'space-evenly',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: scale(20),
    marginTop: verticalScale(20),
    width: '100%',
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
