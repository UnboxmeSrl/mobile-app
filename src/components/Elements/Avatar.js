import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {perfectSize} from '../../utils';

const Avatar = ({img, style}) => {
  return (
    <View style={[styles.avatar, style]}>
      <Image source={img} alt="user image" style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: perfectSize(91),
    width: perfectSize(91),
    borderRadius: perfectSize(15),
    backgroundColor: '#DBC0DD',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});

export default Avatar;
