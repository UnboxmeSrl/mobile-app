import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomHeader } from '../../../components'
import { COLORS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const AuthProfilePictureScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Profile picture'} step={9} />
    </View>
  )
}

export default AuthProfilePictureScreen

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
