import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../../constants/fonts'
import { COLORS } from '../../../constants/colors'

const SecondOnboarding = () => {
  return (
    <View>
      <Image source={IMAGES.onboarding.onboardingSocial} style={styles.imageStyle} resizeMode={'cover'} />
      <View style={styles.textsMainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {`With pre-planned collab, you `}
            <Text style={styles.colorChangeText}>{`only need to Book `}</Text>
            {`!`}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{`Exchange exposure for services effortlessly`}</Text>
        </View>
      </View>
    </View>
  )
}

export default SecondOnboarding

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
    fontSize: moderateScale(30),
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
