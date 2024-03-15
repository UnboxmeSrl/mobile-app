import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS, FONTS } from '../../../constants'
import { IMAGES } from '../../../assets/images'
import { useNavigation } from 'react-navigation-hooks'

const CustomHeader = ({ title, step, handleBackPress }) => {
  const navigation = useNavigation()
  console.log('handleBackPress', handleBackPress)
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          if (handleBackPress) {
            handleBackPress()
          } else {
            navigation.pop()
          }
        }}
        style={styles.backIconContainer}
      >
        <Image resizeMode="cover" source={IMAGES.arrowLeft} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>{title}</Text>
      </View>
      <View style={{}}>
        <Text style={styles.progressText}>{`${step}/11`}</Text>
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  progressText: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: moderateScale(14),
  },
  backIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  backIconContainer: {
    alignItems: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(20),
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },
  headerTitleContainer: {
    marginTop: verticalScale(-5),
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
})
