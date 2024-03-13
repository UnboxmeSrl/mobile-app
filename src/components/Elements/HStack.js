import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import perfectSize from '../../utils/responsiveSize'

const HStack = ({ style, children }) => {
  return <View style={[styles.hStack, style]}>{children}</View>
}

const styles = StyleSheet.create({
  hStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // columnGap: perfectSize(16),
  },
})

export default HStack
