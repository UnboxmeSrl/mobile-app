import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../../constants/fonts'
import { COLORS } from '../../../constants/colors'

const FourthOnboarding = () => {
  return (
    <View>
      <Image source={IMAGES.onboarding.onboardingHotels} style={styles.imageStyle} resizeMode={'cover'} />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`Design and incredible adventure with `}
            <Text style={styles.colorChangeText}>{`influencer Villas`}</Text>
            {`, and `}
            <Text style={styles.colorChangeText}>{`Hotels`}</Text>
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.descriptionText}
          >{`Design your entire holiday with Claris and become an aknowledged travel influencer `}</Text>
        </View>
      </View>
    </View>
  )
}

export default FourthOnboarding

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: FONTS.quicksand,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(16),
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
    marginTop: verticalScale(0),
  },
  imageStyle: {
    height: verticalScale(410),
    width: '100%',
  },
})
