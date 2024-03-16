import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import plan from '../../assets/icons/Airplane.png'
import art from '../../assets/icons/Artist-Palette.png'
import mic from '../../assets/icons/Microphone.png'
import ball from '../../assets/icons/Soccer-Ball.png'
import fitness from '../../assets/icons/user.png'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'

import AppText from './AppText'
const Hobbies = ({ titleStyle, style, interest_topics, showIcons, isChecked, type, onClick }) => {
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
    // case 'Science':
    //   icon = science
    //   break
  }
  return (
    <Pressable
      onPress={() => onClick && onClick(!isChecked)}
      style={({ pressed }) => [
        styles.btnStyle,
        {
          backgroundColor: type === 'check' ? (isChecked ? colors.dangerLight : colors.light) : colors.light,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      {type === 'check' && !isChecked && <Icon name="add-outline" style={[styles.icon, styles.addIcon]} />}
      {!!icon && showIcons && <Image source={icon} style={styles.img} />}
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
  addIcon: {
    color: colors.dark,
    fontSize: perfectSize(24),
    marginRight: perfectSize(2),
  },
  btnStyle: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: perfectSize(24),
    flexDirection: 'row',
    height: perfectSize(48),
    justifyContent: 'center',
    paddingHorizontal: perfectSize(16),
  },
  checkIcon: {
    color: colors.dark,
    fontSize: perfectSize(20),
    marginLeft: perfectSize(4),
  },
  img: {
    height: perfectSize(20),
    marginRight: perfectSize(8),
    resizeMode: 'contain',
    width: perfectSize(20),
  },
  title: {
    fontSize: perfectSize(14),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
})

export default Hobbies
