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
import { checkAction } from '../../utils'

import { useServiceDetails } from './hooks'

const ServiceDetails = () => {
  const {
    socialActions,
    diaryItems,
    // services,
    // categoriesIds,
    isImageLoading,
    isLoading,
    isBookBtnPressed,
    setIsImageLoading,
    serviceDetails,
    dealsLeft,
    // filter,
    // serviceCategories,
    // onCategoryChange,
    // handleBackPress,
    handleBookPress,
  } = useServiceDetails()

  // console.log('Service Details: ' + JSON.stringify(serviceDetails))
  return (
    <View style={styles.mainContainer}>
      <CommonHeader title={'Deals'} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={30} />
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
                      onLoadEnd={() => setIsImageLoading(false)}
                      resizeMode="cover"
                      source={{ priority: FastImage.priority.high, uri: item?.url }}
                      style={styles.imageStyle}
                    />
                  </>
                )
              }}
              data={[serviceDetails?.Offer_Cover]}
            />
          </View>

          <View style={styles.titleRatingMainRow}>
            <View style={styles.itemTitleIconContainer}>
              <FastImage
                resizeMode="contain"
                source={{ priority: FastImage.priority.high, uri: serviceDetails?._actions_turbo?.Action_icon?.url }}
                style={styles.socialIcon}
              />
              {/* <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} /> */}
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
                const actions = checkAction(actionNumId, socialActions)
                // console.log('icon', icon, actionNumId)
                return (
                  <>
                    {actionNumId === 3 ? (
                      diaryItems?.map((diaryItem, innerIndex) => (
                        <>
                          <View style={styles.mainSocialItemContainer} key={innerIndex}>
                            <View style={styles.socialMediaImageContainer}>
                              <FastImage
                                resizeMode="contain"
                                source={{
                                  priority: FastImage.priority.high,
                                  uri: item?._actions_turbo?.Action_icon?.url,
                                }}
                                style={styles.socialMediaImage}
                              />
                              {/* <Image source={icon?.action_icon} style={styles.socialMediaImage} /> */}
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
                      actions?.duo_actions?.map((innerItem, innerIndex) => (
                        <>
                          <View style={styles.mainSocialItemContainer} key={innerIndex}>
                            <View style={styles.socialMediaImageContainer}>
                              <FastImage
                                resizeMode="contain"
                                source={{
                                  priority: FastImage.priority.high,
                                  uri: innerItem?.Action_icon?.url,
                                }}
                                style={styles.socialMediaImage}
                              />
                              {/* <Image source={icon?.action_icon} style={styles.socialMediaImage} /> */}
                            </View>
                            <View style={styles.socialMediaTitleDescriptionContainer}>
                              <View style={styles.socialMediaTitleContainer}>
                                <Text style={styles.socialMediaTitle}>{innerItem?.Action_Name}</Text>
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
                    ) : (
                      <View style={styles.mainSocialItemContainer}>
                        <View style={styles.socialMediaImageContainer}>
                          <FastImage
                            resizeMode="contain"
                            source={{
                              priority: FastImage.priority.high,
                              uri: item?._actions_turbo?.Action_icon?.url,
                            }}
                            style={styles.socialMediaImage}
                          />
                          {/* <Image source={icon?.action_icon} style={styles.socialMediaImage} /> */}
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
                <ActivityIndicator size={30} color={COLORS.black22} />
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
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(10),
  },
  timeCircleIcon: {
    tintColor: COLORS.newPrimary,
    height: moderateScale(18),
    width: moderateScale(18),
  },
  deadlineContainer: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentRequiredText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  contentRequiredContainer: {
    width: '50%',
    alignItems: 'center',
  },
  contentRequiredRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: verticalScale(5),
  },
  divider: {
    borderWidth: 0.5,
    opacity: 0.5,
    alignSelf: 'center',
    borderColor: COLORS.gray,
    width: '90%',
    marginVertical: verticalScale(20),
  },
  deaLeftText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
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
    borderColor: COLORS.newPrimary,
  },
  amenityMainContainer: {
    // width: scale(120),
    height: verticalScale(45),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginLeft: scale(10),
    paddingHorizontal: scale(10),
    borderColor: COLORS.gainsboro,
    justifyContent: 'center',
    alignItems: 'center',
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
  amenitiesDescription: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(11),
  },
  ratingIcon: {
    tintColor: COLORS.newPrimary,
    height: moderateScale(11.56),
    width: moderateScale(12),
  },
  ratingsText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  ratingsContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginLeft: scale(20),
  },
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(15),
  },
  socialIcon: {
    height: moderateScale(18),
    width: moderateScale(18),
    marginRight: scale(10),
  },
  itemTitleIconContainer: {
    width: '60%',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginLeft: scale(20),
    marginRight: scale(20),
    marginTop: verticalScale(10),
  },
  titleRatingMainRow: {
    flexDirection: 'row',
    width: '95%',
    marginTop: verticalScale(5),
    justifyContent: 'space-evenly',
  },
  //-----------------------------------
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    marginTop: verticalScale(8),
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
  },
  bookBtnMainContainer: {
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  bookBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
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
    alignSelf: 'center',
    borderRadius: moderateScale(24),
    height: verticalScale(170),
    width: '90%',
  },
  imageLoader: {
    position: 'absolute',
    height: verticalScale(170),
    width: '100%',
    backgroundColor: COLORS.lightPink,
  },
  infoContainer: {
    alignItems: 'center',
    borderColor: COLORS.newPrimary,
    borderRadius: moderateScale(5),
    borderWidth: 2,
    height: moderateScale(22),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    width: moderateScale(22),
  },
  infoText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
  },
  infoTextTitle: {
    color: COLORS.newPrimary,
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: scale(20),
    marginTop: verticalScale(20),
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
    tintColor: COLORS.newPrimary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.newPrimary,
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
