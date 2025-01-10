import {Alert} from 'react-native';
import {check, openSettings, request, RESULTS} from 'react-native-permissions';

export const checkPermission = async permission => {
  const res = await check(permission)
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return false;

        case RESULTS.DENIED:
          const reqRes = await requestPermission(permission);
          return reqRes;

        case RESULTS.LIMITED:
          return true;

        case RESULTS.GRANTED:
          return true;

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Error',
            'You have denied the permission please allow the permission through settings',
            [
              {
                text: 'Open Settings',
                onPress: () =>
                  openSettings().catch(() =>
                    console.warn('cannot open settings'),
                  ),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
          return false;
      }
    })
    .catch(error => {
      console.log(error);
    });
  return res;
};

export const requestPermission = async permission => {
  const res = await request(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return false;

        case RESULTS.DENIED:
          return false;

        case RESULTS.LIMITED:
          return true;

        case RESULTS.GRANTED:
          return true;

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Error',
            'You have denied the permission please allow the permission through settings',
            [
              {
                text: 'Open Settings',
                onPress: () =>
                  openSettings().catch(() =>
                    console.warn('cannot open settings'),
                  ),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
          return false;
      }
    })
    .catch(error => {
      console.log(error);
    });
  return res;
};
