import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from '../Elements/AppText'
import { useNavigation } from 'react-navigation-hooks'
function SubHeader({ title }) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" style={styles.icon} />
      </TouchableOpacity>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.item} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(24),
    paddingVertical: perfectSize(24),
    backgroundColor: colors.white,
  },
  item: {
    height: '100%',
    width: perfectSize(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: perfectSize(18),
    fontWeight: '700',
    // fontFamily: fonts.inter700,
    color: colors.dark,
  },
  icon: {
    fontSize: perfectSize(28),
    color: colors.dark,
  },
})
export default SubHeader
