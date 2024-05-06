import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';
import {IMAGES} from '../../../assets';

const SecondScreen = () => {
  return (
    <View>
      <Image
        source={IMAGES.onboarding.loginOnboarding.firstLoginSecond}
        style={styles.imageStyle}
        resizeMode={'contain'}
      />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`Show the `}
            <Text style={styles.colorChangeText}>{`coupon `}</Text>
            {`at the venue`}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {`Show your coupon to the staff, to unlock the `}
            <Text style={styles.boldedText}>{`free service`}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
    width: '85%',
    alignSelf: 'center',
  },
  colorChangeText: {
    color: COLORS.newPrimary,
  },
  boldedText: {
    fontFamily: FONTS.quicksandBold,
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
    height: verticalScale(370),
    width: '100%',
  },
});
