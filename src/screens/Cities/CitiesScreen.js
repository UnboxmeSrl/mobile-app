import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import LocationsTile from '../../components/LocationsTile/LocationsTile'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import useCities from './hooks/useCities'

const CitiesScreen = () => {
  const { locationData } = useCities()
  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.logoContainer}>
              <Image resizeMode="contain" source={IMAGES.claris} style={styles.logoImage} />
            </View>
            <View style={styles.chooseLocationTitleContainer}>
              <Text style={styles.chooseLocationTitleText}>Choose location</Text>
            </View>
          </>
        }
        data={locationData}
        renderItem={({ item }) => {
          return <LocationsTile item={item} />
        }}
      />
    </View>
  )
}

export default CitiesScreen

const styles = StyleSheet.create({
  chooseLocationTitleContainer: {
    marginBottom: verticalScale(10),
    marginLeft: scale(16),
  },
  chooseLocationTitleText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    width: '100%',
  },
  logoImage: {
    height: verticalScale(111.98),
    width: scale(119.5),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
