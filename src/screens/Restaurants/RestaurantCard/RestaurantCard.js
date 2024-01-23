import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

import { useRestaurantCard } from './hooks'

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
    fontSize: 12,
  },
  forModelsContainer: {
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: 20,
    marginRight: 5,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  forModelsText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
  },
  itemImage: {
    borderRadius: 20,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  listItem: {
    height: 226,
    marginBottom: 20,
  },
  mainContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
  },
  nameLocationContainer: {
    bottom: 20,
    left: 10,
    position: 'absolute',
  },
  ratingIcon: {
    height: 12,
    marginLeft: 2,
    width: 12,
  },
  ratingsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  ratingsText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: 12,
  },
  restaurantNameText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: 15,
  },
})
