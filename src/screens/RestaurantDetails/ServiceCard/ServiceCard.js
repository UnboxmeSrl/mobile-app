import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { useServiceCard } from './hooks'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

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

    <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.listItem} activeOpacity={0.6}>
      <View style={styles.imageContainer}>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: item?.Offer_Cover?.url }}
          style={styles.imageBgContainer}
          imageStyle={styles.actualPicture}
        >
          <View style={styles.dealTimerContainer}>
            <Text style={styles.dealTimeLeftText}>1 deal left</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.titleRatingMainRow}>
        <View style={styles.itemTitleIconContainer}>
          <Image resizeMode="contain" source={IMAGES.storyIcon} style={styles.socialIcon} />
          <Text style={styles.titleText}>Story Combo</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>60</Text>
          <Image source={IMAGES.star} style={styles.ratingIcon} />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>To publish with 24 hours</Text>
      </View>

      <View style={styles.amenitiesContainer}>
        <Image source={IMAGES.mealDish} style={styles.amenityIcon} />
        <Text style={styles.amenityText}>1 X Meal</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
  amenityText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
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
    marginLeft: scale(20),
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
    marginLeft: scale(20),
    marginRight: scale(20),
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
    marginLeft: scale(20),
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
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    shadowOpacity: moderateScale(0.3),
    shadowRadius: moderateScale(4),
    elevation: moderateScale(5),
    width: '75%',
    alignSelf: 'center',
    // alignItems: 'center',
    height: moderateScale(292.21),
    borderRadius: moderateScale(20.79),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: scale(10),
  },
  itemImage: {
    borderRadius: moderateScale(20),
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  dealTimerContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginRight: scale(20),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(3),
  },
  dealTimeLeftText: {
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
})
