import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useHome } from './hooks'
import RestaurantsScreen from '../Restaurants/RestaurantsScreen'
import CitiesScreen from '../Cities/CitiesScreen'

const HomeNew = () => {
  const { city } = useHome()
  //   return city?.id ? <RestaurantsScreen /> : <CitiesScreen />
  return <></>
}

export default HomeNew
