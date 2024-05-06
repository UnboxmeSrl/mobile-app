import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';
import {IMAGES} from '../../../assets';

const FirstScreen = () => {
  return (
    <View>
      <Image
        source={IMAGES.onboarding.loginOnboarding.firstLoginOne}
        style={styles.imageStyle}
        resizeMode={'contain'}
      />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {`Book `}
            <Text
              allowFontScaling={false}
              style={styles.colorChangeText}>{`your Deals `}</Text>
            {`in advance`}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            allowFontScaling={false}
            style={
              styles.descriptionText
            }>{`Only Reel and Tiktok requests will require approvation `}</Text>
        </View>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
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
    width: '100%',
  },
});
