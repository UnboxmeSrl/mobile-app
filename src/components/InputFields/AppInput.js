import React, { ForwardedRef, forwardRef, memo } from 'react'
import { FieldError } from 'react-hook-form'
import { Image, Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import perfectSize from '../../utils/responsiveSize'
import { colors, fonts } from '../../utils/theme'
import AppText from '../Elements/AppText'

function AppInput(
  {
    label,
    placeholder,
    style,
    inputStyle,
    textInputStyle,
    value,
    isDisabled,
    errors,
    icon,
    img,
    link,
    onPress,
    onChange,
    autoCapitalize = 'none',
    ...rest
  },
  ref
) {
  return (
    <View style={[styles.appInput, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={[styles.inputWrapper, inputStyle]}>
        {icon && <Icon name={icon} style={styles.icon} />}
        {img && <Image source={img} style={styles.img} />}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={[styles.textInput, textInputStyle]}
          placeholderTextColor={colors.slate1}
          numberOfLines={1}
          autoCapitalize={autoCapitalize}
          editable={!isDisabled}
          // onFocus={Keyboard.emit}
          // ellipsizeMode="tail"
          onChangeText={onChange}
          value={value}
          {...rest}
        />
        {link && (
          <Pressable onPress={onPress}>
            <AppText style={styles.linkText}>Paste</AppText>
          </Pressable>
        )}
      </View>
      {errors && <AppText style={styles.warningText}> {errors} </AppText>}
    </View>
  )
}
export default memo(forwardRef(AppInput))

const styles = StyleSheet.create({
  appInput: {
    marginBottom: perfectSize(16),
    width: '100%',
  },
  label: {
    fontSize: perfectSize(14),
    fontWeight: '500',
    // fontFamily: fonts.inter500,
    color: colors.infoLight,
    textTransform: 'capitalize',
    marginBottom: perfectSize(8),
  },
  icon: {
    fontSize: perfectSize(24),
    color: '#00000066',
  },
  img: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
  },
  inputWrapper: {
    height: perfectSize(64),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: perfectSize(18),
    paddingHorizontal: perfectSize(24),
    paddingVertical: 0,
  },
  textInput: {
    height: '100%',
    flex: 1,
    zIndex: -1,
    fontSize: perfectSize(14),
    color: colors.dark,
    paddingHorizontal: perfectSize(10),
    paddingVertical: 0,
  },
  linkText: {
    fontSize: perfectSize(14),
    fontWeight: '700',
    color: colors.danger,
  },
  warningText: {
    fontSize: perfectSize(12),
    color: colors.danger,
    marginTop: 2,
  },
})
