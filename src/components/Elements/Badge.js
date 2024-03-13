import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from '../Elements/AppText'

const Badge = ({ title, style, titleStyle, iconStyle, icon, onPress, variant = 'success' }) => {
  const getBadgeStyle = () => {
    if (variant === 'success') {
      return styles.badgeSuccess
    } else if (variant === 'primary') {
      return styles.badgePrimary
    } else if (variant === 'light') {
      return styles.badgeLight
    }
    // Add more variants as needed
  }

  const getTitleStyle = () => {
    if (variant === 'success') {
      return styles.titleSuccess
    } else if (variant === 'primary') {
      return styles.titlePrimary
    } else if (variant === 'light') {
      return styles.titleLight
    }
    // Add more variants as needed
  }

  const getIconStyle = () => {
    if (variant === 'success') {
      return styles.iconSuccess
    } else if (variant === 'primary') {
      return styles.iconPrimary
    } else if (variant === 'light') {
      return styles.iconLight
    }
    // Add more variants as needed
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.btnStyle, getBadgeStyle(), style, { opacity: pressed ? 0.8 : 1 }]}
      onPress={onPress}
    >
      {!!icon && <Icon name={icon} style={[getIconStyle(), styles.iconStyle, iconStyle]} />}
      {!!title && <AppText style={[getTitleStyle(), styles.titleStyle, titleStyle]}>{title}</AppText>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  //-------- App Button --------//
  btnStyle: {
    height: perfectSize(40),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(16),
    borderRadius: perfectSize(50),
    // columnGap: perfectSize(12),
  },
  badgeSuccess: {
    backgroundColor: colors.successLight,
  },
  badgePrimary: {
    backgroundColor: colors.primaryLight,
  },
  badgeLight: {
    backgroundColor: colors.light,
  },
  titleStyle: {
    fontSize: perfectSize(12),
    // fontFamily: fonts.inter500,
    textTransform: 'capitalize',
  },
  titleSuccess: {
    color: colors.success,
  },
  titlePrimary: {
    color: colors.primary,
  },
  titleLight: {
    color: colors.infoLight,
  },
  iconStyle: {
    fontSize: perfectSize(22),
    marginRight: perfectSize(8),
  },
  iconSuccess: {
    color: colors.success,
  },
  iconPrimary: {
    color: colors.primary,
  },
  iconLight: {
    color: colors.infoLight,
  },
})

export default Badge
