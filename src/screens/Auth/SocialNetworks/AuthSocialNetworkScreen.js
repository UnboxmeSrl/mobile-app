import React, {useMemo, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {
  CustomButton,
  CustomHeader,
  SocialMediaSheet,
} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthSocialNetwork} from './hooks';
import {setAuthData} from '../../../redux';
import {
  formatInstaUrl,
  formatTikTokUrl,
  INSTA_URL_REGEX,
  TIKTOK_URL_REGEX,
} from '../../../navigation/constants';
import AppSelect from '../../../components/Elements/AppSelect';

const AuthSocialNetworkScreen = () => {
  const {
    isLoading,
    dispatch,
    isBtnDisabled,
    setIsBtnDisabled,
    tiktokUserName,
    setTiktokUserName,
    tiktokSheetRef,
    instaUserName,
    setInstaUserName,
    instaSheetRef,
    handleOnTikTokPress,
    handleOnInstaPress,
    handleBackPress,
    handleNextPress,
  } = useAuthSocialNetwork();
  const [tiktokInputValue, setTiktokInputValue] = useState('');
  const [instaUserNameValue, setInstaUserNameValue] = useState('');

  const isValidTiktok = useMemo(() => {
    return tiktokInputValue && TIKTOK_URL_REGEX.test(tiktokInputValue);
  }, [tiktokInputValue]);

  const isValidInstagram = useMemo(() => {
    return instaUserNameValue && INSTA_URL_REGEX.test(instaUserNameValue);
  }, [instaUserNameValue]);

  console.log(isValidInstagram, instaUserNameValue, 'isValidInstagram');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <CustomHeader
          title={'Social networks'}
          step={5}
          handleBackPress={handleBackPress}
        />
        <View style={styles.descriptionContainer}>
          <Text allowFontScaling={false} style={styles.descriptionText}>
            Register your social networks
          </Text>
          {/* <View style={{marginTop: verticalScale(12), marginHorizontal: '5%'}}>
            <AppSelect
              textStyle={{fontFamily: FONTS.quicksand}}
              data={influencer_type || []}
              // onSelect={onSelect}
              setSelectedValue={value => {
                setSelectedInFluencer_type(value);
                setInFluencerTypeError('');
              }}
              selectedValue={selectedInFluencer_type}
              placeholder={'Choose platforms where you qualify'}
            />
            {inFluencerTypeError && (
              <Text
                style={{
                  marginLeft: scale(12),
                  fontFamily: FONTS.quicksand,
                  color: COLORS.error,
                }}>
                {inFluencerTypeError}
              </Text>
            )}
          </View> */}
          <View style={styles.socialMediaMainContainer}>
            <TouchableOpacity
              onPress={handleOnTikTokPress}
              style={[
                styles.socialMediaItem,
                {
                  backgroundColor:
                    tiktokUserName.trim() !== ''
                      ? COLORS.newPrimary
                      : COLORS.lightNewPrimaryA6,
                },
              ]}
              activeOpacity={0.5}>
              <View style={styles.socialMediaNameIconContainer}>
                <Image source={IMAGES.tiktok} style={styles.socialMediaIcon} />
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.socialMediaNameText,
                    {
                      color:
                        tiktokUserName.trim() !== ''
                          ? COLORS.white
                          : COLORS.gray,
                    },
                  ]}>
                  Tik tok account
                </Text>
              </View>
              <View style={styles.loginIntoIconContainer}>
                <Image
                  source={IMAGES.loginInto}
                  style={[
                    styles.loginIntoIcon,
                    {
                      tintColor:
                        tiktokUserName.trim() !== ''
                          ? COLORS.white
                          : COLORS.black,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleOnInstaPress}
              style={[
                styles.socialMediaItem,
                {
                  backgroundColor:
                    instaUserName?.trim() !== ''
                      ? COLORS.newPrimary
                      : COLORS.lightNewPrimaryA6,
                },
              ]}
              activeOpacity={0.5}>
              <View style={styles.socialMediaNameIconContainer}>
                <Image
                  source={IMAGES.instagram}
                  style={styles.socialMediaIcon}
                />
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.socialMediaNameText,
                    {
                      color:
                        instaUserName?.trim() !== ''
                          ? COLORS.white
                          : COLORS.gray,
                    },
                  ]}>
                  Instagram account
                </Text>
              </View>
              <View style={styles.loginIntoIconContainer}>
                <Image
                  source={IMAGES.loginInto}
                  style={[
                    styles.loginIntoIcon,
                    {
                      tintColor:
                        instaUserNameValue.trim() !== ''
                          ? COLORS.white
                          : COLORS.black,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton
          title={'Next'}
          handlePress={handleNextPress}
          isLoading={isLoading}
          disabled={isBtnDisabled}
        />
      </View>

      <SocialMediaSheet
        ref={tiktokSheetRef}
        title={'Connect Tiktok account'}
        description={'Enter your tiktok account username'}
        placeholder={'your tiktok @username'}
        field={tiktokInputValue}
        showInfoText="If you have an account add user name after @ else keep blank"
        // onChangeText={setTiktokUserName}
        disabled={!isValidTiktok}
        onChangeText={value => {
          let link = formatTikTokUrl(value);
          console.log(link, 'link');
          setTiktokUserName(link);
          setTiktokInputValue(value); // Update input value for TikTok
          // setAuthData({tiktokUserName: ''});
          dispatch(setAuthData({tiktokUserName: ''}));
        }}
        handlePress={() => {
          console.log('check_add_press', tiktokUserName);
          dispatch(setAuthData({tiktokUserName}));
          // }
          setTimeout(() => {
            tiktokSheetRef?.current?.close();
          }, 1000);
        }}
      />

      <SocialMediaSheet
        ref={instaSheetRef}
        title={'Connect Instagram account'}
        description={'Enter your instagram account username'}
        placeholder={'your instagram username'}
        field={instaUserNameValue}
        disabled={!isValidInstagram}
        // onChangeText={setInstaUserName}
        onChangeText={value => {
          const link = formatInstaUrl(value);
          console.log('link_instagram', link);
          setInstaUserName(link);
          setInstaUserNameValue(value); // Update input value for TikTok
          // setAuthData({instaUserName: ''});
          dispatch(setAuthData({instaUserName: ''}));
        }}
        handlePress={() => {
          console.log('check_add_press_InstaUserName', instaUserName);
          // let link = instaUserName;
          // if (instaUserName.search('instagram.com') === -1) {
          //   console.log("instaUserName.search('@')", instaUserName.search('@'));
          //   if (instaUserName.search('@') !== -1) {
          //     link = instaUserName.replace(/@/g, '');
          //   }
          //   link = 'https://www.instagram.com/' + link;
          // }
          dispatch(setAuthData({instaUserName}));
          setTimeout(() => {
            instaSheetRef?.current?.close();
          }, 1000);
        }}
      />
    </SafeAreaView>
  );
};

export default AuthSocialNetworkScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  socialMediaMainContainer: {
    marginTop: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  instaBusinessMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instaBusinessLoginIntoIcon: {
    tintColor: COLORS.white,
  },
  socialMediaItem: {
    backgroundColor: COLORS.lightNewPrimaryA6,
    width: '90%',
    height: verticalScale(40),
    flexDirection: 'row',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(10),
  },
  socialMediaNameIconContainer: {
    flexDirection: 'row',
    width: '80%',
    marginLeft: scale(16),
    alignItems: 'center',
  },
  socialMediaIcon: {
    height: moderateScale(24),
    width: moderateScale(24.5),
  },
  socialMediaNameText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.gray,
    fontSize: moderateScale(14),
    marginLeft: scale(16),
  },
  loginIntoIconContainer: {
    flexDirection: 'row',
    width: '5%',
    marginLeft: scale(16),
    alignItems: 'center',
  },
  loginIntoIcon: {
    height: moderateScale(18.5),
    width: moderateScale(16.98),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  socialMediaDescriptionText: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.black,
    fontSize: moderateScale(15),
  },
  socialMediaDescriptionContainer: {
    alignSelf: 'center',
    width: '87%',
    marginTop: verticalScale(57),
  },
  instaBusinessItem: {
    backgroundColor: COLORS.newPrimary,
    width: '90%',
    height: verticalScale(40),
    flexDirection: 'row',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
  },
  instaBusinessText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    fontSize: moderateScale(14),
    marginLeft: scale(16),
  },
  skipContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(8),
    marginEnd: verticalScale(22),
    justifyContent: 'flex-end',
    backgroundColor: 'yellow ',
  },
  skipText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    color: COLORS.black,
  },
});
