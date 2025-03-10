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

export const TIKTOK_URL_REGEX =
  /^(https?:\/\/)?(www\.)?tiktok\.com\/(@[a-zA-Z0-9_.]+)\/?$|^@[a-zA-Z0-9_.]+$/;
export const INSTA_URL_REGEX =
  /^(https?:\/\/www\.instagram\.com\/[a-zA-Z0-9_]+|www\.instagram\.com\/[a-zA-Z0-9_]+|instagram\.com\/[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)$/
  // /^(https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+|www\.instagram\.com\/[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)$/;

export function formatTikTokUrl(input) {
  // Regex to check if input is only @username
  const usernameRegex = /^@[a-zA-Z0-9_.]+$/;
  // Regex to check if input is a valid TikTok URL but might be missing parts
  const urlRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/(@[a-zA-Z0-9_.]+)\/?$/;
  if (usernameRegex.test(input)) {
    // If only @username is provided, return the full URL
    return `https://www.tiktok.com/${input}`;
  } else if (urlRegex.test(input)) {
    // Ensure the full URL format if parts are missing
    return input
      .replace(/^(https?:\/\/)?(www\.)?/, 'https://www.')
      .replace(/\/$/, '');
  } else {
    // Invalid input, return null or handle accordingly
    return '';
  }
}
export function formatInstaUrl(input) {
  const userNameRegex =
    /^(?!.*[@]|.*\.com)(?!\.|\d+$|.*[_.]{2}|.*\.$)[a-zA-Z0-9_]+$/;
  const instaUrlRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_]+)\/?$/;

  if (userNameRegex.test(input)) {
    return `https://www.instagram.com/${input}`;
  } else if (instaUrlRegex.test(input)) {
    return input.replace(
      /^(?:https?:\/\/)?(?:www\.)?instagram\.com\//,
      'https://www.instagram.com/',
    );
  } else {
    return '';
  }
}
// export function formatInstaUrl(input) {
//   console.log(INSTA_URL_REGEX.test(input), input, 'INSTA_URL_REGEX.test(input');
//   const userNameRegex =
//     /^([a-zA-Z0-9_.]+)\/?$|^(?!\.|\d+$|.*[_.]{2}|.*\.$)[a-z\d_.]+$/;
//   if (userNameRegex.test(input)) {
//     console.log('userNameRegex_block');
//     return 'https://www.instagram.com/' + input;
//   } else if (INSTA_URL_REGEX.test(input)) {
//     return input;
//   } else {
//     console.log('userNameRegex_elseBlock');
//     return '';
//   }
// }
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
