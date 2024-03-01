import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader, SocialMediaSheet } from '../../../components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { COLORS, FONTS } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../../assets/images'
import { useAuthSocialNetwork } from './hooks'

const AuthSocialNetworkScreen = () => {
  const {
    isBtnDisabled,
    tiktokUserName,
    setTiktokUserName,
    tiktokSheetRef,
    instaUserName,
    setInstaUserName,
    instaSheetRef,
    handleOnTikTokPress,
    handleOnInstaPress,
    handleNextPress,
  } = useAuthSocialNetwork()

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Social networks'} step={11} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Register your social networks</Text>
      </View>

      <View style={styles.socialMediaMainContainer}>
        <TouchableOpacity onPress={handleOnTikTokPress} style={styles.socialMediaItem} activeOpacity={0.5}>
          <View style={styles.socialMediaNameIconContainer}>
            <Image source={IMAGES.tiktok} style={styles.socialMediaIcon} />
            <Text style={styles.socialMediaNameText}>Tik tok account</Text>
          </View>
          <View style={styles.loginIntoIconContainer}>
            <Image source={IMAGES.loginInto} style={styles.loginIntoIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOnInstaPress} style={styles.socialMediaItem} activeOpacity={0.5}>
          <View style={styles.socialMediaNameIconContainer}>
            <Image source={IMAGES.instagram} style={styles.socialMediaIcon} />
            <Text style={styles.socialMediaNameText}>Instagram account</Text>
          </View>
          <View style={styles.loginIntoIconContainer}>
            <Image source={IMAGES.loginInto} style={styles.loginIntoIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialMediaDescriptionContainer}>
        <Text style={styles.socialMediaDescriptionText}>
          connect Instagram business account to get the Pro-influ checkmark on your profile
        </Text>
      </View>

      <View style={styles.instaBusinessMainContainer}>
        <TouchableOpacity style={styles.instaBusinessItem} activeOpacity={0.5}>
          <View style={styles.socialMediaNameIconContainer}>
            <Image source={IMAGES.instagram} style={styles.socialMediaIcon} />
            <Text style={styles.instaBusinessText}>Instagram account</Text>
          </View>
          <View style={styles.loginIntoIconContainer}>
            <Image source={IMAGES.loginInto} style={[styles.loginIntoIcon, styles.instaBusinessLoginIntoIcon]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} disabled={isBtnDisabled} />
      </View>

      <SocialMediaSheet
        ref={tiktokSheetRef}
        title={'Connect Tiktok account'}
        description={'Enter your tiktok account username'}
        placeholder={'your tiktok username'}
        field={tiktokUserName}
        onChangeText={setTiktokUserName}
        handlePress={() => tiktokSheetRef?.current?.close()}
      />

      <SocialMediaSheet
        ref={instaSheetRef}
        title={'Connect Instagram account'}
        description={'Enter your tiktok account username'}
        placeholder={'your Instagram username'}
        field={instaUserName}
        onChangeText={setInstaUserName}
        handlePress={() => instaSheetRef?.current?.close()}
      />
    </View>
  )
}

export default AuthSocialNetworkScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(140),
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
    backgroundColor: COLORS.isabelLine,
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
    marginTop: getStatusBarHeight(),
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    width: '87%',
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
    backgroundColor: COLORS.primary,
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
})
