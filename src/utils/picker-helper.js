import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {convertImage} from 'react-native-simple-heic2jpg';

export const modifyImagesFromHEICToJPG = async assets => {
  for (const image of assets) {
    if (image.fileName.endsWith('.heic') || image.fileName.endsWith('.HEIC')) {
      const uri = await convertImage(image.uri);
      image.fileName = `${image.fileName.split('.')[0]}.JPG`;
      image.type = 'image/jpeg';
      image.uri = uri;
    }
  }
  return assets;
};

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
    } else if (res.error) {
    } else {
      return {
        ...res,
        assets: await modifyImagesFromHEICToJPG(res.assets || []),
      };
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
    } else if (res.error) {
    } else {
      return {
        ...res,
        assets: await modifyImagesFromHEICToJPG(res.assets || []),
      };
    }
  } catch (e) {
    console.log('Camera Error: ', e);
  }
};
