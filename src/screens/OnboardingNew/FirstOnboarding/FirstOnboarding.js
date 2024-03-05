import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../../constants/fonts'
import { COLORS } from '../../../constants/colors'

const FirstOnboarding = () => {
  return (
    <View>
      <Image source={IMAGES.onboarding.onboardingGroupImages} style={styles.imageStyle} resizeMode={'cover'} />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`Collaborate with the `}
            <Text style={styles.colorChangeText}>{`Top places `}</Text>
            {`of Bali`}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {`A top selection of places ready for `}
            <Text style={styles.colorChangeText}>{`professional creators `}</Text>
            {`and`}
            <Text style={styles.colorChangeText}>{` models `}</Text>
            {`only `}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default FirstOnboarding

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
    fontSize: moderateScale(32),
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textsMainContainer: {
    marginTop: verticalScale(0),
  },
  imageStyle: {
    height: verticalScale(425),
    width: '100%',
  },
})
