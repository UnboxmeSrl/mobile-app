import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {CustomCarousel} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {checkAction, xanoImageSize} from '../../utils';
import {useServiceDetails} from './hooks';

const ServiceDetails = () => {
  const {
    actionNumId,
    amenityDetails,
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
    handleBackPress,
    handleBookPress,
    influencerCount,
    handleInfluencerPlus,
    handleInfluencerMinus,
  } = useServiceDetails();
  // console.log(
  //   'serviceDetails?.at_offer_description',
  //   typeof serviceDetails?.at_offer_description,
  //   serviceDetails,
  //   // serviceDetails?.at_offer_description,
  //   // serviceDetails?._actions_turbo?.Extra_People,
  //   // serviceDetails,
  // );
  // console.log('Service Details: ' + JSON.stringify(serviceDetails))
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}>
          <Image
            resizeMode="cover"
            source={IMAGES.arrowLeft}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text
            allowFontScaling={false}
            style={styles.headerTitleText}>{`Deals`}</Text>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={30} />
        </View>
      ) : (
        <ScrollView
          style={styles.mainScrollView}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}>
          <View>
            <CustomCarousel
              Component={({item, index}) => {
                const imageUrl = `${item?.url}?tpl=${xanoImageSize}.jpg`;
                return (
                  <>
                    {isImageLoading && <View style={styles.imageLoader} />}
                    <FastImage
                      onLoadEnd={() => setIsImageLoading(false)}
                      resizeMode="cover"
                      source={{
                        priority: FastImage.priority.high,
                        uri: imageUrl,
                      }}
                      style={styles.imageStyle}
                    />
                  </>
                );
              }}
              data={[serviceDetails?.Offer_Cover]}
            />
          </View>

          <View style={styles.titleRatingMainRow}>
            <View style={styles.itemTitleIconContainer}>
              <FastImage
                resizeMode="contain"
                source={{
                  priority: FastImage.priority.high,
                  uri: serviceDetails?._actions_turbo?.Action_icon?.url,
                }}
                style={styles.socialIcon}
              />
              {/* <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} /> */}
              <Text
                allowFontScaling={false}
                style={
                  styles.titleText
                }>{`${serviceDetails?._actions_turbo?.Action_Name}`}</Text>
            </View>
            <View style={styles.dealLeftContainer}>
              <Text
                allowFontScaling={false}
                style={styles.dealLeftText}>{`${dealsLeft}`}</Text>
            </View>
          </View>

          {actionNumId === 7 ||
          actionNumId === 8 ||
          actionNumId === 53 ||
          actionNumId === 9 ||
          actionNumId === 10 ||
          actionNumId === 14 ||
          actionNumId === 15 ||
          actionNumId === 16 ||
          actionNumId === 17 ? (
            <View style={styles.specialAmenity}>
              <>
                <View
                  style={[
                    styles.amenityIconContainer,
                    styles.firstAmenityMainContainer,
                    styles.specialAmenitiesIconContainer,
                  ]}>
                  <Image
                    source={amenityDetails?.amenityIcon}
                    style={styles.amenityBigIcon}
                  />
                </View>
                <View
                  style={[
                    styles.amenityMainContainer,
                    styles.specialAmenitiesMainContainer,
                  ]}>
                  <View style={styles.amenityTitleDescriptionContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.amenitiesTitle}>
                      {amenityDetails?.amenityName}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.amenitiesDescription}>
                      {amenityDetails?.amenityDescription}
                    </Text>
                  </View>
                </View>
              </>
            </View>
          ) : (
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.amenityMainContainer,
                  styles.firstAmenityMainContainer,
                ]}>
                <View style={styles.amenityIconContainer}>
                  <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
                </View>
                <View style={styles.amenityTitleDescriptionContainer}>
                  <Text
                    allowFontScaling={false}
                    style={
                      styles.amenitiesTitle
                    }>{`${serviceDetails?._actions_turbo?.Plates} X Meals`}</Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.amenitiesDescription}>
                    at your choice
                  </Text>
                </View>
              </View>
              <View style={styles.amenityMainContainer}>
                <View style={styles.amenityIconContainer}>
                  <Image
                    source={IMAGES.clinkingGlasses}
                    style={styles.amenityIcon}
                  />
                </View>
                <View style={styles.amenityTitleDescriptionContainer}>
                  <Text
                    allowFontScaling={false}
                    style={
                      styles.amenitiesTitle
                    }>{`${serviceDetails?._actions_turbo?.Drinks} X Drinks`}</Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.amenitiesDescription}>
                    at your choice
                  </Text>
                </View>
              </View>

              {serviceDetails?._actions_turbo?.Extra_People > 0 && (
                <View
                  style={[
                    styles.amenityMainContainer,
                    styles.friendAmenityContainer,
                  ]}>
                  <View style={styles.amenityTitleDescriptionContainer}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.amenitiesTitle,
                        styles.friendAmenityText,
                      ]}>{`+${serviceDetails?._actions_turbo?.Extra_People}`}</Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.amenitiesDescription,
                        styles.friendAmenityTitle,
                      ]}>
                      Friend
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          )}

          <View style={styles.divider} />
          {!serviceDetails?.at_offer_description === 'undefined' &&
            serviceDetails?.at_offer_description && (
              <>
                <View style={styles.beautyDescriptionContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.beautyDescription}>
                    {serviceDetails?.at_offer_description || ''}
                  </Text>
                </View>
                <View style={[styles.divider, {marginTop: 0}]} />
              </>
            )}

          {actionNumId === 9 ? (
            <>
              <View style={styles.villaDescriptionContainer}>
                <Text
                  allowFontScaling={false}
                  style={
                    styles.villaDescription
                  }>{`${serviceDetails?.Description}`}</Text>
              </View>
              <View style={styles.villaActionsMainContainer}>
                <FlatList
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  data={serviceDetails?._actions_turbo?.actions_turbo_id}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.villaActionContainer}>
                        <View style={styles.villaActionIconContainer}>
                          <FastImage
                            resizeMode="contain"
                            source={{
                              priority: FastImage.priority.high,
                              uri: item?.Action_icon?.url,
                            }}
                            style={styles.villaActionIcon}
                          />
                        </View>
                        <View
                          style={styles.villaActionNameDescriptionContainer}>
                          <View style={styles.socialMediaTitleContainer}>
                            <Text
                              allowFontScaling={false}
                              style={
                                styles.socialMediaTitle
                              }>{`${item?.Action_Name}`}</Text>
                            <View style={styles.ratingsContainer}>
                              <Text
                                allowFontScaling={false}
                                style={styles.ratingsText}>
                                {serviceDetails?.Credits}
                              </Text>
                              <Image
                                source={IMAGES.star}
                                style={styles.ratingIcon}
                              />
                            </View>
                          </View>
                          <View style={styles.socialMediaDescriptionContainer}>
                            <Text
                              allowFontScaling={false}
                              style={
                                styles.socialMediaDescriptionText
                              }>{`${item?.Descrizione}`}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={styles.comingWithInfluencerTextContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.comingWithInfluencerText}>
                  Coming with an influencer friend?
                </Text>
              </View>

              <View style={styles.influencerFriendAddContainer}>
                <TouchableOpacity
                  onPress={handleInfluencerMinus}
                  disabled={influencerCount <= 1}>
                  <Image
                    source={
                      influencerCount > 1
                        ? IMAGES.minusEnabled
                        : IMAGES.minusDisabled
                    }
                    style={styles.plusMinusIcon}
                  />
                </TouchableOpacity>
                <Text
                  allowFontScaling={false}
                  style={
                    styles.influencerText
                  }>{`${influencerCount} Influencer`}</Text>
                <TouchableOpacity onPress={handleInfluencerPlus}>
                  <Image
                    source={IMAGES.plusEnabled}
                    style={styles.plusMinusIcon}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.contentRequiredRow}>
                <View style={styles.contentRequiredContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.contentRequiredText}>
                    Content required
                  </Text>
                </View>
                <View style={styles.deadlineContainer}>
                  <Image
                    source={IMAGES.timeCircle}
                    style={styles.timeCircleIcon}
                  />
                  <Text
                    allowFontScaling={false}
                    style={
                      styles.deadlineText
                    }>{`Deadline: ${serviceDetails?._actions_turbo?.Days_deadline} Days`}</Text>
                </View>
              </View>
              {actionNumId === 3 && (
                <View style={styles.WhatIsDiaryContainer}>
                  <Text allowFontScaling={false} style={styles.whatIsDiaryText}>
                    What is a Diary?
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.whatIsDiaryAnswer}>
                    A “Diary” is a video where the experience at the venue is
                    inserted in a daily vlog or a compilation video with similar
                    content, instead of a fully dedicated Reel/Tiktok, like “a
                    day in my life” or “best places I visited in Bali”
                  </Text>
                </View>
              )}
              <View
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                // style={{flex: 1}}
                style={styles.flatlistContainer}>
                <FlatList
                  data={[serviceDetails]}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item, index}) => {
                    const actionNumId = item?._actions_turbo?.action_num_id;
                    // const diaryItems = ['TikTok Diary', 'Instagram Diary']
                    const actions = checkAction(actionNumId, socialActions);
                    // console.log('icon', icon, actionNumId)
                    return (
                      <View>
                        {actionNumId === 3 ? (
                          diaryItems?.map((diaryItem, innerIndex) => (
                            <View key={innerIndex}>
                              <View style={styles.mainSocialItemContainer}>
                                <View style={styles.socialMediaImageContainer}>
                                  <FastImage
                                    resizeMode="contain"
                                    source={{
                                      priority: FastImage.priority.high,
                                      uri: item?._actions_turbo?.Action_icon
                                        ?.url,
                                    }}
                                    style={styles.socialMediaImage}
                                  />
                                </View>
                                <View
                                  style={
                                    styles.socialMediaTitleDescriptionContainer
                                  }>
                                  <View
                                    style={styles.socialMediaTitleContainer}>
                                    <Text
                                      allowFontScaling={false}
                                      style={styles.socialMediaTitle}>
                                      {diaryItem?.action}
                                    </Text>
                                    <View style={styles.ratingsContainer}>
                                      <Text
                                        allowFontScaling={false}
                                        style={styles.ratingsText}>
                                        {item?.Credits}
                                      </Text>
                                      <Image
                                        source={IMAGES.star}
                                        style={styles.ratingIcon}
                                      />
                                    </View>
                                  </View>
                                  <View
                                    style={
                                      styles.socialMediaDescriptionContainer
                                    }>
                                    <Text
                                      allowFontScaling={false}
                                      style={styles.socialMediaDescriptionText}>
                                      {`${item?._actions_turbo?.Descrizione}`}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {innerIndex === 0 && (
                                <View style={styles.orContainer}>
                                  <View style={styles.orDivider} />
                                  <Text
                                    allowFontScaling={false}
                                    style={styles.orText}>
                                    Or
                                  </Text>
                                  <View style={styles.orDivider} />
                                </View>
                              )}
                            </View>
                          ))
                        ) : actionNumId === 6 ? (
                          actions?.duo_actions?.map((innerItem, innerIndex) => (
                            <View key={innerIndex}>
                              <View
                                style={styles.mainSocialItemContainer}
                                key={innerIndex}>
                                <View style={styles.socialMediaImageContainer}>
                                  <FastImage
                                    resizeMode="contain"
                                    source={{
                                      priority: FastImage.priority.high,
                                      uri: innerItem?.Action_icon?.url,
                                    }}
                                    style={styles.socialMediaImage}
                                  />
                                </View>
                                <View
                                  style={
                                    styles.socialMediaTitleDescriptionContainer
                                  }>
                                  <View
                                    style={styles.socialMediaTitleContainer}>
                                    <Text
                                      allowFontScaling={false}
                                      style={styles.socialMediaTitle}>
                                      {innerItem?.Action_Name}
                                    </Text>
                                    <View style={styles.ratingsContainer}>
                                      <Text
                                        allowFontScaling={false}
                                        style={styles.ratingsText}>
                                        {item?.Credits}
                                      </Text>
                                      <Image
                                        source={IMAGES.star}
                                        style={styles.ratingIcon}
                                      />
                                    </View>
                                  </View>
                                  <View
                                    style={
                                      styles.socialMediaDescriptionContainer
                                    }>
                                    <Text
                                      allowFontScaling={false}
                                      style={styles.socialMediaDescriptionText}>
                                      {`${innerItem?.Descrizione}`}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {innerIndex === 0 && (
                                <View style={styles.orContainer}>
                                  <View style={styles.orDivider} />
                                  <Text
                                    allowFontScaling={false}
                                    style={styles.orText}>
                                    Or
                                  </Text>
                                  <View style={styles.orDivider} />
                                </View>
                              )}
                            </View>
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
                            </View>
                            <View
                              style={
                                styles.socialMediaTitleDescriptionContainer
                              }>
                              <View style={styles.socialMediaTitleContainer}>
                                <Text
                                  allowFontScaling={false}
                                  style={styles.socialMediaTitle}>
                                  {item?._actions_turbo?.Action_Name} video
                                </Text>
                                <View style={styles.ratingsContainer}>
                                  <Text
                                    allowFontScaling={false}
                                    style={styles.ratingsText}>
                                    {item?.Credits}
                                  </Text>
                                  <Image
                                    source={IMAGES.star}
                                    style={styles.ratingIcon}
                                  />
                                </View>
                              </View>
                              <View
                                style={styles.socialMediaDescriptionContainer}>
                                <Text
                                  allowFontScaling={false}
                                  style={styles.socialMediaDescriptionText}>
                                  {`${item?._actions_turbo?.Descrizione}`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              </View>
            </>
          )}

          {/* <TouchableOpacity style={styles.howItWorksContainer}>
            <Text allowFontScaling={false}  style={styles.socialMediaTitleText}>How it works </Text>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity> */}

          <View style={styles.bookBtnMainContainer}>
            <TouchableOpacity
              onPress={handleBookPress}
              style={styles.bookBtnContainer}
              disabled={isBookBtnPressed}>
              {isBookBtnPressed ? (
                <ActivityIndicator size={30} color={COLORS.black22} />
              ) : (
                <Text allowFontScaling={false} style={styles.bookBtnText}>
                  Book Now
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  beautyDescription: {
    color: COLORS.davyGrey,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  beautyDescriptionContainer: {
    // alignSelf: 'center',
    paddingHorizontal: scale(40),
    marginBottom: verticalScale(20),
    marginVertical: verticalScale(-10),
    // marginTop: verticalScale(-10),
  },
  whatIsDiaryAnswer: {
    color: COLORS.davyGrey,
    textAlign: 'justify',
    lineHeight: verticalScale(20),
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(15),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  whatIsDiaryText: {
    color: COLORS.blackRaw,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },
  WhatIsDiaryContainer: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainScrollView: {
    flex: 1,
  },
  villaDescription: {
    color: COLORS.davyGrey,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(15),
  },
  villaDescriptionContainer: {
    alignSelf: 'center',
    width: '85%',
    marginBottom: verticalScale(10),
  },
  villaActionsMainContainer: {
    backgroundColor: COLORS.lightNewPrimary40,
    alignSelf: 'center',
    width: '90%',
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    borderColor: COLORS.newPrimary,
    paddingBottom: verticalScale(10),
    marginVertical: verticalScale(20),
  },
  villaActionContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  villaActionIconContainer: {
    marginTop: verticalScale(10),
  },
  villaActionIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  villaActionNameDescriptionContainer: {
    width: '85%',
    marginLeft: scale(20),
    justifyContent: 'center',
  },
  comingWithInfluencerTextContainer: {
    alignSelf: 'center',
  },
  comingWithInfluencerText: {
    color: COLORS.davyGrey,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  influencerFriendAddContainer: {
    height: verticalScale(55),
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
    borderRadius: moderateScale(18),
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  influencerText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
  },
  plusMinusIcon: {
    height: moderateScale(28),
    width: moderateScale(28),
  },
  specialAmenity: {
    flexDirection: 'row',
  },
  specialAmenitiesMainContainer: {
    marginLeft: scale(5),
  },
  specialAmenitiesIconContainer: {
    marginTop: verticalScale(10),
  },
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
  friendAmenityText: {
    textAlign: 'center',
  },
  friendAmenityContainer: {
    // width: scale(80),
    justifyContent: 'center',
    marginRight: scale(30),
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
    minHeight: verticalScale(80),
    width: '90%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(16),
    marginTop: verticalScale(24),
    paddingVertical: verticalScale(8),
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
  dealLeftText: {
    // backgroundColor: 'black',
    textAlign: 'center',
    ...Platform.select({
      android: {
        marginTop: verticalScale(-2.5),
      },
    }),
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
    // borderWidth: moderateScale(1),
    marginTop: verticalScale(10),
    // marginLeft: scale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(5),
    // borderColor: COLORS.gainsboro,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
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
  amenityBigIcon: {
    height: moderateScale(48),
    width: moderateScale(48),
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
    marginLeft: scale(10),
  },
  ratingsText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  ratingsContainer: {
    width: '20%',
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
    transform: [{rotate: '180deg'}],
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
  backIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  backIconContainer: {
    alignItems: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '53%',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },
  headerTitleContainer: {
    marginTop: verticalScale(-5),
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
});

export default ServiceDetails;
