// import { Categories } from '@components/Categories'
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {Categories} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useRestaurants} from './hooks';
import {RestaurantCard} from './RestaurantCard';

const RestaurantsScreen = () => {
  const {
    isLoading,
    cityData,
    categories,
    selectedIndex,
    filter,
    refreshing,
    onRefresh,
    // categoriesIds,
    restaurantsData,
    onCategoryChange,
    handleLocationPress,
  } = useRestaurants();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={handleLocationPress}
        style={styles.selectedLocation}>
        <Image
          resizeMode="contain"
          source={IMAGES.locationNew}
          style={styles.locationIcon}
        />
        <Text allowFontScaling={false} style={styles.locationFont}>
          {cityData?.CityName}
        </Text>
      </TouchableOpacity>
      <Categories
        categories={categories}
        selectedIndex={selectedIndex}
        onCategoryChange={onCategoryChange}
      />
      {/* <Categories
        categoriesIds={categoriesIds}
        category={filter}
        customCategories={categories}
        onPress={onCategoryChange}
      /> */}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={20} />
        </View>
      ) : (
        <>
          <View style={styles.restaurantsFlatlistContainer}>
            <FlatList
              ListEmptyComponent={
                !isLoading &&
                restaurantsData?.length === 0 && (
                  <View style={styles.listEmptyContainer}>
                    <Text allowFontScaling={false} style={styles.listEmptyText}>
                      No data found.
                    </Text>
                  </View>
                )
              }
              contentContainerStyle={styles.listMain}
              data={restaurantsData}
              getItemLayout={(_, index) => ({
                index,
                length: verticalScale(200),
                offset: verticalScale(200) * index,
              })}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              renderItem={({item, index}) => {
                return <RestaurantCard index={index} item={item} />;
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default RestaurantsScreen;

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
    color: COLORS.newPrimary,
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
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  locationIcon: {
    tintColor: COLORS.newPrimary,
    height: moderateScale(14),
    marginRight: scale(11.2),
    width: moderateScale(18),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  restaurantsFlatlistContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  selectedLocation: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: COLORS.isabelLine,
    backgroundColor: COLORS.lightNewPrimary,
    borderColor: COLORS.lightGray,
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(25),
    width: '90%',
  },
});
