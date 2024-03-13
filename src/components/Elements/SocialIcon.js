import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextProps, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import perfectSize from '../../utils/responsiveSize'
import { colors} from '../../utils/theme'

function SocialIcon({ title, icon, onPress }) {
  const [isActive, setIsActive] = useState(false)

  const handlePress = () => {
    setIsActive((prevState) => {
      if (onPress) {
        onPress() // Notify parent component about the change in the active state
      }
      return !prevState
    })
  }
  return (
    <Pressable style={styles.socialView} onPress={handlePress}>
      <View style={[styles.iconView, { backgroundColor: isActive ? colors.danger : colors.white }]}>
        <Ionicons name={icon} style={[styles.icon, { color: isActive ? colors.white : colors.danger }]} />
      </View>
      <Text style={[styles.title, { color: isActive ? colors.danger : colors.infoLight }]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  socialView: {
    flexDirection: 'column',
    alignItems: 'center',
    // rowGap: perfectSize(10),
  },
  iconView: {
    height: perfectSize(48),
    width: perfectSize(48),
    borderRadius: perfectSize(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF385C3D',
  },
  icon: {
    fontSize: perfectSize(20),
    color: colors.danger,
  },
  title: {
    fontSize: perfectSize(12),
    // fontFamily: fonts.inter400,
    color: colors.infoLight,
  },
})
export default SocialIcon
