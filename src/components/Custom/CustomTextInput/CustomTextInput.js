import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomTextInput = (
  {
    placeholder,
    value,
    style,
    handleOnChangeText,
    isRemoveTextIconVisible = false,
    handleReset,
    keyboardType = 'default',
    isSecureTextInput = false,
    inputWrapperStyle,
    search,
    ...props
  },
  ref,
) => {
  const [isFocused, setIsFocused] = useState();
  const [isSecureText, setIsSecureText] = useState(isSecureTextInput);

  return (
    <>
      <View
        style={[
          styles.textInputContainerStyleWithoutFocus,
          isFocused && styles.textInputContainerWithFocus,
          style,
        ]}>
        <View style={[styles.textInputContainer, inputWrapperStyle]}>
          {search && (
            <Icon
              name="search1"
              size={20}
              color={COLORS.grey}
              style={{marginLeft: 12}}
            />
          )}
          <TextInput
            allowFontScaling={false}
            value={value}
            onChangeText={val => {
              handleOnChangeText(val);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.textInput}
            autoCapitalize={'none'}
            placeholder={placeholder}
            placeholderTextColor={COLORS.grey}
            keyboardType={keyboardType}
            secureTextEntry={isSecureText}
            returnKeyType="next"
            {...props}
            ref={ref}
          />
        </View>
        {isRemoveTextIconVisible && value?.length > 0 && (
          <TouchableOpacity style={styles.iconContainer} onPress={handleReset}>
            <Image source={IMAGES.closeSquare} style={styles.closeIcon} />
          </TouchableOpacity>
        )}
        {isSecureTextInput && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              setIsSecureText(!isSecureText);
            }}>
            <Image
              source={isSecureText ? IMAGES.passwordHide : IMAGES.passwordEye}
              style={styles.passwordEyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* {infoText && (
        <View style={styles.infoContainer}>
          <Image style={styles.infoIcon} source={IMAGES.info} />
          <Text style={{paddingHorizontal: '5%', paddingTop: '2%'}}>
            {infoText}
          </Text>
        </View>
      )} */}
    </>
  );
};

export default forwardRef(CustomTextInput);

const styles = StyleSheet.create({
  iconContainer: {
    width: '10%',
  },
  textInputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  textInputContainerWithFocus: {
    borderWidth: moderateScale(2),
    borderColor: COLORS.black,
  },
  passwordEyeIcon: {
    tintColor: COLORS.newPrimary,
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
    width: '90%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  textInput: {
    minWidth: moderateScale(200),
    maxWidth: moderateScale(350),
    marginLeft: scale(10),
    color: COLORS.black,
    fontFamily: FONTS.quicksand,
    fontWeight: '600',
    fontSize: moderateScale(14),
    // backgroundColor: 'yellow',
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '2%',
    backgroundColor: 'yellow',
  },
  infoIcon: {
    height: '100%',
    resizeMode: 'contain',
  },
});
