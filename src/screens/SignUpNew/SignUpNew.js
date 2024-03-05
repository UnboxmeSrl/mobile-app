import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/images'
import { FONTS } from '../../constants/fonts'
import { COLORS } from '../../constants/colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useSignUp } from './hooks'

const SignUpNew = () => {
  const { handleSignInPress, handleCreateAnAccountPress, handleGuestPress } = useSignUp()
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={IMAGES.authBackground} style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            marginTop: getStatusBarHeight(),
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{`Travel by pre-arranged collabs in tropical paradises `}</Text>
          </View>
        </View>

        <View style={{ marginTop: verticalScale(210) }}>
          <TouchableOpacity onPress={handleSignInPress} style={styles.signInBtnContainer} activeOpacity={0.7}>
            <Text style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCreateAnAccountPress} style={styles.signUpBtnContainer} activeOpacity={0.7}>
            <Text style={styles.signUpBtnText}>Create an account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orDivider} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orDivider} />
        </View>

        <TouchableOpacity onPress={handleGuestPress} style={styles.guestBtnContainer} activeOpacity={0.7}>
          <Text style={styles.guestBtnText}>Continue as Guest</Text>
        </TouchableOpacity>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {`By signing up, you  `}
            <Text style={styles.changedText}>{`agree `}</Text>
            {`to Claris’s`}
            <Text style={styles.changedText}>{` Terms of Use `}</Text>
            {`and `}
            <Text style={styles.changedText}>{` Privacy Policy. `}</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignUpNew

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    marginTop: verticalScale(100),
  },
  signInBtnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.blackRaw,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  signInBtnContainer: {
    width: '90%',
    height: verticalScale(40),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  signUpBtnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.blackRaw,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  signUpBtnContainer: {
    width: '90%',
    height: verticalScale(40),
    marginTop: verticalScale(16),
    borderColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: scale(20),
    marginTop: verticalScale(24),
  },
  orText: {
    color: COLORS.white,
    fontFamily: FONTS.interMedium,
    fontSize: moderateScale(14),
  },
  orDivider: {
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: COLORS.white,
    width: '20%',
  },
  guestBtnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  guestBtnContainer: {
    width: '90%',
    height: verticalScale(40),
    marginTop: verticalScale(16),
    borderColor: COLORS.white,
    backgroundColor: COLORS.veryLight01,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(14),
  },
  descriptionContainer: {
    marginTop: verticalScale(24),
    width: '70%',
    alignSelf: 'center',
  },
  changedText: {
    fontFamily: FONTS.quicksandBold,
  },
})
