import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {perfectSize} from '../../utils';

const Avatar = ({img, style}) => {
  return (
    <View style={[styles.avatar, style]}>
      <FastImage
        source={img}
        alt="user image"
        style={styles.img}
        resizeMode="cover"
      />
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
