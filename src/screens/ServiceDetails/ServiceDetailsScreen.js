import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../assets/images'
import { CustomCarousel } from '../../components/CustomCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { checkActionName } from '../../utils'
import { useServiceDetails } from './hooks'
import { CommonHeader } from '../../components'

const ServiceDetails = () => {
  const {
    diaryItems,
    services,
    categoriesIds,
    isImageLoading,
    setIsImageLoading,
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
      <CommonHeader title={'Deals'} />
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
          {/* <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity> */}
        </View>

        <View style={styles.titleRatingMainRow}>
          <View style={styles.itemTitleIconContainer}>
            <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} />
            <Text style={styles.titleText}>Story Combo</Text>
          </View>
          <View style={styles.dealLeftContainer}>
            <Text style={styles.deaLeftText}>{`1 deal left`}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {serviceDetails?.actions?.map((item, index) => {
            return (
              <View style={styles.amenityMainContainer}>
                <View style={styles.amenityIconContainer}>
                  <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
                </View>
                <View style={styles.amenityTitleDescriptionContainer}>
                  <Text style={styles.amenitiesTitle}>{`${item?._actions_turbo?.Plates} X Meals`}</Text>
                  <Text style={styles.amenitiesDescription}>at your choice</Text>
                </View>
              </View>
            )
          })}

          {/* <View style={styles.amenityContainer}>
                        <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Drinks} X Drinks`}</Text>
                        <Image source={IMAGES.drinks} style={styles.amenityIcon} />
                      </View>
                      <View style={styles.amenityContainer}>
                        <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Plates} X Meals`}</Text>
                        <Image source={IMAGES.meals} style={styles.amenityIcon} />
                      </View>
                      <View style={styles.amenityContainer}>
                        <Text style={styles.amenityTitle}>{` ${item?._actions_turbo?.Extra_People} X Persons`}</Text>
                        <Image source={IMAGES.extraPerson} style={styles.extraPersonIcon} />
                      </View> */}
        </ScrollView>

        <View style={styles.divider} />

        <View style={styles.contentRequiredRow}>
          <View style={styles.contentRequiredContainer}>
            <Text style={styles.contentRequiredText}>Content required</Text>
          </View>
          <View style={styles.deadlineContainer}>
            <Image source={IMAGES.timeCircle} style={styles.timeCircleIcon} />
            <Text style={styles.deadlineText}>Deadline: 5 Days</Text>
          </View>
        </View>

        <View style={styles.flatlistContainer}>
          <FlatList
            data={serviceDetails?.actions}
            renderItem={({ item, index }) => {
              const actionName = item?._actions_turbo?.Action_Name
              // const diaryItems = ['TikTok Diary', 'Instagram Diary']
              const icon = checkActionName(actionName)
              return (
                <>
                  {actionName === 'Diary Instagram' ? (
                    diaryItems.map((diaryItem) => (
                      <View style={styles.mainSocialItemContainer}>
                        <View style={styles.socialMediaImageContainer}>
                          <Image source={icon} style={styles.socialMediaImage} />
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
                      // <View showsVerticalScrollIndicator={false} style={styles.mainSocialMediaContainer}>
                      //   <View style={styles.socialItemMainContainer}>
                      //     <View style={styles.tiktokMainContainer}>
                      //       <View style={styles.tiktokIconNameContainer}>
                      //         <Image source={icon} style={styles.tiktokIconImage} />
                      //         <Text style={styles.tiktokTitleText}>{diaryItem?.action}</Text>

                      //         <View style={styles.ratingContainer}>
                      //           <Text style={styles.ratingUsersText}>240</Text>
                      //           <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
                      //         </View>
                      //       </View>
                      //       <View>
                      //         <View style={styles.infoContainer}>
                      //           <Text style={styles.infoTextTitle}>i</Text>
                      //         </View>
                      //       </View>
                      //     </View>

                      //     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.amenitiesContainer}>
                      //     <View style={styles.amenityContainer}>
                      //       <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Drinks} X Drinks`}</Text>
                      //       <Image source={IMAGES.drinks} style={styles.amenityIcon} />
                      //     </View>
                      //     <View style={styles.amenityContainer}>
                      //       <Text style={styles.amenityTitle}>{`${item?._actions_turbo?.Plates} X Meals`}</Text>
                      //       <Image source={IMAGES.meals} style={styles.amenityIcon} />
                      //     </View>
                      //     <View style={styles.amenityContainer}>
                      //       <Text
                      //         style={styles.amenityTitle}
                      //       >{` ${item?._actions_turbo?.Extra_People} X Persons`}</Text>
                      //       <Image source={IMAGES.extraPerson} style={styles.extraPersonIcon} />
                      //     </View>
                      //   </ScrollView>
                      //   </View>
                      // </View>
                    ))
                  ) : (
                    <View style={styles.mainSocialItemContainer}>
                      <View style={styles.socialMediaImageContainer}>
                        <Image source={icon} style={styles.socialMediaImage} />
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
                  {serviceDetails?.actions?.length > 1 && index === 0 && (
                    <View style={styles.orContainer}>
                      <View style={styles.orDivider} />
                      <Text style={styles.orText}>Or</Text>
                      <View style={styles.orDivider} />
                    </View>
                  )}
                </>
              )
            }}
          />
        </View>

        {/* <View style={styles.serviceDetailsContainer}>
          <Text style={styles.restaurantNameText}>{serviceDetails?.Offer_Name}</Text>

          <View style={styles.socialMediaContentTitleContainer}>
            <Text style={styles.socialMediaTitleText}>Social Media Content</Text>
          </View>
          <FlatList
            data={serviceDetails?.actions}
            renderItem={({ item, index }) => {
              const actionName = item?._actions_turbo?.Action_Name
              // const diaryItems = ['TikTok Diary', 'Instagram Diary']
              const icon = checkActionName(actionName)
              return (
                <>
                  {actionName === 'Diary Instagram' ? (
                    diaryItems.map((diaryItem) => (
                      <View showsVerticalScrollIndicator={false} style={styles.mainSocialMediaContainer}>
                        <View style={styles.socialItemMainContainer}>
                          <View style={styles.tiktokMainContainer}>
                            <View style={styles.tiktokIconNameContainer}>
                              <Image source={icon} style={styles.tiktokIconImage} />
                              <Text style={styles.tiktokTitleText}>{diaryItem?.action}</Text>

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
                              <Text
                                style={styles.amenityTitle}
                              >{` ${item?._actions_turbo?.Extra_People} X Persons`}</Text>
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
                            <Text
                              style={styles.amenityTitle}
                            >{` ${item?._actions_turbo?.Extra_People} X Persons`}</Text>
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
        </View> */}
        <View style={styles.bookBtnMainContainer}>
          <TouchableOpacity onPress={handleBookPress} style={styles.bookBtnContainer}>
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
    height: verticalScale(118),
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
  timeCircleIcon: {
    tintColor: COLORS.primary,
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
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  dealLeftContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(20),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(10),
    borderWidth: moderateScale(1),
    borderColor: COLORS.primary,
  },
  amenityMainContainer: {
    width: scale(149.01),
    height: verticalScale(52),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    borderColor: COLORS.gainsboro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityIconContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityIcon: {
    height: moderateScale(26),
    width: moderateScale(26),
  },
  amenityTitleDescriptionContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  amenitiesTitle: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12.13),
  },
  amenitiesDescription: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  ratingIcon: {
    height: moderateScale(11.56),
    width: moderateScale(12),
  },
  ratingsText: {
    color: COLORS.primary,
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
  // amenitiesContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   marginTop: verticalScale(10),
  // },
  // amenityContainer: {
  //   alignItems: 'center',
  //   backgroundColor: COLORS.lightBrown,
  //   borderRadius: moderateScale(10),
  //   flexDirection: 'row',
  //   height: verticalScale(35),
  //   justifyContent: 'center',
  //   marginLeft: scale(10),
  //   width: scale(125),
  // },
  // amenityIcon: {
  //   height: moderateScale(23),
  //   marginLeft: scale(15),
  //   width: moderateScale(23),
  // },
  // amenityTitle: {
  //   color: COLORS.achromaticBlack,
  //   fontFamily: FONTS.quicksand,
  //   fontSize: moderateScale(14),
  // },
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
