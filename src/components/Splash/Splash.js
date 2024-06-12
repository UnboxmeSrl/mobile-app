import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS} from '../../constants';
import {useSplash} from './hooks';

const Splash = () => {
  const {} = useSplash();
  return (
    <View style={styles.mainContainer}>
      <Image
        source={IMAGES.clarisLogo}
        resizeMode="contain"
        style={styles.clarisLogo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  clarisLogo: {
    height: verticalScale(200),
    width: scale(200),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
