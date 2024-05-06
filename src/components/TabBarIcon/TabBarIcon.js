import React from 'react';
import {Image} from 'react-native';
import {COLORS} from '../../constants';

const TabBarIcon = ({focused, icon}) => {
  // const iconName = focused ? activeIcon : icon
  const color = focused ? COLORS.newPrimary : COLORS.gray;

  return (
    <Image
      resizeMode="contain"
      source={icon}
      style={{height: 24, tintColor: color, width: 24}}
    />
  );
};

export default TabBarIcon;
