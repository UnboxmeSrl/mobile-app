import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

import { useServiceCard } from './hooks'
import perfectSize from '../../../utils/responsiveSize'

const ServiceCard = ({ item, index }) => {
  const { handleCardPress } = useServiceCard()
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

    <View style={styles.mainItemContainer}>
      <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.listItem} activeOpacity={0.6}>
        <View style={styles.imageContainer}>
          <ImageBackground
            resizeMode="cover"
            source={{ uri: item?.Offer_Cover?.url }}
            style={styles.imageBgContainer}
            imageStyle={styles.actualPicture}
          >
            <Image source={IMAGES.overlay} style={styles.itemImage} resizeMode="cover" />
            <View style={styles.dealTimerContainer}>
              <Text style={styles.dealTimeLeftText}>{`${item?.deal_left} deal left`}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.titleRatingMainRow}>
          <View style={styles.itemTitleIconContainer}>
            <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} />
            <Text style={styles.titleText}>{item?._actions_turbo?.Action_Name}</Text>
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
    </View>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
  amenitiesMainContainer: {
    flexDirection: 'row',
  },
  mainItemContainer: {
    flex: 1,
    marginRight: scale(20),
  },
  amenityText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.interSemiBold,
    fontSize: moderateScale(12),
  },
  amenityIcon: {
    height: moderateScale(22.52),
    width: moderateScale(22.52),
  },
  amenitiesContainer: {
    width: scale(100),
    height: moderateScale(34.64),
    backgroundColor: COLORS.cultured,
    borderRadius: moderateScale(58.03),
    marginLeft: scale(10),
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
    marginTop: verticalScale(10),
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
    marginHorizontal: scale(20),
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
    color: COLORS.primary,
    fontFamily: FONTS.interBold,
    fontSize: moderateScale(12),
  },
})
