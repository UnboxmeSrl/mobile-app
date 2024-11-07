import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants';

function AppText({style, children, ...rest}) {
  return (
    <Text allowFontScaling={false} style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.achromaticBlack,
  },
});
export default AppText;
