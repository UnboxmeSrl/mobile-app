import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../constants';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {OnboardingCarousel} from '../../../components';
import {useLoginOnboarding} from './hooks';

const LoginOnboarding = () => {
  const {activeIndex, setActiveIndex, carouselItems, handleNextPress} =
    useLoginOnboarding();

  return (
    <View style={styles.mainContainer}>
      <OnboardingCarousel
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        Component={({item}) => {
          return item?.component;
        }}
        data={carouselItems}
      />
      <TouchableOpacity
        onPress={handleNextPress}
        style={styles.btnContainer}
        activeOpacity={0.7}>
        <Text allowFontScaling={false} style={styles.btnText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOnboarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
    paddingTop: verticalScale(30),
  },
  btnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.blackRaw,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  btnContainer: {
    width: '90%',
    height: verticalScale(40),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.newPrimary,
  },
});
