import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

function Pause({ title, style, onPressBadge }) {
  return (
    <Pressable style={styles.pauseView} onPress={onPressBadge}>
      <Foundation name="pause" style={styles.icon} />
      <AppText style={[styles.text, style]}>{title}</AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pauseView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // columnGap: perfectSize(8),
    paddingVertical: perfectSize(8),
    paddingHorizontal: perfectSize(12),
    backgroundColor: colors.light,
    borderRadius: perfectSize(12),
  },
  icon: {
    fontSize: perfectSize(20),
    color: colors.info,
  },
  text: {
    fontSize: perfectSize(14),
    // fontFamily: fonts.inter600,
    color: colors.info,
  },
})
export default Pause
