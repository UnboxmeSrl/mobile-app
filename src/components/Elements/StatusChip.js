import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

function StatusChip({ style, title, onPress }) {
  const btnBgColor = () => {
    switch (title) {
      case 'publish':
        return colors.successLight
      case 'approve':
        return colors.successLight
      case 'rejected':
        return colors.dangerLight
      case 'under review':
        return colors.primaryLight
      default:
        return colors.light
    }
  }

  const btnTitleColor = () => {
    switch (title) {
      case 'publish':
        return colors.success
      case 'approve':
        return colors.success
      case 'rejected':
        return colors.danger
      case 'under review':
        return colors.primary
      default:
        return colors.dark
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }, { backgroundColor: btnBgColor() }, style]}
      onPress={onPress}
    >
      <AppText style={[styles.btnTitle, { color: btnTitleColor() }]}>{title}</AppText>
      {title === 'publish' && <AntDesign name="check" style={styles.btnIcon} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // columnGap: perfectSize(4),
    height: perfectSize(32),
    backgroundColor: colors.light,
    paddingHorizontal: perfectSize(16),
    borderRadius: perfectSize(50),
  },
  btnTitle: {
    fontSize: perfectSize(12),
    // fontFamily: fonts.inter500,
    color: colors.dark,
    textTransform: 'capitalize',
  },
  btnIcon: {
    fontSize: perfectSize(16),
    color: colors.success,
  },
})
export default StatusChip
