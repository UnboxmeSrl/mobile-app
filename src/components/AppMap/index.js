// import { Categories } from '@components/Categories'
import Mapbox from '@rnmapbox/maps';
import React, {useRef} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS} from '../../constants';
import {AppInput} from '../Elements';
import {AppButton} from '../Buttons';
import {BottomSheet} from '../BottomSheet';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY2xhcmlzYXBwIiwiYSI6ImNsd3oyNDlpczAybWcycXIyNXp6bXVzbXMifQ.i3dwAgtGLJUvy9Ajw8CFgg',
);
const AppMap = () => {
  const pinCoordinates = [-122.4194, 37.7749];
  const bottomSheetRef = useRef();

  const handleBottomSheet = () => {
    bottomSheetRef?.current?.open();
  };
  return (
    <View style={styles.mapView}>
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera zoomLevel={14} centerCoordinate={pinCoordinates} />
        <Mapbox.PointAnnotation
          id="pin"
          coordinate={pinCoordinates}
          onSelected={handleBottomSheet}
        />
      </Mapbox.MapView>
      <AppInput
        placeholder="Search"
        img={IMAGES.search}
        style={styles.seacrhWrapper}
        inputStyle={styles.searchInput}
      />
      <BottomSheet ref={bottomSheetRef} height={verticalScale(270)}>
        <View style={styles.restaurentDetails}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}>
            <View style={styles.imgesStack}>
              <Image
                source={IMAGES.locationOne}
                alt="Product Image"
                style={styles.restaurentImg}
              />
              <Image
                source={IMAGES.locationOne}
                alt="Product Image"
                style={styles.restaurentImg}
              />
              <Image
                source={IMAGES.locationOne}
                alt="Product Image"
                style={styles.restaurentImg}
              />
              <Image
                source={IMAGES.locationOne}
                alt="Product Image"
                style={styles.restaurentImg}
              />
            </View>
          </ScrollView>
          <View style={styles.item}>
            <Text style={styles.restaurentName}>Hard Rock Cafe</Text>
            <Text style={styles.resturantDtl}>
              Vivamus aliquam nisl eu massa. Vivamus aliquam nisl eu massa.
            </Text>
          </View>
          <AppButton title="Check Details" style={styles.checkBtn} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default AppMap;

const styles = StyleSheet.create({
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
});
