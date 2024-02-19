import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

import { useRestaurantCard } from './hooks'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const RestaurantCard = ({ item, index }) => {
  const { handleCardPress } = useRestaurantCard()

  return (
    <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.listItem}>
      <ImageBackground resizeMode="cover" source={{ uri: item?.Cover?.url }} style={styles.itemImage}>
        <View style={styles.mainContainer}>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsText}>+250</Text>
            <Image resizeMode="contain" source={IMAGES.ratingStar} style={styles.ratingIcon} />
          </View>
          {(item?.Influencer || item?.Model) && (
            <View style={styles.forModelsContainer}>
              <Text style={styles.forModelsText}>
                For {item?.Influencer && 'Influencer'}
                {item?.Model && ' Models'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.nameLocationContainer}>
          <Text style={styles.restaurantNameText}>{item?.Name}</Text>
          <Text style={styles.distanceText}>{item?.distance} from here</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({
  distanceText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  forModelsContainer: {
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(20),
    marginRight: scale(5),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(3),
  },
  forModelsText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  itemImage: {
    borderRadius: moderateScale(20),
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  listItem: {
    height: verticalScale(200),
    marginBottom: verticalScale(15),
  },
  mainContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
  },
  nameLocationContainer: {
    bottom: moderateScale(20),
    left: moderateScale(10),
    position: 'absolute',
  },
  ratingIcon: {
    height: moderateScale(12),
    marginLeft: scale(2),
    width: moderateScale(12),
  },
  ratingsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    marginRight: scale(10),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(13),
    paddingVertical: verticalScale(3),
  },
  ratingsText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  restaurantNameText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(15),
  },
})
