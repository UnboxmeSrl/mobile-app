import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';
import {IMAGES} from '../../../assets';

const ThirdScreen = () => {
  return (
    <View>
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {`Publish your content `}
            <Text
              allowFontScaling={false}
              style={styles.colorChangeText}>{`by the deadline  `}</Text>
          </Text>
        </View>
      </View>
      <Image
        source={IMAGES.onboarding.loginOnboarding.firstLoginThird}
        style={styles.imageStyle}
        resizeMode={'contain'}
      />
      <View style={styles.belowDescriptionContainer}>
        <Text allowFontScaling={false} style={styles.belowDescriptionText}>
          {`Respecting the `}
          <Text allowFontScaling={false} style={styles.colorChangeText}>
            {`deadline `}
          </Text>
          {`will increase your points and make you `}
          <Text allowFontScaling={false} style={styles.colorChangeText}>
            {`more desirable `}
          </Text>
          {`for top venues `}
        </Text>
      </View>
    </View>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  colorChangeText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(32),
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textsMainContainer: {
    marginTop: verticalScale(0),
  },
  imageStyle: {
    height: verticalScale(370),
    width: '98%',
    alignSelf: 'center',
  },
  boldedText: {
    fontFamily: FONTS.quicksandBold,
  },
  belowDescriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  belowDescriptionContainer: {
    marginBottom: verticalScale(15),
    width: '85%',
    alignSelf: 'center',
  },
});
