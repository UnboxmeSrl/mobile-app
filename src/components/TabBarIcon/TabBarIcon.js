import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {moderateScale} from 'react-native-size-matters';

const TabBarIcon = ({focused, icon}) => {
  // const iconName = focused ? activeIcon : icon
  const color = focused ? COLORS.newPrimary : COLORS.gray;
  const styles = StyleSheet.create({
    iconStyle: {
      height: moderateScale(24),
      tintColor: color,
      width: moderateScale(24),
    },
  });

  return <Image resizeMode="contain" source={icon} style={styles.iconStyle} />;
};

export default TabBarIcon;
