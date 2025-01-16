import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {useTutorials} from './hooks';

const TutorialsScreen = () => {
  const {
    loading,
    tutorialsList,
    isYoutubeModalOpen,
    videoId,
    playing,
    setIsYoutubeModalOpen,
    handleRedirect,
    handleBackPress,
  } = useTutorials();

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={30} />
        </View>
      ) : (
        <>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backIconContainer}>
              <Image
                resizeMode="cover"
                source={IMAGES.arrowLeft}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text allowFontScaling={false} style={styles.headerTitleText}>
              Tutorials
            </Text>

            <View style={styles.listContainer}>
              <FlatList
                alwaysBounceVertical={false}
                data={tutorialsList}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.btnContainer}
                      activeOpacity={0.7}
                      onPress={() => handleRedirect(item?.video_id)}>
                      <Text
                        allowFontScaling={false}
                        style={styles.itemTitleText}>{`${item?.title}`}</Text>
                      <Image
                        source={IMAGES.playBlack}
                        style={styles.playIcon}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </>
      )}

      <Modal visible={isYoutubeModalOpen}>
        <SafeAreaView style={styles.mainYoutubePlayerContainer}>
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={() => setIsYoutubeModalOpen(false)}>
            <Image source={IMAGES.closeNew} style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.youtubePlayerContainer}>
            <YoutubePlayer height={300} play={playing} videoId={videoId} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default TutorialsScreen;

const styles = StyleSheet.create({
  mainYoutubePlayerContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
  },
  youtubePlayerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeIcon: {
    height: moderateScale(15),
    tintColor: COLORS.white,
    width: moderateScale(15),
  },
  closeIconContainer: {
    marginTop: verticalScale(10),
    marginRight: scale(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backIcon: {
    height: moderateScale(24),
    tintColor: COLORS.white,
    width: moderateScale(24),
  },
  backIconContainer: {
    alignItems: 'flex-end',
  },
  backBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  playIcon: {
    height: moderateScale(15),
    marginLeft: scale(10),
    marginTop: verticalScale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(14.25),
  },
  headerContainer: {
    paddingTop: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(32),
    color: COLORS.newPrimary,
  },
  listContainer: {
    width: '100%',
    marginTop: verticalScale(70),
  },
  btnContainer: {
    flexDirection: 'row',
    height: verticalScale(56),
    width: '90%',
    backgroundColor: COLORS.veryLight02,
    borderWidth: moderateScale(2),
    borderColor: COLORS.newPrimary,
    borderRadius: moderateScale(18),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  itemTitleText: {
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    color: COLORS.newPrimary,
  },
});
