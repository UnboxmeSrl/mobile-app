// import { Categories } from '@components/Categories'
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {AppButton, BottomSheet, Categories} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useRestaurants} from './hooks';
import {RestaurantCard} from './RestaurantCard';
import AppMap from '../../components/AppMap';

const RestaurantsScreen = () => {
  const {
    isLoading,
    isEndLoading,
    cityData,
    categories,
    selectedIndex,
    filter,
    refreshing,
    onRefresh,
    // categoriesIds,
    handleOnReached,
    restaurantsData,
    onCategoryChange,
    handleLocationPress,
  } = useRestaurants();
  const [view, setView] = useState('tabs');
  const bottomSheetRef = useRef();

  const handleBottomSheet = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.btnStack}>
        <TouchableOpacity
          onPress={view === 'map' ? () => setView('tabs') : handleLocationPress}
          // onPress={() => setView('tabs')}
          style={[
            styles.selectedLocation,
            {borderColor: view === 'tabs' ? 'red' : 'transparent'},
          ]}>
          <Image
            resizeMode="contain"
            source={IMAGES.locationNew}
            style={styles.locationIcon}
          />
          <Text allowFontScaling={false} style={styles.locationFont}>
            {cityData?.CityName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleLocationPress}
          onPress={() => setView('map')}
          // onPress={handleBottomSheet}
          style={[
            styles.selectedLocation,
            {borderColor: view === 'map' ? 'red' : 'transparent'},
          ]}>
          <Image
            resizeMode="contain"
            source={IMAGES.mapIcon}
            style={styles.locationIcon}
          />
          <Text allowFontScaling={false} style={styles.locationFont}>
            Map
          </Text>
        </TouchableOpacity>
      </View>
      {view === 'tabs' && (
        <Categories
          categories={categories}
          selectedIndex={selectedIndex}
          onCategoryChange={onCategoryChange}
        />
      )}
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
          {view === 'map' ? (
            <AppMap />
          ) : (
            <View style={styles.restaurantsFlatlistContainer}>
              <FlatList
                ListEmptyComponent={
                  !isLoading &&
                  restaurantsData?.length === 0 && (
                    <View style={styles.listEmptyContainer}>
                      <Text
                        allowFontScaling={false}
                        style={styles.listEmptyText}>
                        No data found.
                      </Text>
                    </View>
                  )
                }
                contentContainerStyle={styles.listMain}
                data={restaurantsData}
                onEndReached={handleOnReached}
                ListFooterComponent={
                  isEndLoading && (
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator color={COLORS.newPrimary} size={20} />
                    </View>
                  )
                }
                getItemLayout={(_, index) => ({
                  index,
                  length: verticalScale(200),
                  offset: verticalScale(200) * index,
                })}
                keyExtractor={(_, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                }
                renderItem={({item, index}) => {
                  return <RestaurantCard index={index} item={item} />;
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
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
    height: moderateScale(24),
    marginRight: scale(8),
    width: moderateScale(24),
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
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(25),
    // width: '90%',
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  // styling
  btnStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    columnGap: scale(16),
    paddingVertical: verticalScale(10),
  },
  // Bottom Sheet
  restaurentDetails: {
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(16),
  },
  scrollContainer: {
    marginLeft: verticalScale(16),
  },
  imgesStack: {
    flexDirection: 'row',
    columnGap: scale(14),
    justifyContent: 'flex-end',
  },
  restaurentImg: {
    height: moderateScale(74),
    width: moderateScale(114),
    borderRadius: moderateScale(8),
  },
  item: {
    padding: scale(16),
  },
  restaurentName: {
    fontSize: moderateScale(20),
    color: COLORS.black,
  },
  resturantDtl: {
    fontSize: moderateScale(14),
    color: '#838E9A',
    marginTop: verticalScale(4),
  },
  checkBtn: {
    height: moderateScale(50),
    width: '85%',
    alignSelf: 'center',
  },
});
