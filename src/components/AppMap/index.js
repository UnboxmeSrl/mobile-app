// import { Categories } from '@components/Categories'
import Mapbox from '@rnmapbox/maps';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {AppInput} from '../Elements';
import {AppButton} from '../Buttons';
import {BottomSheet} from '../BottomSheet';
import {useRestaurants} from '../../screens/Restaurants/hooks';
import {getRestaurantDetails, navigate} from '../../services';
import {colors, perfectSize, xanoImageSize} from '../../utils';
import {useRestaurantCard} from '../../screens/Restaurants/RestaurantCard/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {CustomTextInput} from '../Custom';
import useMap from './useMap';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY2xhcmlzYXBwIiwiYSI6ImNsd3oyNDlpczAybWcycXIyNXp6bXVzbXMifQ.i3dwAgtGLJUvy9Ajw8CFgg',
);
const AppMap = () => {
  const pinCoordinates = [-8.400539, 115.209049];
  const bottomSheetRef = useRef();
  const [selectedRest, setSelectedRest] = useState(null);
  const {restaurantsData} = useRestaurants();
  const {handleCardPress} = useRestaurantCard();
  const [view, setView] = useState('tabs');
  const {handleLocationPress, cityData} = useRestaurants();
  const {search, setSearch, handleGetNearerHotels} = useMap();
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
  console.log('restaurantsData', restaurantsData);
  // const getCurrentCoordinates = useCallback(async () => {
  //   const res = handleGetNearerHotels(pinCoordinates);
  // }, [pinCoordinates, handleGetNearerHotels]);

  // useEffect(() => {
  //   getCurrentCoordinates();
  // }, [getCurrentCoordinates]);
  useEffect(() => {
    handleGetNearerHotels({
      location: {
        type: 'point',
        data: {lng: pinCoordinates[1], lat: pinCoordinates[0]},
      },
    });
  }, [pinCoordinates, handleGetNearerHotels]);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mapView}>
        <Mapbox.MapView
          style={styles.map}
          attributionControl={false}
          attributionEnabled={false}
          logoEnabled={false}>
          <Mapbox.Camera zoomLevel={14} centerCoordinate={pinCoordinates} />
          <>
            <Mapbox.MarkerView
              // key={index}
              // id="pointAnnotation"
              // id={`pin-${index}`}
              coordinate={pinCoordinates}
              style={{backgroundColor: 'yellow'}}>
              <View style={{width: 30, height: 30}}>
                <Icon
                  name="location"
                  // type="ionicons"
                  size={30}
                  style={{position: 'absolute', top: 0, left: -1}}
                  color={'red'}
                />
              </View>
            </Mapbox.MarkerView>
            {restaurantsData?.map((rest, index) => {
              console.log;
              if (rest?.Latitude && rest?.Longitude) {
                const coordinate = [rest?.Latitude, rest?.Longitude];
                return (
                  <Mapbox.MarkerView
                    key={index}
                    // id="pointAnnotation"
                    // id={`pin-${index}`}
                    coordinate={coordinate}
                    // onSelected={() => {
                    //   handleBottomSheet(rest);
                    // }}
                  >
                    <Pressable
                      style={{alignItems: 'center'}}
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
                      <Text
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
                      </Text>
                    </Pressable>
                  </Mapbox.MarkerView>
                );
              }
            })}
          </>
        </Mapbox.MapView>
        <CustomTextInput
          style={{position: 'absolute', backgroundColor: 'white'}}
          placeholder={'Search'}
          value={search}
          isRemoveTextIconVisible={true}
          handleOnChangeText={setSearch}
        />

        {/* <AppInput
        placeholder="Search"
        img={IMAGES.search}
        style={styles.seacrhWrapper}
        inputStyle={styles.searchInput}
      /> */}
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
