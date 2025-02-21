import React, {useMemo} from 'react';
import {
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
import {useContentBrief} from './hooks';
import {navigate} from '../../services';
import {SCREEN_NAMES} from '../../constants';

const ContentBriefScreen = () => {
  const {
    isReel,
    actionNumId,
    icon,
    actionName,
    bookingDetails,
    handleBackPress,
    handleTagCopyPress,
    handleOpenCouponPress,
  } = useContentBrief();
  const tags = useMemo(
    () =>
      [
        bookingDetails?._restaurant_turbo?.Tag2,
        bookingDetails?._restaurant_turbo?.Tags,
      ].filter(v => !!v),
    [bookingDetails],
  );
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
            <Text allowFontScaling={false} style={styles.headerTitleText}>
              Content Brief
            </Text>
          </View>
        </View>
        {bookingDetails?._restaurant_turbo?.brief?.length > 0 && (
          <View style={styles.descriptionContainer}>
            <Text allowFontScaling={false} style={styles.descriptionText}>
              {bookingDetails?._restaurant_turbo?.brief}
            </Text>
          </View>
        )}

        {/* {(bookingDetails?._restaurant_turbo?.Tags ||
          bookingDetails?._restaurant_turbo?.Tags) && (
          <> */}

        {/* </>
        )} */}
        {/* 
        <View style={styles.labelContainer}>
          <Text allowFontScaling={false}  style={styles.labelText}>Hashtags</Text>
        </View>

        <FlatList
          data={[0, 1, 2, 3]}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.tagContainer}>
                <Text allowFontScaling={false}  style={styles.tagText}>#Woweffect</Text>
                <TouchableOpacity>
                  <Image resizeMode="cover" source={IMAGES.copy} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>
            )
          }}
        /> */}

        <View style={styles.socialMediaMainDetailsContainer}>
          <View style={styles.socialMediaImageContainer}>
            <FastImage
              resizeMode="contain"
              source={{
                priority: FastImage.priority.high,
                uri: icon,
              }}
              style={styles.testImage}
            />
          </View>
          <View style={styles.socialMediaNameContainer}>
            <Text allowFontScaling={false} style={styles.socialMediaNameText}>
              {actionName}
            </Text>
            <View style={styles.ratingContainer}>
              <Text allowFontScaling={false} style={styles.ratingUsersText}>
                {bookingDetails?._offers_turbo?.Credits}
              </Text>
              <Image
                source={IMAGES.ratingStar}
                style={styles.ratingIconImage}
              />
            </View>
          </View>
        </View>
        <View style={styles.socialMediaDescriptionContainer}>
          <Text
            allowFontScaling={false}
            style={styles.socialMediaDescriptionText}>
            {bookingDetails?._actions_turbo?.Descrizione}
          </Text>
        </View>
        {tags.length > 0 && (
          <>
            <View style={styles.labelContainer}>
              <Text allowFontScaling={false} style={styles.labelText}>
                Tags
              </Text>
            </View>

            <FlatList
              data={tags}
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.tagContainer}>
                    <Text allowFontScaling={false} style={styles.tagText}>
                      {item}
                      {/* working on tabs */}
                    </Text>
                    <TouchableOpacity onPress={() => handleTagCopyPress(item)}>
                      <Image
                        resizeMode="contain"
                        source={IMAGES.copy}
                        style={styles.copyIcon}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </>
        )}
        <TouchableOpacity
          style={styles.queryContainer}
          onPress={() =>
            navigate(SCREEN_NAMES.ChatScreen, {
              bookingDetails: bookingDetails,
            })
          }>
          <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
          <Text allowFontScaling={false} style={styles.queryText}>
            Questions? Send us a message
          </Text>
        </TouchableOpacity>

        <View style={styles.openCouponBtnMainContainer}>
          <TouchableOpacity
            onPress={handleOpenCouponPress}
            disabled={!bookingDetails?.Approved}
            style={[
              styles.openCouponBtnContainer,
              !bookingDetails?.Approved && styles.disabledBtnContainer,
            ]}>
            <Text allowFontScaling={false} style={styles.openCouponBtnText}>
              Open Coupon
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentBriefScreen;

const styles = StyleSheet.create({
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
  copyIcon: {
    // tintColor: COLORS.newPrimary,
    tintColor: COLORS.greyFont,
    height: moderateScale(16),
    marginLeft: scale(7),
    width: moderateScale(16),
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '10%',
    width: '100%',
  },
  descriptionText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  disabledBtnContainer: {
    backgroundColor: COLORS.cultured,
    opacity: 0.7,
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
    width: '75%',
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  labelContainer: {
    justifyContent: 'center',
    marginHorizontal: '8%',
    marginTop: verticalScale(20),
    width: '90%',
  },
  labelText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  openCouponBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  openCouponBtnMainContainer: {
    marginTop: verticalScale(50),
    padding: moderateScale(24),
    width: '100%',
  },
  openCouponBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  queryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(50),
    width: '90%',
  },
  queryIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(20),
  },
  queryText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
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
  socialMediaDescriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(20),
    width: '90%',
  },
  socialMediaDescriptionText: {
    // color: COLORS.newPrimary,
    color: COLORS.davyGrey,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  socialMediaImageContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    height: verticalScale(67),
    justifyContent: 'center',
    marginLeft: scale(13),
    width: scale(68),
  },
  socialMediaMainDetailsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(45),
  },
  socialMediaNameContainer: {
    marginLeft: scale(20),
    marginTop: verticalScale(5),
    width: '40%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  tagContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '8%',
    marginRight: '5%',
    marginTop: verticalScale(8),
    width: '34%',
  },
  tagText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  testImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
});
