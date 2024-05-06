import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';

const CommonHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}>
        <Image
          resizeMode="cover"
          source={IMAGES.arrowLeft}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>{title}</Text>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  progressText: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.newPrimary,
    fontSize: moderateScale(14),
  },
  backIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  backIconContainer: {
    alignItems: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '53%',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },
  headerTitleContainer: {
    marginTop: verticalScale(-5),
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
});
