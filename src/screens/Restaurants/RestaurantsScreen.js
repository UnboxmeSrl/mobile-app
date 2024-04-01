import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Categories } from '@components/Categories'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { geolocationSetting } from '../../utils/smallComponents'

import { useRestaurants } from './hooks'
import { RestaurantCard } from './RestaurantCard'
import { getDistance } from 'geolib'

const RestaurantsScreen = () => {
  const {
    isLoading,
    cityData,
    categories,
    filter,
    userLocation,
    refreshing,
    onRefresh,
    categoriesIds,
    restaurantsData,
    onCategoryChange,
    handleLocationPress,
  } = useRestaurants()

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleLocationPress} style={styles.selectedLocation}>
        <Image resizeMode="contain" source={IMAGES.locationNew} style={styles.locationIcon} />
        <Text style={styles.locationFont}>{cityData?.CityName}</Text>
      </TouchableOpacity>
      <Categories
        categoriesIds={categoriesIds}
        category={filter}
        customCategories={categories}
        onPress={onCategoryChange}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size={20} />
        </View>
      ) : (
        <>
          <View style={styles.restaurantsFlatlistContainer}>
            <FlatList
              getItemLayout={(_, index) => ({
                length: verticalScale(200),
                offset: verticalScale(200) * index,
                index,
              })}
              ListEmptyComponent={
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.listEmptyText}>No data found.</Text>
                </View>
              }
              contentContainerStyle={styles.listMain}
              data={restaurantsData}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
              renderItem={({ item, index }) => {
                return <RestaurantCard index={index} item={item} />
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  itemImage: {
    borderRadius: moderateScale(20),
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60%',
  },
  listEmptyText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  listItem: {
    height: verticalScale(226),
    marginBottom: verticalScale(20),
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  locationFont: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  locationIcon: {
    height: moderateScale(14),
    marginRight: scale(11.2),
    width: moderateScale(18),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  restaurantsFlatlistContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  selectedLocation: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.isabelLine,
    borderColor: COLORS.lightGray,
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(25),
    width: '90%',
  },
})
