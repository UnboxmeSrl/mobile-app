import React from 'react'
import { StyleSheet } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

function Label({ style, title }) {
  return <AppText style={[styles.text, style]}>{title}</AppText>
}

const styles = StyleSheet.create({
  text: {
    fontSize: perfectSize(14),
    // fontFamily: fonts.inter500,
    fontWeight: '500',
    color: colors.infoLight,
  },
})
export default Label
