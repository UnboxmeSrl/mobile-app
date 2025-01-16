import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  let granted =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!granted && Platform.OS === 'android') {
    const authStatusA = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return authStatusA === PermissionsAndroid.RESULTS.GRANTED;
  }
  return granted;
}

export const getToken = async () => {
  let fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  } else {
    return '';
  }
};
