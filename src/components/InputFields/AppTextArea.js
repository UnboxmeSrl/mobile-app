import React, { forwardRef, memo } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from '../Elements/AppText'

function AppTextArea(
  {
    label,
    placeholder,
    style,
    inputStyle,
    textInputStyle,
    value,
    isDisabled,
    errors,
    autoCapitalize = 'none',
    ...rest
  },
  ref
) {
  return (
    <View style={[styles.appInput, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput
        ref={ref}
        placeholder={placeholder}
        style={[styles.textInput, textInputStyle]}
        placeholderTextColor={colors.slate1}
        autoCapitalize={autoCapitalize}
        editable={!isDisabled}
        multiline
        numberOfLines={4}
        value={value}
        {...rest}
        textAlignVertical="top"
      />
      {errors && <AppText style={styles.warningText}> {errors} </AppText>}
    </View>
  )
}
export default memo(forwardRef(AppTextArea))

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
  textInput: {
    width: '100%',
    backgroundColor: colors.light,
    borderRadius: perfectSize(18),
    paddingHorizontal: perfectSize(24),
    paddingVertical: perfectSize(20),
    color: colors.dark,
  },
  warningText: {
    fontSize: perfectSize(12),
    color: colors.danger,
    marginTop: 2,
  },
})
