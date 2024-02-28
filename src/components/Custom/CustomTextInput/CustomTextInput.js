import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../../../assets/images'
import { FONTS } from '../../../constants/fonts'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../constants/colors'

const CustomTextInput = ({
  placeholder,
  value,
  handleOnChangeText,
  isRemoveTextIconVisible = false,
  keyboardType = 'default',
  isSecureTextInput = false,
}) => {
  const [isFocused, setIsFocused] = useState()
  const [isSecureText, setIsSecureText] = useState(isSecureTextInput)

  return (
    <View style={[styles.textInputContainerStyleWithoutFocus, isFocused && styles.textInputContainerWithFocus]}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={value}
          onChangeText={(val) => {
            handleOnChangeText(val)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isSecureText}
        />
      </View>
      {isRemoveTextIconVisible && value?.length > 0 && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            handleOnChangeText('')
          }}
        >
          <Image source={IMAGES.closeSquare} style={styles.closeIcon} />
        </TouchableOpacity>
      )}
      {isSecureTextInput && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setIsSecureText(!isSecureText)
          }}
        >
          <Image source={IMAGES.passwordEye} style={styles.passwordEyeIcon} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  iconContainer: {
    width: '10%',
  },
  textInputContainer: {
    width: '90%',
  },
  textInputContainerWithFocus: {
    borderWidth: moderateScale(2),
    borderColor: COLORS.black,
  },
  passwordEyeIcon: {
    height: moderateScale(16),
    width: moderateScale(22),
  },
  closeIcon: {
    height: moderateScale(12.33),
    width: moderateScale(12.33),
  },
  textInputContainerStyleWithoutFocus: {
    marginTop: verticalScale(15),
    height: verticalScale(48),
    width: '88%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    marginLeft: scale(10),
    fontFamily: FONTS.quicksand,
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
})
