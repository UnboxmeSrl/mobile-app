import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {COLORS, FONTS, SCREEN_NAMES} from '../../constants';
import {setCity} from '../../redux/slices';
import {useNavigation} from '@react-navigation/native';

const LocationsTile = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleBtnPress = () => {
    dispatch(setCity(item));
    navigation.replace(SCREEN_NAMES.Restaurants, {cityData: item});
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        imageStyle={styles.imageStyle}
        resizeMode="cover"
        source={{uri: item?.City?.url}}
        style={styles.imageContainerStyle}>
        <TouchableOpacity onPress={handleBtnPress} style={styles.btnContainer}>
          <Text
            allowFontScaling={false}
            style={styles.btnText}>{`${item?.CityName}`}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LocationsTile;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    height: verticalScale(32),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    width: scale(270),
  },
  btnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.black,
    fontSize: moderateScale(12),
  },
  imageContainerStyle: {
    borderRadius: moderateScale(20),
    height: verticalScale(200),
    justifyContent: 'flex-end',
    width: '100%',
  },
  imageStyle: {
    borderRadius: moderateScale(20),
  },
  mainContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(16),
    width: '100%',
  },
});
