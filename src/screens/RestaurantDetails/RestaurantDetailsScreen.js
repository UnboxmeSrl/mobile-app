import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../assets/images'
import { Categories } from '../../components/Categories'
import { CustomCarousel } from '../../components/CustomCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { ServiceCard } from './ServiceCard'
import { useRestaurantDetails } from './hooks'

const RestaurantDetails = () => {
  const {
    services,
    categoriesIds,
    restaurantDetails,
    filter,
    isImageLoading,
    setIsImageLoading,
    serviceCategories,
    onCategoryChange,
    handleBackPress,
    handleRedirection,
  } = useRestaurantDetails()
  console.log('Restaurant Details', JSON.stringify(restaurantDetails))

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View>
          {restaurantDetails?.GalleryRestaurant ? (
            <CustomCarousel
              Component={({ item, index }) => {
                return (
                  <>
                    {isImageLoading && <View style={styles.imageLoader} />}
                    <FastImage
                      resizeMode="cover"
                      source={{ priority: FastImage.priority.high, uri: item?.url }}
                      style={[styles.imageStyle]}
                      onLoadEnd={() => setIsImageLoading(false)}
                    />
                  </>
                )
              }}
              data={restaurantDetails?.GalleryRestaurant}
            />
          ) : (
            <View style={styles.emptyImages}>
              <Text style={styles.emptyImagesText}>Images are not available for this restaurant.</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image
              resizeMode="cover"
              source={IMAGES.back}
              style={[styles.backIcon, !restaurantDetails?.GalleryRestaurant && { tintColor: COLORS.black }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantDetailsContainer}>
          <Text style={styles.restaurantNameText}>{restaurantDetails?.Name}</Text>
          <View style={styles.socialLinksContainer}>
            <TouchableOpacity
              onPress={() => handleRedirection(restaurantDetails?.Tiktok)}
              style={styles.commonSocialLinksContainer}
            >
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.tiktokNew} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>TikTok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRedirection(restaurantDetails?.Instagram)}
              style={styles.commonSocialLinksContainer}
            >
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.insta} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRedirection(restaurantDetails?.Maps_Link)}
              style={styles.commonSocialLinksContainer}
            >
              <View style={styles.commonSocialLinksImageContainer}>
                <Image resizeMode="contain" source={IMAGES.internet} style={styles.commonStyleForIcon} />
              </View>
              <Text style={styles.commonStyleSocialLinkText}>Website</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.aboutTitleContainer}>
            <Text style={styles.aboutTitleText}>About</Text>
            <Text style={styles.aboutDescriptionText}>{restaurantDetails?.About}</Text>
          </View>
          {/* <Text style={styles.infoText}>5 spots are lefts for other influencers this week</Text> */}
          {/* <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.aboutTitleText}>How it works </Text>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>

          <View style={styles.previewTextContainer}>
            <Text style={styles.previewText}>Preview available timeframes </Text>
          </View> */}
          <View style={styles.chooseServiceContainer}>
            <Text style={styles.previewText}>Choose Service</Text>
          </View>

          {/* <Categories
            categoriesIds={categoriesIds}
            category={filter}
            customCategories={serviceCategories}
            onPress={onCategoryChange}
          /> */}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ServiceCard index={index} item={item} restaurantDetails={restaurantDetails} />
            }}
            ListEmptyComponent={
              <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyText}>No data found.</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  aboutTitleContainer: {
    marginTop: verticalScale(8),
  },
  imageLoader: {
    position: 'absolute',
    height: verticalScale(180),
    width: '100%',
    backgroundColor: COLORS.lightPink,
  },
  emptyImages: {
    height: verticalScale(180),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  emptyImagesText: {
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
    color: COLORS.primary,
  },
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    marginTop: verticalScale(8),
  },
  aboutTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  backIcon: {
    height: verticalScale(30),
    left: scale(15),
    position: 'absolute',
    top: verticalScale(20),
    width: scale(30),
  },
  backIconContainer: {
    height: moderateScale(50),
    position: 'absolute',
    width: moderateScale(50),
  },
  chooseServiceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    marginTop: verticalScale(8),
  },
  commonSocialLinksContainer: {
    alignItems: 'center',
  },
  commonSocialLinksImageContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: moderateScale(25),
    height: moderateScale(50),
    justifyContent: 'center',
    width: moderateScale(50),
  },
  commonStyleForIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  commonStyleSocialLinkText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    marginTop: verticalScale(10),
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(48),
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },
  imageStyle: {
    height: verticalScale(180),
    width: '100%',
  },
  infoText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: getStatusBarHeight(),
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
    height: verticalScale(48),
    marginTop: verticalScale(8),
  },
  restaurantDetailsContainer: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  restaurantNameText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    marginTop: verticalScale(10),
  },
  rightIcon: {
    height: verticalScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
    width: scale(25),
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(20),
  },
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  listEmptyText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
})

export default RestaurantDetails
