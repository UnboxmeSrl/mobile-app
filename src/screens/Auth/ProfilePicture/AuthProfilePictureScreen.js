import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {CustomButton, CustomHeader} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthProfilePicture} from './hooks';

const AuthProfilePictureScreen = () => {
  const {
    isBtnDisabled,
    profilePicData,
    profilePicUploadRef,
    handleProfilePicture,
    handleCameraPress,
    handleGalleryPress,
    handleBackPress,
    handleNextPress,
  } = useAuthProfilePicture();
  // console.log('profilePicData in AuthProfilepICSCREEN', profilePicData)
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title={'Profile picture'}
        step={9}
        handleBackPress={handleBackPress}
      />
      <View style={styles.imageUploadMainContainer}>
        <FlatList
          data={profilePicData}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleGalleryPress(index)}
                style={styles.imageUploadContainer}
                activeOpacity={0.4}>
                {item?.fileName ? (
                  <Image
                    source={{uri: item?.uri}}
                    style={styles.actualUploadedPicture}
                    resizeMode={'cover'}
                  />
                ) : (
                  <>
                    <Image source={IMAGES.gallery} style={styles.galleryIcon} />
                    <Text allowFontScaling={false} style={styles.uploadText}>
                      Upload
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            Add photos of you
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text allowFontScaling={false} style={styles.descriptionText}>
            Please make sure your photo clearly shows your face
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title={'Next'}
          handlePress={handleNextPress}
          disabled={isBtnDisabled}
        />
      </View>

      {/* <PickerModal
        ref={profilePicUploadRef}
        handleCameraPress={handleCameraPress}
        handleGalleryPress={handleGalleryPress}
      /> */}
    </SafeAreaView>
  );
};

export default AuthProfilePictureScreen;

const styles = StyleSheet.create({
  actualUploadedPicture: {
    width: scale(150.04),
    height: verticalScale(150),
    borderRadius: moderateScale(16),
  },
  imageUploadMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadContainer: {
    width: scale(150.04),
    height: verticalScale(150),
    backgroundColor: COLORS.cultured,
    borderWidth: moderateScale(0.98),
    borderRadius: moderateScale(16),
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginHorizontal: scale(10),
  },
  galleryIcon: {
    height: moderateScale(21.62),
    width: moderateScale(21.62),
  },
  uploadText: {
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    color: COLORS.darkSilver,
    marginTop: verticalScale(15.72),
  },
  btnContainer: {
    marginTop: verticalScale(24),
  },
  titleContainer: {
    marginTop: verticalScale(42),
  },
  titleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(24),
    width: '70%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
