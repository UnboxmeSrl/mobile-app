import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';
import {commonStyle} from '../../../utils';

const FifthOnboarding = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`Climb your path to `}
            <Text style={styles.colorChangeText}>{`Legendary level  `}</Text>
          </Text>
        </View>
      </View>
      <Image
        source={IMAGES.onboarding.onboardingFifth}
        style={styles.imageStyle}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default FifthOnboarding;

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyle.containerPaddingTop,
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
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
    fontSize: moderateScale(30),
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textsMainContainer: {
    marginTop: verticalScale(0),
  },
  imageStyle: {
    marginTop: verticalScale(30),
    height: verticalScale(410),
    width: '100%',
  },
});
