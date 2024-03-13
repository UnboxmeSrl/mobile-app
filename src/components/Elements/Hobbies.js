import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

const Hobbies = ({ titleStyle, style, icon, title, type }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePress = () => {
    setIsChecked(!isChecked)
  }
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btnStyle,
        style,
        { opacity: pressed ? 0.8 : 1, backgroundColor: isChecked ? colors.dangerLight : colors.light },
      ]}
      onPress={handlePress}
    >
      {type === 'check' && !isChecked && <Icon name="add-outline" style={[styles.icon, styles.addIcon]} />}
      {!!icon && <Image source={icon} style={styles.img} />}
      <AppText style={[styles.title, titleStyle, { color: isChecked ? colors.danger : colors.dark }]}>{title}</AppText>
      {type === 'check' && isChecked ? (
        <Icon name="checkmark-sharp" style={[styles.checkIcon, { color: isChecked ? colors.danger : colors.dark }]} />
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    height: perfectSize(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(16),
    borderRadius: perfectSize(24),
    backgroundColor: colors.light,
  },
  title: {
    fontSize: perfectSize(14),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  img: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
    marginRight: perfectSize(8),
  },
  addIcon: {
    marginRight: perfectSize(2),
    fontSize: perfectSize(24),
    color: colors.dark,
  },
  checkIcon: {
    marginLeft: perfectSize(4),
    fontSize: perfectSize(20),
    color: colors.dark,
  },
})

export default Hobbies
