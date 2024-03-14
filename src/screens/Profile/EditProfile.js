import React from 'react'
// import { Avatar } from '@components/Avatar'
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import SubHeader from '../../components/Header/SubHeader'

export const EditProfile = ({}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubHeader title="Profile" />
      <ScrollView style={{ flex: 1 }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  infoGrid: {
    flex: 1,
    flexDirection: 'column',
    // rowGap: perfectSize(8),
    marginTop: perfectSize(8),
    paddingBottom: perfectSize(8),
    backgroundColor: colors.light,
  },
})
