import React, {forwardRef, memo} from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, perfectSize} from '../../utils';
import AppText from './AppText';
import {COLORS} from '../../constants';

const AppInput = (
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
  ref,
) => {
  console.log('isDisabled', isDisabled);
  return (
    <View style={[styles.appInput, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={[styles.inputWrapper, inputStyle]}>
        {icon && <Icon name={icon} color={'yellow'} style={styles.icon} />}
        {img && <Image source={img} style={styles.img} />}
        <TextInput
          allowFontScaling={false}
          autoCapitalize={autoCapitalize}
          editable={!isDisabled}
          numberOfLines={1}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.slate1}
          ref={ref}
          style={[
            styles.textInput,
            textInputStyle,
            isDisabled && {color: '#00000025'},
          ]}
          // onFocus={Keyboard.emit}
          // ellipsizeMode="tail"
          value={value}
          {...rest}
        />
        {link && (
          <Pressable onPress={isDisabled ? null : onPress}>
            <AppText
              style={[
                styles.linkText,
                isDisabled && {color: COLORS.dangerLight},
              ]}>
              Paste
            </AppText>
          </Pressable>
        )}
      </View>
      {errors && <AppText style={styles.warningText}> {errors} </AppText>}
    </View>
  );
};
export default memo(forwardRef(AppInput));

const styles = StyleSheet.create({
  appInput: {
    marginBottom: perfectSize(16),
    width: '100%',
  },
  icon: {
    color: '#00000066',
    fontSize: perfectSize(24),
  },
  img: {
    height: perfectSize(20),
    resizeMode: 'contain',
    width: perfectSize(20),
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: perfectSize(18),
    flexDirection: 'row',
    height: perfectSize(64),
    paddingHorizontal: perfectSize(24),
    paddingVertical: 0,
    width: '100%',
  },
  label: {
    // fontFamily: fonts.inter500,
    color: colors.infoLight,

    fontSize: perfectSize(14),

    fontWeight: '500',
    marginBottom: perfectSize(8),
    textTransform: 'capitalize',
  },
  linkText: {
    color: colors.danger,
    fontSize: perfectSize(14),
    fontWeight: '700',
  },
  textInput: {
    color: colors.dark,
    flex: 1,
    fontSize: perfectSize(14),
    height: '100%',
    paddingHorizontal: perfectSize(10),
    paddingVertical: 0,
    zIndex: -1,
  },
  warningText: {
    color: colors.danger,
    fontSize: perfectSize(12),
    marginTop: 2,
  },
});
