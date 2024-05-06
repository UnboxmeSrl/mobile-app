import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../../constants';

const CustomTitle = ({title}) => {
  return (
    <View style={styles.titleContainer}>
      <Text allowFontScaling={false} style={styles.titleText}>
        {title}
      </Text>
    </View>
  );
};

export default CustomTitle;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: scale(24),
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    color: COLORS.achromaticBlack,
  },
});
