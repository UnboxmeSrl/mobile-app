import React, { ReactNode } from 'react'
import { Image, ImageProps, Pressable, StyleSheet, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'
import HStack from './HStack'

const IconList = ({ title, img, children }) => {
  return (
    <Pressable style={styles.iconList}>
      <HStack style={styles.content}>
        <HStack style={styles.item}>
          <Image source={img} alt="list image" style={styles.img} />
          <AppText style={styles.title}>{title}</AppText>
        </HStack>
        <View style={styles.iconGrid}>
          {children}
          <Feather name="chevron-right" style={styles.icon} />
        </View>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconList: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: perfectSize(18),
    paddingHorizontal: perfectSize(24),
  },
  content: {
    // columnGap: perfectSize(16),
    justifyContent: 'space-between',
  },
  item: {
    // columnGap: perfectSize(16),
  },
  iconGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    // columnGap: perfectSize(8),
  },
  img: {
    height: perfectSize(24),
    width: perfectSize(24),
    resizeMode: 'contain',
  },
  title: {
    fontSize: perfectSize(16),
    // fontFamily: fonts.inter600,
    color: colors.dark,
  },
  icon: {
    fontSize: perfectSize(26),
    color: colors.dark,
  },
})

export default IconList
