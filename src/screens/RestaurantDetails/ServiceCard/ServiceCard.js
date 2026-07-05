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
import {useServiceCard} from './hooks';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';
import {
  checkAction,
  getActionIconSource,
  getPerkIconSource,
  perfectSize,
  xanoImageSize,
} from '../../../utils';

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

  // const getIcons = useCallback(serviceName => {
  //   if (serviceName === 'Plates') return IMAGES.mealDish;
  //   else if (serviceName === 'Drinks') return IMAGES.clinkingGlasses;
  //   else if (serviceName === 'Side') return IMAGES.side;
  //   else if (serviceName === 'Dessert') return IMAGES.dessert;
  // }, []);

  const {handleCardPress} = useServiceCard(item);
  const fallbackAction = useMemo(() => checkAction(actionNumId), [actionNumId]);
  const actionIconUrl = item?._actions_turbo?.Action_icon?.url;
  const actionIconSource = useMemo(
    () =>
      getActionIconSource(item?._actions_turbo?.action) ||
      (actionIconUrl ? {uri: actionIconUrl} : undefined) ||
      fallbackAction?.action_icon,
    [actionIconUrl, fallbackAction?.action_icon, item?._actions_turbo?.action],
  );

  const amenityDetailsWithCoupons = useMemo(() => {
    const list = [];
    if ([7, 10, 14, 15, 16, 17, 8, 53, 54, 9].includes(actionNumId)) {
      // Primary amenities
      if ([7, 10, 14, 15, 16, 17].includes(actionNumId)) {
        if (item?._actions_turbo?.Beauty) {
          list.push({
            amenityName: `${item._actions_turbo.Beauty} X Treatment`,
            amenityIcon: IMAGES.beauty,
          });
        }
      }

      if ([8, 53, 54].includes(actionNumId)) {
        if (item?._actions_turbo?.Gym) {
          list.push({
            amenityName: `${item._actions_turbo.Gym} X Pass`,
            amenityIcon: IMAGES.gym,
          });
        }
      }

      if (actionNumId === 9 && item?._actions_turbo?.Accomodation) {
        const days = item._actions_turbo.Accomodation;
        list.push({
          amenityName: `${days} x Days (${days - 1} nights)`,
          amenityIcon: IMAGES.resort,
        });
      }

      // Other services
      item?._actions_turbo?.Coupons_Services?.forEach(service => {
        if (service?.quantity > 0) {
          list.push({
            amenityName: `${service.quantity} X ${service.name}`,
            amenityIcon: getPerkIconSource(service),
          });
        }
      });
      return list;
    } else {
      [];
    }
  }, [actionNumId, item]);

  // if (item?._actions_turbo?.Beauty > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${item?._actions_turbo?.Beauty} X Treatment`,
  //     amenityIcon: IMAGES.beauty,
  //     // amenityDescription: 'at your choice',
  //   };
  // } else if (item?._actions_turbo?.Gym > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${item?._actions_turbo?.Gym} X Pass`,
  //     amenityIcon: IMAGES.gym,
  //     // amenityDescription: 'at your choice',
  //   };
  // } else if (item?._actions_turbo?.Accomodation > 0) {
  //   amenityDetailsWithCoupons = {
  //     amenityName: `${item?._actions_turbo?.Accomodation} x Days (${
  //       item?._actions_turbo?.Accomodation - 1
  //     } nights)`,
  //     amenityIcon: IMAGES.resort,
  //     // amenityDescription: 'at your choice',
  //   };
  // }
  // console.log(
  //   amenityDetailsWithCoupons,
  //   'amenityDetailsWithCoupons_ServiceCard',
  // );

  const getServicesWithCoupons = useMemo(() => {
    const serviceMap = [
      // {key: 'Accomodation', label: 'Accomodation'},
      // {key: 'Gym', label: 'Gym'},
      // {key: 'Beauty', label: 'Beauty'},
      {key: 'Plates', label: 'Plates'},
      {key: 'Drinks', label: 'Drinks'},
    ];
    let specialServices = [];
    if (item?.isBigInfluencer && item?.services?.length > 0) {
      specialServices = [...item?.services];
    } else {
      serviceMap.forEach(({key, label}) => {
        const quantity = item?._actions_turbo?.[key];
        if (quantity) {
          specialServices.push({name: label, quantity: Number(quantity)});
        }
      });
    }
    console.log(
      specialServices,
      item.isBigInfluencer,
      item.services,
      'specialServices_useMemo',
    );
    return [
      ...specialServices,
      ...(item?._actions_turbo?.Coupons_Services ?? []),
    ];
  }, [item?._actions_turbo, item.isBigInfluencer, item.services]);

  // const getServicesWithCoupons = useMemo(
  //   () =>
  //     item?._actions_turbo?.Coupons_Services?.length > 0
  //       ? item?._actions_turbo?.Coupons_Services
  //       : item?.services?.length > 0
  //       ? item?.services
  //       : [],
  //   [item?._actions_turbo?.Coupons_Services, item?.services],
  // );
  const getIcons = useCallback(service => getPerkIconSource(service), []);

  console.log(
    'item_actionsTurbo',
    // !!item?._actions_turbo?.Beauty,
    // !!item?._actions_turbo?.Accomodation,
    // !!item?._actions_turbo?.Gym,
    // item?.isBigInfluencer,
    item?.services,
    item?._actions_turbo,
    item?.services?.length > 0,
    'getServicesWithCoupons',
    getServicesWithCoupons,
  );

  // console.log('actionNumId_ServiceCard', actionNumId, amenityDetailsWithCoupons);

  return (
    <TouchableOpacity
      style={[styles.listItem, item?.isVenueDeal && styles.venueDealListItem]}
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
          {actionIconSource && (
            <Image
              resizeMode="contain"
              source={actionIconSource}
              style={styles.socialIcon}
            />
          )}
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
          {!item?.isVenueDeal && (
            <Image source={IMAGES.star} style={styles.ratingIcon} />
          )}
        </View>
      </View>
      <View style={styles.amenityContainer}>
        {amenityDetailsWithCoupons?.length > 0 ? (
          amenityDetailsWithCoupons?.map((amenity, ind) => {
            console.log('0', amenity);
            return (
              <View
                key={amenity?.amenityName}
                style={[
                  styles.amenityMainContainer,
                  styles.specialAmenitiesMainContainer,
                ]}>
                {amenity?.amenityIcon && (
                  <Image
                    source={amenity?.amenityIcon}
                    style={styles.amenityBigIcon}
                  />
                )}
                <View style={styles.amenityTitleDescriptionContainer}>
                  <Text allowFontScaling={false} style={styles.amenitiesTitle}>
                    {amenity?.amenityName}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <>
            {((item?.isBigInfluencer && item?.services?.length > 0) ||
              getServicesWithCoupons.length > 0) &&
              getServicesWithCoupons?.map((subServices, ind) => {
                const iconSource = getIcons(subServices);
                console.log(
                  'serviceName.trim()',
                  subServices.name?.replace(' ', '') || '',
                );
                if (subServices?.quantity > 0) {
                  return (
                    <View
                      key={subServices?.name}
                      style={[
                        styles.amenityMainContainer,
                        styles.firstAmenityMainContainer,
                      ]}>
                      <View style={styles.amenityIconContainer}>
                        {iconSource && (
                          <Image
                            source={iconSource}
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
              })}
            {/* ) : (
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
            )} */}
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
    width: scale(107),
    height: verticalScale(35),
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    // borderWidth: moderateScale(1),
    // marginLeft: scale(10),
    paddingHorizontal: scale(5),
    // marginHorizontal: scale(5),
    // borderColor: COLORS.gainsboro,
    // justifyContent: 'center',
    // justifyContent: 'center',
    paddingLeft: perfectSize(12),
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
  amenityContainer: {
    // width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(8),
    gap: 8,
    paddingVertical: 8,
    marginBottom: verticalScale(4),
    // backgroundColor: 'red',
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
  venueDealListItem: {
    borderColor: '#D7A82F',
    borderWidth: moderateScale(2),
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
