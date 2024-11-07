import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';
import {IMAGES} from '../../../assets';

const FourthOnboarding = () => {
  return (
    <View>
      <Image
        source={IMAGES.onboarding.onboardingHotels}
        style={styles.imageStyle}
        resizeMode={'cover'}
      />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {`Design an incredible adventure with `}
            <Text
              allowFontScaling={false}
              style={styles.colorChangeText}>{`influencer villas`}</Text>
            {` and `}
            <Text
              allowFontScaling={false}
              style={styles.colorChangeText}>{`hotels`}</Text>
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            allowFontScaling={false}
            style={
              styles.descriptionText
            }>{`Design your entire holiday with Claris and become an acknowledged travel influencer `}</Text>
        </View>
      </View>
    </View>
  );
};

export default FourthOnboarding;

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  descriptionContainer: {
    marginTop: verticalScale(5),
    width: '85%',
    alignSelf: 'center',
  },
  colorChangeText: {
    color: COLORS.newPrimary,
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(26),
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textsMainContainer: {
    marginTop: verticalScale(-15),
  },
  imageStyle: {
    height: verticalScale(410),
    width: '100%',
  },
});
