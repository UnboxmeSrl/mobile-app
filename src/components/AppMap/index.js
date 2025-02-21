/* eslint-disable react-native/no-inline-styles */
import Mapbox from '@rnmapbox/maps';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';
import {useRestaurantCard} from '../../screens/Restaurants/RestaurantCard/hooks';
import {useRestaurants} from '../../screens/Restaurants/hooks';
import {getRestaurantDetails} from '../../services';
import {xanoImageSize} from '../../utils';
import {BottomSheet} from '../BottomSheet';
import {AppButton} from '../Buttons';
import RestaurantSearchInput from './RestaurantSearchInput';
import useMap from './useMap';
import {
  selectAllRestaurants,
  selecteUserCoords,
  setSelectedResCoordinates,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY2xhcmlzYXBwIiwiYSI6ImNsd3oyNDlpczAybWcycXIyNXp6bXVzbXMifQ.i3dwAgtGLJUvy9Ajw8CFgg',
);
const AppMap = () => {
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const [selectedRest, setSelectedRest] = useState(null);
  const {handleCardPress} = useRestaurantCard();

  const {requestLocationPermission, cityData} = useRestaurants();
  const {handleGetNearerRestaurants, handleGetAllRestaurants} = useMap();
  const allRestaurants = useSelector(selectAllRestaurants);
  const loginData = useSelector(state => state.authSlice.loginData);
  const [showFullText, setShowFullText] = useState(false);
  const selectedResCoordinates = useSelector(
    state => state.restaurantSlice.selectedResCoordinates,
  );
  const userLocation = useSelector(selecteUserCoords);

  const handleBottomSheet = useCallback(async rest => {
    const prepData = {
      category_id: 0,
      restaurant_id: rest?.id,
      user_id: loginData?.id,
    };
    const res = await getRestaurantDetails(prepData);
    if (res?.restaurant) {
      setSelectedRest(res?.restaurant);
      bottomSheetRef?.current?.open();
    }
  }, []);

  const cameraCoords = useMemo(
    () => selectedResCoordinates || userLocation,
    [userLocation, selectedResCoordinates],
  );

  // useEffect(() => {
  //   console.log('check_requestLocationPermission');
  //   requestLocationPermission();
  // }, [requestLocationPermission]);

  const getAllRestaurantsHandler = useCallback(async () => {
    await handleGetAllRestaurants();
  }, [handleGetAllRestaurants]);

  useFocusEffect(
    useCallback(() => {
      getAllRestaurantsHandler();
    }, [getAllRestaurantsHandler]),
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mapView}>
        <Mapbox.MapView
          style={styles.map}
          attributionControl={false}
          attributionEnabled={false}
          scaleBarEnabled={false}
          logoEnabled={false}>
          {!!cameraCoords && (
            <Mapbox.Camera zoomLevel={14} centerCoordinate={cameraCoords} />
          )}
          <>
            {allRestaurants?.map((rest, index) => {
              if (rest?.location) {
                const coordinate = [
                  rest?.location.data.lng,
                  rest?.location.data.lat,
                ];
                return (
                  <Mapbox.MarkerView key={index} coordinate={coordinate}>
                    <Pressable
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        handleBottomSheet(rest);
                      }}>
                      <View
                        style={{
                          width: moderateScale(40),
                          height: moderateScale(40),
                        }}>
                        <Icon
                          name="location"
                          size={moderateScale(40)}
                          style={{position: 'absolute', top: 0, left: -1}}
                          color={'red'}
                        />
                      </View>
                    </Pressable>
                  </Mapbox.MarkerView>
                );
              }
            })}
          </>
          {selectedResCoordinates !== null && (
            <View style={styles.leftBttnsView}>
              <View style={styles.locateWrapper}>
                <Icon
                  onPress={() => dispatch(setSelectedResCoordinates(null))}
                  name="locate"
                  color={'rgba(0, 0, 0, 0.45)'}
                  size={20}
                />
              </View>
            </View>
          )}
        </Mapbox.MapView>

        <RestaurantSearchInput
          onPressRestaurant={rest => {
            if (rest?.location) {
              dispatch(
                setSelectedResCoordinates([
                  rest?.location?.data?.lng,
                  rest?.location?.data?.lat,
                ]),
              );
            }
          }}
        />

        <BottomSheet ref={bottomSheetRef} height={verticalScale(270)}>
          <View style={styles.restaurentDetails}>
            <ScrollView style={{flex: 1}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}>
                <View style={styles.imgesStack}>
                  {selectedRest?.GalleryRestaurant.map((img, index) => {
                    const imageUrl = `${img?.url}?tpl=${xanoImageSize}.jpg`;
                    return (
                      <Image
                        key={index}
                        source={{uri: imageUrl}}
                        alt="Product Image"
                        style={styles.restaurentImg}
                      />
                    );
                  })}
                </View>
              </ScrollView>
              <View style={styles.item}>
                <Text allowFontScaling={false} style={styles.restaurentName}>
                  {selectedRest?.Name}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.resturantDtl}
                  onPress={() => setShowFullText(x => !x)}
                  numberOfLines={showFullText ? undefined : 2}
                  ellipsizeMode={
                    (selectedRest?.About?.length || 0) > 100
                      ? 'tail'
                      : undefined
                  }>
                  {selectedRest?.About || 'No details available'}
                </Text>
              </View>
            </ScrollView>
            <AppButton
              title="Check Details"
              style={styles.checkBtn}
              onPress={() => {
                handleCardPress(selectedRest);
                bottomSheetRef?.current?.close();
              }}
            />
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default AppMap;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locateWrapper: {
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 36,
    height: 36,
  },
  leftBttnsView: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    zIndex: 1,
  },
  seacrhWrapper: {
    position: 'absolute',
    bottom: verticalScale(5),
    left: scale(12),
    right: scale(12),
    width: 'auto',
    flex: 1,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    height: verticalScale(50),
  },
  // Bottom Sheet
  restaurentDetails: {
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(16),
    flex: 1,
  },
  scrollContainer: {
    marginLeft: verticalScale(16),
    flex: 1,
  },
  imgesStack: {
    flexDirection: 'row',
    columnGap: scale(14),
    justifyContent: 'flex-end',
    paddingRight: verticalScale(16),
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
  btnStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    columnGap: scale(16),
    paddingVertical: verticalScale(10),
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
  locationIcon: {
    tintColor: COLORS.newPrimary,
    height: moderateScale(24),
    marginRight: scale(8),
    width: moderateScale(24),
  },
  locationFont: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
});
