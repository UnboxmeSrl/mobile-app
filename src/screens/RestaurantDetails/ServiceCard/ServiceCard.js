import React, {useCallback, useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {useServiceCard} from './hooks';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';
import {perfectSize, xanoImageSize} from '../../../utils';

const ServiceCard = ({
  item,
  index,
  deals,
  actionNumId,
  isScrolling,
  setIsScrolling,
}) => {
  // console.log(
  //   'item_ServiceCard',
  //   item?._actions_turbo?.Plates,
  //   item?._actions_turbo?.Drinks,
  //   item?._actions_turbo?.Dessert,
  //   item?._actions_turbo?.Side,
  //   // item?._actions_turbo,
  // );

  const getIcons = useCallback(serviceName => {
    const serviceNameKey = serviceName?.replace(' ', '');
    // console.log('serviceName.trim()', serviceNameKey || '');
    return IMAGES[serviceNameKey];
  }, []);
  // const getIcons = useCallback(serviceName => {
  //   if (serviceName === 'Plates') return IMAGES.mealDish;
  //   else if (serviceName === 'Drinks') return IMAGES.clinkingGlasses;
  //   else if (serviceName === 'Side') return IMAGES.side;
  //   else if (serviceName === 'Dessert') return IMAGES.dessert;
  // }, []);

  const {handleCardPress} = useServiceCard(item);
  let amenityDetails = {};

  if (
    actionNumId === 7 ||
    actionNumId === 10 ||
    actionNumId === 14 ||
    actionNumId === 15 ||
    actionNumId === 16 ||
    actionNumId === 17
  ) {
    amenityDetails = {
      amenityName: `${item?._actions_turbo?.Beauty} X Treatment`,
      amenityIcon: IMAGES.beauty,
      // amenityDescription: 'at your choice',
    };
  } else if (actionNumId === 8 || actionNumId === 53) {
    amenityDetails = {
      amenityName: `${item?._actions_turbo?.Gym} X Pass`,
      amenityIcon: IMAGES.gym,
      // amenityDescription: 'at your choice',
    };
  } else if (actionNumId === 9) {
    amenityDetails = {
      amenityName: `${item?._actions_turbo?.Accomodation} x Days (${
        item?._actions_turbo?.Accomodation - 1
      } nights)`,
      amenityIcon: IMAGES.resort,
      // amenityDescription: 'at your choice',
    };
  }
  // console.log('actionNumId_ServiceCard', actionNumId, amenityDetails);

  return (
    <TouchableOpacity
      style={styles.listItem}
      activeOpacity={0.6}
      onPress={() => {
        // console.log(
        //   'item?._offers_turbo?.isBigInfluencer',
        //   // item?.isBigInfluencer,
        //   // item?.services,
        //   // item?._actions_turbo?.Plates,
        //   // item?._actions_turbo?.Drinks,
        //   item?.id,
        //   // bookingDetails?._offers_turbo?.isBigInfluencer,
        // );
        handleCardPress(item);
      }}>
      <View style={styles.imageContainer}>
        <ImageBackground
          imageStyle={styles.actualPicture}
          resizeMode="cover"
          source={{uri: `${item?.Offer_Cover?.url}?tpl=${xanoImageSize}.jpg`}}
          style={styles.imageBgContainer}>
          <Image
            source={IMAGES.overlay}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.dealTimerContainer}>
            <Text
              allowFontScaling={false}
              style={styles.dealTimeLeftText}>{`${deals} deal left`}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.titleRatingMainRow}>
        <View style={styles.itemTitleIconContainer}>
          <FastImage
            resizeMode="contain"
            source={{
              priority: FastImage.priority.high,
              uri: item?._actions_turbo?.Action_icon?.url,
            }}
            style={styles.socialIcon}
          />
          {/* <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} /> */}
          <Text
            allowFontScaling={false}
            style={styles.titleText}
            numberOfLines={2}>
            {item?._actions_turbo?.Action_Name}
          </Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text allowFontScaling={false} style={styles.ratingsText}>
            {item?.Credits}
          </Text>
          <Image source={IMAGES.star} style={styles.ratingIcon} />
        </View>
      </View>
      <View
        style={{
          // width: '100%',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: scale(8),
          gap: 8,
          paddingVertical: 8,
          marginBottom: verticalScale(4),
          // backgroundColor: 'red',
        }}>
        {actionNumId === 7 ||
        actionNumId === 8 ||
        actionNumId === 53 ||
        actionNumId === 10 ||
        actionNumId === 14 ||
        actionNumId === 15 ||
        actionNumId === 16 ||
        actionNumId === 17 ? (
          <>
            <View
              style={[
                styles.amenityMainContainer,
                styles.specialAmenitiesMainContainer,
              ]}>
              <Image
                source={amenityDetails?.amenityIcon}
                style={styles.amenityBigIcon}
              />
              <View style={styles.amenityTitleDescriptionContainer}>
                <Text allowFontScaling={false} style={styles.amenitiesTitle}>
                  {amenityDetails?.amenityName}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            {item?.isBigInfluencer && item?.services?.length > 0 ? (
              item?.services?.map(subServices => {
                console.log(
                  'serviceName.trim()',
                  subServices.name?.replace(' ', '') || '',
                );
                if (
                  subServices?.quantity > 0 &&
                  (subServices?.name === 'Plates' ||
                    subServices?.name === 'Drinks' ||
                    subServices?.name === 'Side' ||
                    subServices?.name === 'Dessert')
                ) {
                  return (
                    <View
                      style={[
                        styles.amenityMainContainer,
                        styles.firstAmenityMainContainer,
                      ]}>
                      <View style={styles.amenityIconContainer}>
                        {getIcons(subServices?.name) && (
                          <Image
                            source={getIcons(subServices?.name)}
                            style={styles.amenityIcon}
                          />
                        )}
                      </View>
                      <View style={styles.amenityTitleDescriptionContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.amenitiesTitle}>
                          {subServices?.quantity} x{' '}
                          {subServices?.name === 'Plates'
                            ? 'meals'
                            : subServices?.name}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })
            ) : (
              <>
                {item?._actions_turbo?.Plates > 0 && (
                  <View style={styles.amenityMainContainer}>
                    <View style={styles.amenityIconContainer}>
                      <Image
                        source={IMAGES.mealDish}
                        style={styles.amenityIcon}
                      />
                    </View>
                    <View style={styles.amenityTitleDescriptionContainer}>
                      <Text
                        allowFontScaling={false}
                        style={styles.amenitiesTitle}>
                        {item?._actions_turbo?.Plates} x Meals
                      </Text>
                    </View>
                  </View>
                )}
                {item?._actions_turbo?.Drinks > 0 && (
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
                        style={styles.amenitiesTitle}>
                        {item?._actions_turbo?.Drinks} x Drinks
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  specialAmenity: {
    flexDirection: 'row',
    // marginLeft: scale(5),
    backgroundColor: 'yellow',
  },
  specialAmenitiesMainContainer: {
    // marginLeft: scale(5),
    // marginTop: verticalScale(10),
  },
  specialAmenitiesIconContainer: {
    marginTop: verticalScale(10),
  },
  firstAmenityMainContainer: {
    // marginLeft: scale(10),
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
  amenityMainContainer: {
    // alignSelf: 'center',
    width: scale(90),
    height: verticalScale(30),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    // borderWidth: moderateScale(1),
    // marginLeft: scale(10),
    paddingHorizontal: scale(5),
    // marginHorizontal: scale(5),
    // borderColor: COLORS.gainsboro,
    // justifyContent: 'center',
    justifyContent: 'center',
    gap: scale(6),
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
  },
  amenityIconContainer: {
    // marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  amenityIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  amenityBigIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  amenityTitleDescriptionContainer: {
    // width: '60%',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  amenitiesTitle: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(9),
  },
  amenitiesDescription: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(11),
  },

  // amenitiesMainContainer: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-evenly',
  // },

  // amenityText: {
  //   marginLeft: scale(5),
  //   color: COLORS.greyFont,
  //   fontFamily: FONTS.quicksandMedium,
  //   fontSize: moderateScale(12),
  // },
  // amenityIcon: {
  //   height: moderateScale(22.52),
  //   width: moderateScale(22.52),
  // },
  // amenitiesContainer: {
  //   // width: scale(100),
  //   paddingHorizontal: perfectSize(10),
  //   height: moderateScale(34.64),
  //   backgroundColor: COLORS.cultured,
  //   borderRadius: moderateScale(58.03),
  //   // marginLeft: scale(20),
  //   marginTop: verticalScale(10),
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  // },
  descriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  descriptionContainer: {
    marginLeft: scale(20),
    marginTop: verticalScale(10),
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
    marginRight: scale(5),
  },
  ratingsContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    // marginTop: verticalScale(10),
  },
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  socialIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    marginRight: scale(10),
  },
  itemTitleIconContainer: {
    width: '60%',
    alignItems: 'center',
    height: verticalScale(35),
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginLeft: scale(5),
    marginRight: scale(20),
    // marginTop: verticalScale(10),
  },
  titleRatingMainRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: verticalScale(5),
    justifyContent: 'space-evenly',
  },
  actualPicture: {
    borderRadius: moderateScale(25.3),
  },
  imageBgContainer: {
    width: '98%',
    height: moderateScale(146.78),
    alignItems: 'flex-end',
  },
  imageContainer: {
    width: '95%',
    height: moderateScale(146.78),
    marginTop: verticalScale(10),
    marginLeft: '3%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: moderateScale(0.3),
    shadowRadius: moderateScale(4),
    elevation: moderateScale(5),
    width: perfectSize(260),
    alignSelf: 'center',
    // alignItems: 'center',
    // height: moderateScale(265),
    borderRadius: moderateScale(20.79),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: perfectSize(10),
  },
  itemImage: {
    position: 'absolute',
    borderRadius: moderateScale(25.3),
    height: moderateScale(146.78),
    right: scale(5),
    overflow: 'hidden',
    width: '98%',
  },
  dealTimerContainer: {
    width: scale(73),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginRight: scale(20),
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(3),
  },
  dealTimeLeftText: {
    textAlign: 'center',
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    ...Platform.select({
      android: {
        marginTop: verticalScale(-2.5),
      },
    }),
  },
});
