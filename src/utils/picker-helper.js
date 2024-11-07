import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openCamera = async () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  try {
    const res = await launchCamera(options);

    if (res.didCancel) {
      console.log('User cancelled camera');
    } else if (res.error) {
      console.log('Camera Error: ', res.error);
    } else {
      return res;
    }
  } catch (e) {
    console.log('Camera Error: ', e);
  }
};

export const openGallery = async ({selectionLimit}) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    selectionLimit: selectionLimit,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  try {
    const res = await launchImageLibrary(options);

    if (res.didCancel) {
      console.log('User cancelled camera');
    } else if (res.error) {
      console.log('Camera Error: ', res.error);
    } else {
      return res;
    }
  } catch (e) {
    console.log('Camera Error: ', e);
  }
};
