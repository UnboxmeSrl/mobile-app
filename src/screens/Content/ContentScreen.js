import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {useContent} from './hooks';

const ContentScreen = () => {
  const {
    bookingDetails,
    actions,
    isLoading,
    isDataFetching,
    diaryItems,
    actionNumId,
    selectedApp,
    setSelectedApp,
    handleBackPress,
    handleNextPress,
  } = useContent();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainScrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}>
            <Image
              resizeMode="cover"
              source={IMAGES.back}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text allowFontScaling={false} style={styles.chooseVideoTitleText}>
              Choose a video to publish
            </Text>
          </View>
        </View>

        {isDataFetching ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.newPrimary} size={20} />
          </View>
        ) : actionNumId === 3 ? (
          <FlatList
            data={diaryItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedApp(index)}
                  style={[
                    styles.cardContainer,
                    selectedApp === index && styles.selectedAppStyle,
                  ]}>
                  <View style={styles.socialMediaMainDetailsContainer}>
                    <View style={styles.socialMediaImageContainer}>
                      <FastImage
                        resizeMode="contain"
                        source={{
                          priority: FastImage.priority.high,
                          uri: item?.action_icon?.url,
                        }}
                        style={styles.testImage}
                      />
                    </View>
                    <View style={styles.socialMediaNameContainer}>
                      <Text
                        allowFontScaling={false}
                        style={
                          styles.socialMediaNameText
                        }>{`${item?.action}`}</Text>
                      <View style={styles.ratingContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.ratingUsersText}>
                          {bookingDetails?._offers_turbo?.Credits}
                        </Text>
                        <Image
                          source={IMAGES.ratingStar}
                          style={styles.ratingIconImage}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.descriptionText}>
                      {`A ${item?.action} fully dedicated to your experience at the Restaurant`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            // data={[bookingDetails._actions_turbo]}
            data={
              actionNumId === 6
                ? actions?.duo_actions
                : [bookingDetails._actions_turbo]
            }
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedApp(index)}
                  style={[
                    styles.cardContainer,
                    selectedApp === index && styles.selectedAppStyle,
                  ]}>
                  <View style={styles.socialMediaMainDetailsContainer}>
                    <View style={styles.socialMediaImageContainer}>
                      <FastImage
                        resizeMode="contain"
                        source={{
                          priority: FastImage.priority.high,
                          uri: item?.Action_icon?.url,
                        }}
                        style={styles.testImage}
                      />
                    </View>
                    <View style={styles.socialMediaNameContainer}>
                      <Text
                        allowFontScaling={false}
                        style={
                          styles.socialMediaNameText
                        }>{`${item?.Action_Name}`}</Text>
                      <View style={styles.ratingContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.ratingUsersText}>
                          {bookingDetails?._offers_turbo?.Credits}
                        </Text>
                        <Image
                          source={IMAGES.ratingStar}
                          style={styles.ratingIconImage}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.descriptionText}>
                      {`A ${item?.Action_Name} fully dedicated to your experience at the Restaurant`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {!isDataFetching && (
          <View style={styles.nextBtnMainContainer}>
            {isLoading ? (
              <View style={styles.nextBtnContainer}>
                <ActivityIndicator color={COLORS.black22} size={30} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleNextPress}
                style={styles.nextBtnContainer}>
                <Text allowFontScaling={false} style={styles.nextBtnText}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({
  selectedAppStyle: {
    borderColor: COLORS.newPrimary,
    borderWidth: 1,
  },
  mainScrollView: {
    backgroundColor: COLORS.white,
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  backIconContainer: {
    alignItems: 'flex-end',
    width: '15%',
  },
  cardContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightNewPrimary40,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    height: verticalScale(170),
    marginTop: verticalScale(23),
    paddingBottom: verticalScale(15),
    width: '95%',
  },
  chooseVideoTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(20),
    width: '85%',
  },
  descriptionText: {
    color: COLORS.greyFont,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: '75%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  nextBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  nextBtnMainContainer: {
    // borderBottomWidth: 0,
    // borderColor: COLORS.whiteShadedTransparent,
    // borderRadius: moderateScale(10),
    // borderWidth: moderateScale(1),
    marginTop: verticalScale(50),
    padding: moderateScale(24),
    width: '100%',
  },
  nextBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(9),
  },
  ratingIconImage: {
    height: moderateScale(16),
    marginLeft: scale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  socialMediaImageContainer: {
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    height: verticalScale(67),
    justifyContent: 'center',
    marginLeft: scale(13),
    width: scale(68),
  },
  socialMediaMainDetailsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
  },
  socialMediaNameContainer: {
    marginLeft: scale(20),
    width: '60%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  testImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  tiktokImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  tiktokImageContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    height: verticalScale(67),
    justifyContent: 'center',
    marginLeft: scale(13),
    width: scale(68),
  },
});
