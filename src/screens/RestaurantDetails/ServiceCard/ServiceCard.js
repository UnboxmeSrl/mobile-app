import React from 'react'
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import perfectSize from '../../../utils/responsiveSize'
import FastImage from 'react-native-fast-image'
import { useServiceCard } from './hooks'

const ServiceCard = ({ item, index, deals }) => {
  const { handleCardPress } = useServiceCard(item)
  return (
    // <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.listItem}>
    //   <ImageBackground resizeMode="cover" source={{ uri: item?.Offer_Cover?.url }} style={styles.itemImage}>
    //     <View style={styles.mainContainer}>
    //       <View style={styles.ratingsContainer}>
    //         <Text style={styles.ratingsText}>+250</Text>
    //         <Image resizeMode="contain" source={IMAGES.ratingStar} style={styles.ratingIcon} />
    //       </View>
    //       {(item?.Influencer || item?.Model) && (
    //         <View style={styles.forModelsContainer}>
    //           <Text style={styles.forModelsText}>
    //             For {item?.Influencer && 'Influencer'}
    //             {item?.Model && ' Models'}
    //           </Text>
    //         </View>
    //       )}
    //     </View>
    //     <View style={styles.nameContainer}>
    //       <Text style={styles.restaurantNameText}>{item?.Offer_Name}</Text>
    //     </View>
    //   </ImageBackground>
    // </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.6} onPress={() => handleCardPress(item)} style={styles.listItem}>
      <View style={styles.imageContainer}>
        <ImageBackground
          imageStyle={styles.actualPicture}
          resizeMode="cover"
          source={{ uri: item?.Offer_Cover?.url }}
          style={styles.imageBgContainer}
        >
          <Image source={IMAGES.overlay} style={styles.itemImage} resizeMode="cover" />
          <View style={styles.dealTimerContainer}>
            <Text style={styles.dealTimeLeftText}>{`${deals} deal left`}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.titleRatingMainRow}>
        <View style={styles.itemTitleIconContainer}>
          <FastImage
            resizeMode="contain"
            source={{ priority: FastImage.priority.high, uri: item?._actions_turbo?.Action_icon?.url }}
            style={styles.socialIcon}
          />
          {/* <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} /> */}
          <Text style={styles.titleText} numberOfLines={2}>
            {item?._actions_turbo?.Action_Name}
          </Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>60</Text>
          <Image source={IMAGES.star} style={styles.ratingIcon} />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>To publish with 24 hours</Text>
      </View>

      <View style={styles.amenitiesMainContainer}>
        <View style={styles.amenitiesContainer}>
          <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
          <Text style={styles.amenityText}>{`${item?._actions_turbo?.Plates} X Meal`}</Text>
        </View>
        <View style={styles.amenitiesContainer}>
          <Image source={IMAGES.clinkingGlasses} style={styles.amenityIcon} />
          <Text style={styles.amenityText}>{`${item?._actions_turbo?.Drinks} X Drinks`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
  amenitiesMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  amenityText: {
    marginLeft: scale(5),
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  amenityIcon: {
    height: moderateScale(22.52),
    width: moderateScale(22.52),
  },
  amenitiesContainer: {
    // width: scale(100),
    paddingHorizontal: perfectSize(10),
    height: moderateScale(34.64),
    backgroundColor: COLORS.cultured,
    borderRadius: moderateScale(58.03),
    // marginLeft: scale(20),
    marginTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
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
  },
  ratingsContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(15),
  },
  socialIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    marginRight: scale(10),
  },
  itemTitleIconContainer: {
    width: '60%',
    alignItems: 'center',
    height: verticalScale(25),
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginLeft: scale(5),
    marginRight: scale(20),
    marginTop: verticalScale(10),
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
    width: perfectSize(300),
    alignSelf: 'center',
    // alignItems: 'center',
    height: moderateScale(292.21),
    borderRadius: moderateScale(20.79),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: perfectSize(20),
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
})
