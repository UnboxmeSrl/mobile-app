import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { Categories } from '../../components/Categories'
import { CustomCarousel } from '../../components/CustomCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useRestaurantDetails } from './hooks'
import { ServiceCard } from './ServiceCard'

const RestaurantDetails = () => {
  const {
    services,
    categoriesIds,
    restaurantDetails,
    filter,
    serviceCategories,
    onCategoryChange,
    handleBackPress,
  } = useRestaurantDetails()
  console.log('Restaurant Details', JSON.stringify(restaurantDetails))
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View>
          <CustomCarousel
            Component={({ item, index }) => {
              return (
                <FastImage
                  resizeMode="cover"
                  source={{ priority: FastImage.priority.high, uri: item?.url }}
                  style={styles.imageStyle}
                />
              )
            }}
            data={restaurantDetails?.GalleryRestaurant}
          />
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantDetailsContainer}>
          <Text style={styles.restaurantNameText}>{restaurantDetails?.Name}</Text>
          <View style={styles.socialLinksContainer}>
            <View style={styles.commonSocialLinksContainer}>
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.tiktokNew} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>TikTok</Text>
            </View>
            <View style={styles.commonSocialLinksContainer}>
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.insta} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>Instagram</Text>
            </View>
            <View style={styles.commonSocialLinksContainer}>
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.internet} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>Website</Text>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.aboutTitleText}>About</Text>
            <Text style={styles.aboutDescriptionText}>{restaurantDetails?.About}</Text>
          </View>
          {/* <Text style={styles.infoText}>5 spots are lefts for other influencers this week</Text> */}
          <View style={styles.howItWorksContainer}>
            <Text style={styles.aboutTitleText}>How it works </Text>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
          </View>

          <View style={styles.previewTextContainer}>
            <Text style={styles.previewText}>Preview available timeframes </Text>
          </View>
          <View style={styles.chooseServiceContainer}>
            <Text style={styles.previewText}>Choose Service</Text>
          </View>

          <Categories
            categoriesIds={categoriesIds}
            category={filter}
            customCategories={serviceCategories}
            onPress={onCategoryChange}
          />

          <FlatList
            data={services}
            renderItem={({ item, index }) => {
              return <ServiceCard index={index} item={item} restaurantDetails={restaurantDetails} />
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: 14,
    marginTop: 8,
  },
  aboutTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  backIcon: {
    height: 30,
    left: 20,
    position: 'absolute',
    top: 20,
    width: 30,
  },
  backIconContainer: {
    height: 50,
    position: 'absolute',
    width: 50,
  },
  chooseServiceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginTop: 8,
  },
  commonSocialLinksContainer: {
    alignItems: 'center',
  },
  commonSocialLinksImageContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  commonStyleForIcon: {
    height: 20,
    width: 20,
  },
  commonStyleSocialLinkText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: 12,
    marginTop: 10,
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  imageStyle: {
    height: 200,
    width: '100%',
  },
  infoText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: 14,
    marginTop: 3,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  previewText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  previewTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    marginTop: 8,
  },
  restaurantDetailsContainer: {
    paddingHorizontal: 15,
  },
  restaurantNameText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 20,
    marginTop: 10,
  },
  rightIcon: {
    height: 25,
    marginTop: 10,
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
    width: 25,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})

export default RestaurantDetails
