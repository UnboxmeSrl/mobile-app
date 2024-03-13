import React from 'react'
import { StyleSheet } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

function Title({ style, title }) {
  return <AppText style={[styles.text, style]}>{title}</AppText>
}

const styles = StyleSheet.create({
  text: {
    fontSize: perfectSize(18),
    // fontFamily: fonts.inter600,
    fontWeight: '700',
    color: colors.dark,
    marginVertical: perfectSize(16),
    textTransform: 'capitalize',
  },
})
export default Title
