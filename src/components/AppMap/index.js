// import { Categories } from '@components/Categories'
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
  selectAllNearbyRestaurants,
  selecteUserCoords,
  setSelectedResCoordinates,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY2xhcmlzYXBwIiwiYSI6ImNsd3oyNDlpczAybWcycXIyNXp6bXVzbXMifQ.i3dwAgtGLJUvy9Ajw8CFgg',
);
// const pinCoordinates = [115.19891456614, -8.4095211510833];
const AppMap = () => {
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const [selectedRest, setSelectedRest] = useState(null);
  const {handleCardPress} = useRestaurantCard();

  const {requestLocationPermission, cityData} = useRestaurants();
  const {handleGetNearerHotels} = useMap();
  // const allNearerRestaurant = useSelector(selectAllNearbyRestaurantsS);
  const allNearerRestaurant = useSelector(selectAllNearbyRestaurants);
  const selectedResCoordinates = useSelector(
    state => state.restaurantSlice.selectedResCoordinates,
  );
  const userLocation = useSelector(selecteUserCoords);
  // const {restaurantsData, setRestaurantsData} = useRestaurants();
  const handleBottomSheet = useCallback(async rest => {
    const prepData = {
      category_id: 0,
      restaurant_id: rest?.id,
    };
    const res = await getRestaurantDetails(prepData);
    if (res?.restaurant) {
      setSelectedRest(res?.restaurant);
      bottomSheetRef?.current?.open();
    }
  }, []);
  console.log(
    'restaurantsData',
    allNearerRestaurant.length,
    selectedResCoordinates,
  );

  const cameraCoords = useMemo(
    () => selectedResCoordinates || userLocation,
    [userLocation, selectedResCoordinates],
  );
  const getCurrentCoordinates = useCallback(async () => {
    if (cameraCoords) {
      const res = await handleGetNearerHotels({
        location: {
          type: 'point',
          data: {lng: cameraCoords[0], lat: cameraCoords[1]},
        },
      });
    }
  }, [handleGetNearerHotels, cameraCoords]);

  useEffect(() => {
    getCurrentCoordinates();
  }, [getCurrentCoordinates]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);
  // useEffect(() => {
  //   handleGetNearerHotels();
  // }, [pinCoordinates, handleGetNearerHotels]);
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
            {allNearerRestaurant?.map((rest, index) => {
              console.log('location ', rest.Name);
              if (rest?.location) {
                const coordinate = [
                  rest?.location.data.lng,
                  rest?.location.data.lat,
                ];
                return (
                  <Mapbox.MarkerView key={index} coordinate={coordinate}>
                    <Pressable
                      style={{alignItedfddsms: 'center'}}
                      onPress={() => {
                        handleBottomSheet(rest);
                      }}>
                      <View style={{width: 30, height: 30}}>
                        <Icon
                          name="location"
                          size={30}
                          style={{position: 'absolute', top: 0, left: -1}}
                          color={'red'}
                        />
                      </View>
                      {/* <Text
                        style={{
                          marginTop: 10,
                          color: 'red',
                          fontSize: 12,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          backgroundColor: 'black',
                          padding: 2,
                          paddingHorizontal: 4,
                        }}>
                        {rest?.Name}
                      </Text> */}
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
            console.log('onPressRestaurant', rest);
            if (rest?.location) {
              dispatch(
                setSelectedResCoordinates([
                  rest?.location?.data?.lng,
                  rest?.location?.data?.lat,
                ]),
              );
              // handleBottomSheet(rest);
            }
            // setSelectedResCoordinates([
            //   rest.location?.data?.lat,
            //   rest.location?.data?.lng,
            // ]);
          }}
        />

        <BottomSheet ref={bottomSheetRef} height={verticalScale(270)}>
          <View style={styles.restaurentDetails}>
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
              <Text style={styles.restaurentName}>{selectedRest?.Name}</Text>

              <Text style={styles.resturantDtl}>
                {selectedRest?.About || 'No details available'}
              </Text>
            </View>
            <AppButton
              title="Check Details"
              style={styles.checkBtn}
              onPress={() => handleCardPress(selectedRest)}
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
