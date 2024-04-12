import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

import { useApplied } from './hooks'

const AppliedScreen = () => {
  const { handleGuestPress } = useApplied()
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={IMAGES.appliedScreenBackground} style={styles.backgroundStyle}>
        <View style={styles.viewForMargin}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(40), width: '95%' }}>
            <Image
              resizeMode={'contain'}
              source={IMAGES.appLogo}
              style={{ height: verticalScale(118), width: scale(99) }}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{`You have applied! `}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{`Within 24H you will receive a response on your email `}</Text>
        </View>

        <TouchableOpacity style={styles.queryContainer}>
          <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
          <Text style={styles.queryText}>Questions? Send us a message</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={handleGuestPress} style={styles.guestBtnContainer}>
          <Image source={IMAGES.addUser} style={styles.addUserIcon} />
          <Text style={styles.guestBtnText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default AppliedScreen

const styles = StyleSheet.create({
  addUserIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.white,
    width: moderateScale(20),
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(10),
    width: '80%',
  },
  descriptionText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  guestBtnContainer: {
    height: verticalScale(40),
    borderColor: COLORS.white,
    width: '90%',
    borderWidth: moderateScale(1),
    marginTop: verticalScale(24),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  guestBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  queryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(250),
    width: '90%',
  },
  queryIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.white,
    width: moderateScale(20),
  },
  queryText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
  },
  titleContainer: {
    alignSelf: 'center',
    width: '95%',
    marginTop: verticalScale(10),
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(25),
    textAlign: 'center',
  },
  viewForMargin: {
    paddingTop: getStatusBarHeight(),
  },
})
