import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import OnboardingCarousel from '../../components/Custom/OnboardingCarousel/OnboardingCarousel'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { useOnboarding } from './hooks'
import { useSelector } from 'react-redux'
import { selectOnBordingData } from '../../redux/slices'
import { useNavigation } from 'react-navigation-hooks'
import { SCREEN_NAMES } from '../../constants/navigation'

const OnboardingNew = () => {
  const { activeIndex, setActiveIndex, carouselItems, handleNextPress } = useOnboarding()
  const navigation = useNavigation()
  const isOnBoarding = useSelector(selectOnBordingData)

  useEffect(() => {
    if (isOnBoarding) navigation.navigate(SCREEN_NAMES.SignUpNew)
  }, [isOnBoarding, navigation])
  return (
    <View style={styles.mainContainer}>
      <OnboardingCarousel
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        Component={({ item }) => {
          return item?.component
        }}
        data={carouselItems}
      />
      <TouchableOpacity onPress={handleNextPress} style={styles.btnContainer} activeOpacity={0.7}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardingNew

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
  },
  btnText: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.blackRaw,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  btnContainer: {
    width: '90%',
    height: verticalScale(40),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.newPrimary,
  },
})
