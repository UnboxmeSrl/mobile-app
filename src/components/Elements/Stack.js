import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants';
import {perfectSize} from '../../utils';

const Stack = ({style, children}) => {
  return <View style={[styles.stack, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  stack: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: perfectSize(16),
    paddingHorizontal: perfectSize(24),
  },
});

export default Stack;
