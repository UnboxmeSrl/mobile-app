import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Categories } from '@components/Categories'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useRestaurants } from './hooks'
import { RestaurantCard } from './RestaurantCard'

const RestaurantsScreen = () => {
  const {
    cityData,
    categories,
    filter,
    setFilter,
    categoriesIds,
    category,
    restaurantsData,
    onCategoryChange,
  } = useRestaurants()

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.selectedLocation}>
        <Image resizeMode="contain" source={IMAGES.location} style={styles.locationIcon} />
        <Text style={styles.locationFont}>{cityData?.CityName}</Text>
      </TouchableOpacity>
      <Categories
        categoriesIds={categoriesIds}
        category={filter}
        customCategories={categories}
        onPress={onCategoryChange}
      />
      <View style={styles.restaurantsFlatlistContainer}>
        <FlatList
          contentContainerStyle={styles.listMain}
          data={restaurantsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <RestaurantCard index={index} item={item} />
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
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
  locationFont: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  locationIcon: {
    height: 18,
    marginRight: 10,
    width: 18,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  restaurantsFlatlistContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectedLocation: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 3,
  },
})
