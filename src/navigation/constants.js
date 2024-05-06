import React from 'react';
import {STACK_NAMES} from '../constants';

export const DEFAULT_SCREEN_NAME = STACK_NAMES.BottomStack;

export const COMMON_STATUS_BAR = {
  backgroundColor: 'transparent',
  translucent: true,
};

export const LIGHT_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'light-content',
};

export const DARK_STATUS_BAR = {
  ...COMMON_STATUS_BAR,
  barStyle: 'dark-content',
};

// export const screenOptions = ({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName
//     if (route.name === SCREEN_NAMES.Home) {
//       iconName = focused ? 'home' : 'home-outline'
//     } else if (route.name === SCREEN_NAMES.Awards) {
//       iconName = focused ? 'trophy' : 'trophy-outline'
//     } else {
//       iconName = focused ? 'person' : 'person-outline'
//     }

//     return <Ionicons color={color} name={iconName} size={size} />
//   },
// })

// export const tabBarOptions = {
//   activeTintColor: COLORS.primary,
//   inactiveTintColor: 'gray',
// }
