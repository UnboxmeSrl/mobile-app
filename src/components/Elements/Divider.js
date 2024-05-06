import React from 'react';
import {StyleSheet, View} from 'react-native';
import {perfectSize} from '../../utils';

function Divider({style}) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#00000052',
    marginVertical: perfectSize(6),
  },
});
export default Divider;
