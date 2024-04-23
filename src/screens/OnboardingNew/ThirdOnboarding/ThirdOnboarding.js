import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../../constants/fonts'
import { COLORS } from '../../../constants/colors'

const ThirdOnboarding = () => {
  return (
    <View>
      <Image source={IMAGES.onboarding.onboardingThirdImage} style={styles.imageStyle} resizeMode={'cover'} />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`Find `}
            <Text style={styles.colorChangeText}>{`Restaurants, Beauty saloons, Sport lessons `}</Text>
            {`and much more!`}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{`An ever growing list with ever growing surprises `}</Text>
        </View>
      </View>
    </View>
  )
}

export default ThirdOnboarding

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
    width: '85%',
    alignSelf: 'center',
  },
  colorChangeText: {
    color: COLORS.newPrimary,
  },
  titleText: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(26),
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textsMainContainer: {
    marginTop: verticalScale(-20),
  },
  imageStyle: {
    height: verticalScale(410),
    width: '100%',
  },
})
