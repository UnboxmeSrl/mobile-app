import {Alert} from 'react-native';
import {check, openSettings, request, RESULTS} from 'react-native-permissions';

export const checkPermission = async permission => {
  const res = await check(permission)
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('result Unavailable', result);
          return false;

        case RESULTS.DENIED:
          console.log('result denied', result);
          const reqRes = await requestPermission(permission);
          return reqRes;

        case RESULTS.LIMITED:
          console.log('result limited', result);
          return true;

        case RESULTS.GRANTED:
          console.log('result granted', result);
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
          console.log('result Unavailable', result);
          return false;

        case RESULTS.DENIED:
          console.log('result denied', result);
          return false;

        case RESULTS.LIMITED:
          console.log('result Limited', result);
          return true;

        case RESULTS.GRANTED:
          console.log('result granted', result);
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
