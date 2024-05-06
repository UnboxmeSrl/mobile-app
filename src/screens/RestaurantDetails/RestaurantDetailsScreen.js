import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
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
import {useRestaurantDetails} from './hooks';
import {ServiceCard} from './ServiceCard';

const RestaurantDetails = () => {
  const {
    isLoading,
    services,
    // categoriesIds,
    restaurantDetails,
    // filter,
    isImageLoading,
    setIsImageLoading,
    // serviceCategories,
    // onCategoryChange,
    handleBackPress,
    handleRedirection,
  } = useRestaurantDetails();
  // console.log('Restaurant Details', JSON.stringify(restaurantDetails))

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View>
          {restaurantDetails?.GalleryRestaurant ? (
            <CustomCarousel
              Component={({item, index}) => {
                return (
                  <>
                    {isImageLoading && <View style={styles.imageLoader} />}
                    <FastImage
                      onLoadEnd={() => setIsImageLoading(false)}
                      resizeMode="cover"
                      source={{
                        priority: FastImage.priority.high,
                        uri: item?.url,
                      }}
                      style={[styles.imageStyle]}
                    />
                  </>
                );
              }}
              data={restaurantDetails?.GalleryRestaurant}
            />
          ) : (
            <View style={styles.emptyImages}>
              <Text style={styles.emptyImagesText}>
                Images are not available for this restaurant.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}>
            <Image
              resizeMode="cover"
              source={IMAGES.back}
              style={[
                styles.backIcon,
                !restaurantDetails?.GalleryRestaurant && {
                  tintColor: COLORS.black,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantDetailsContainer}>
          <Text style={styles.restaurantNameText}>
            {restaurantDetails?.Name}
          </Text>
          {restaurantDetails?.Adress && (
            <TouchableOpacity
              onPress={() => handleRedirection(restaurantDetails?.Maps_Link)}>
              <Text style={styles.restaurantAddressText}>
                {restaurantDetails?.Adress}
              </Text>
            </TouchableOpacity>
          )}
          {/* <View style={styles.socialLinksContainer}>
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
          </View> */}
          {!!restaurantDetails?.About && (
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.aboutTitleText}>About</Text>
              <Text style={styles.aboutDescriptionText}>
                {restaurantDetails?.About}
              </Text>
            </View>
          )}

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
        </View>
        <View style={styles.serviceCardsContainer}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={COLORS.newPrimary} size={20} />
            </View>
          ) : (
            <FlatList
              ListEmptyComponent={
                !isLoading &&
                services?.length === 0 && (
                  <View style={styles.listEmptyContainer}>
                    <Text style={styles.listEmptyText}>No data found.</Text>
                  </View>
                )
              }
              data={services}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                const deals = item?.Deal_limit - item?.deal_done;
                return (
                  <ServiceCard
                    index={index}
                    item={item}
                    deals={deals}
                    actionNumId={item?._actions_turbo?.action_num_id}
                    restaurantDetails={restaurantDetails}
                  />
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  serviceCardsContainer: {
    paddingLeft: scale(10),
  },
  loaderContainer: {
    marginTop: '25%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  restaurantAddressText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksand,
    textDecorationLine: 'underline',
    fontSize: moderateScale(12),
    marginTop: verticalScale(10),
  },
  aboutDescriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    marginTop: verticalScale(8),
  },
  aboutTitleContainer: {
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
  emptyImages: {
    height: verticalScale(180),
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  commonStyleSocialLinkText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    marginTop: verticalScale(10),
  },
  imageLoader: {
    position: 'absolute',
    height: verticalScale(180),
    width: '100%',
    backgroundColor: COLORS.lightNewPrimaryA6,
  },
  emptyImagesText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.newPrimary,
    fontSize: moderateScale(12),
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
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
  },
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(100),
    marginLeft: scale(100),
  },
  listEmptyText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    transform: [{rotate: '180deg'}],
    width: scale(25),
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(20),
  },
});

export default RestaurantDetails;
