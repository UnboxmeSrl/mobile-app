import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const PickerModal = React.forwardRef(
  ({handleCameraPress, handleGalleryPress}, ref) => {
    return (
      <RBSheet ref={ref} height={150}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.itemsContainer}
            onPress={handleCameraPress}>
            <Image source={IMAGES.camera} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{`Camera`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemsContainer}
            onPress={handleGalleryPress}>
            <Image source={IMAGES.galleryImage} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{`Gallery`}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  },
);

export default PickerModal;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(25),
    flexDirection: 'row',
  },
  itemsContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginBottom: verticalScale(10),
    tintColor: COLORS.newPrimary,
  },
  textStyle: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.newPrimary,
  },
});
