import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'

const Stack = ({ style, children }) => {
  return <View style={[styles.stack, style]}>{children}</View>
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: perfectSize(16),
    paddingHorizontal: perfectSize(24),
  },
})

export default Stack
