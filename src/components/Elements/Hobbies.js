import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'
import ball from '../../assets/icons/Soccer-Ball.png'
import art from '../../assets/icons/Artist-Palette.png'
import mic from '../../assets/icons/Microphone.png'
import fitness from '../../assets/icons/user.png'
import plan from '../../assets/icons/Airplane.png'
const Hobbies = ({ titleStyle, style, interest_topics, isChecked, type, onClick }) => {
  // const [isChecked, setIsChecked] = useState(false)
  let icon = null
  switch (interest_topics) {
    case 'Gaming':
      icon = ball
      break
    case 'Music':
      icon = mic
      break
    case 'Digital Art':
      icon = art
      break
    case 'Travel':
      icon = plan
      break
    case 'Sports':
      icon = ball
      break
    case 'Fitness':
      icon = fitness
      break
  }
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.btnStyle,
        {
          opacity: pressed ? 0.8 : 1,
          backgroundColor: type === 'check' ? (isChecked ? colors.dangerLight : colors.light) : colors.light,
        },
        style,
      ]}
    >
      {type === 'check' && !isChecked && <Icon name="add-outline" style={[styles.icon, styles.addIcon]} />}
      {!!icon && <Image source={icon} style={styles.img} />}
      <AppText
        style={[
          styles.title,
          { color: type === 'check' ? (isChecked ? colors.danger : colors.dark) : colors.dark },
          titleStyle,
        ]}
      >
        {interest_topics}
      </AppText>
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
