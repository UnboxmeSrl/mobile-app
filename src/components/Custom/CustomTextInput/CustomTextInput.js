import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {COLORS, FONTS} from '../../../constants';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomTextInput = ({
  placeholder,
  value,
  style,
  handleOnChangeText,
  isRemoveTextIconVisible = false,
  keyboardType = 'default',
  isSecureTextInput = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState();
  const [isSecureText, setIsSecureText] = useState(isSecureTextInput);

  return (
    <View
      style={[
        styles.textInputContainerStyleWithoutFocus,
        isFocused && styles.textInputContainerWithFocus,
        style,
      ]}>
      <View style={styles.textInputContainer}>
        <Icon
          name="search1"
          size={20}
          color={COLORS.grey}
          style={{marginLeft: 12}}
        />
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
        />
      </View>
      {isRemoveTextIconVisible && value?.length > 0 && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            handleOnChangeText('');
          }}>
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
  );
};

export default CustomTextInput;

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
    width: '88%',
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    minWidth: moderateScale(200),
    maxWidth: moderateScale(240),
    marginLeft: scale(10),
    color: COLORS.black,
    fontFamily: FONTS.quicksand,
    fontWeight: '600',
    fontSize: moderateScale(14),
    // backgroundColor: 'yellow',
  },
});
