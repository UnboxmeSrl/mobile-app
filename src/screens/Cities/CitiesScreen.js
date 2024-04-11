import React from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../assets/images'
import LocationsTile from '../../components/LocationsTile/LocationsTile'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import useCities from './hooks/useCities'

const CitiesScreen = () => {
  const { isLoading, locationData, refreshing, onRefresh } = useCities()
  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={20} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <LocationsTile item={item} />
          }}
        />
      )}
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
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
