import React from 'react';
import {StyleSheet, View} from 'react-native';

const HStack = ({style, children}) => {
  return <View style={[styles.hStack, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  hStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default HStack;
