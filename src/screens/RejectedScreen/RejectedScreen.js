import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/images'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../constants/fonts'
import { COLORS } from '../../constants/colors'
import { useReject } from './hooks'

const RejectedScreen = () => {
  const { handleGuestPress } = useReject()
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={IMAGES.appliedScreenBackground} style={styles.backgroundStyle}>
        <View style={styles.viewForMargin}>
          <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(40) }}>
            <Image
              source={IMAGES.appLogo}
              style={{ height: verticalScale(118), width: scale(99) }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{`You have Rejected! `}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{`Within 24H you will receive a response on your email `}</Text>
        </View>

        <TouchableOpacity style={styles.queryContainer}>
          <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
          <Text style={styles.queryText}>Questions? Send us a message</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGuestPress} style={styles.guestBtnContainer} activeOpacity={0.7}>
          <Image source={IMAGES.addUser} style={styles.addUserIcon} />
          <Text style={styles.guestBtnText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default RejectedScreen

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
  mainContainer: {
    flex: 1,
  },
  viewForMargin: {
    marginTop: getStatusBarHeight(),
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(25),
  },
  titleContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  descriptionText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(20),
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
    width: '80%',
    alignSelf: 'center',
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
  guestBtnText: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  guestBtnContainer: {
    width: '90%',
    height: verticalScale(40),
    marginTop: verticalScale(24),
    borderColor: COLORS.white,
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
