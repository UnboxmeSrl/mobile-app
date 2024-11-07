import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {OnboardingCarousel} from '../../components';
import {COLORS, FONTS, SCREEN_NAMES} from '../../constants';
import {selectOnBordingData} from '../../redux';
import {useOnboarding} from './hooks';

const OnboardingNew = () => {
  const {activeIndex, setActiveIndex, carouselItems, handleNextPress} =
    useOnboarding();
  const navigation = useNavigation();
  const isOnBoarding = useSelector(selectOnBordingData);

  useEffect(() => {
    if (isOnBoarding) {
      navigation.navigate(SCREEN_NAMES.SignUpNew);
    }
  }, [isOnBoarding, navigation]);

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
        onPress={() => handleNextPress()}
        style={styles.btnContainer}
        activeOpacity={0.7}>
        <Text allowFontScaling={false} style={styles.btnText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingNew;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
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
