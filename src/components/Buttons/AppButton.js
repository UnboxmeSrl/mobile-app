import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {colors, perfectSize} from '../../utils';
import {AppText} from '../Elements';
import {COLORS} from '../../constants';

const AppButton = ({
  title,
  style,
  icon,
  img,
  labelStyle,
  imgStyle,
  iconStyle,
  onPress,
  disabled,
  variant = 'block',
}) => {
  const getButtonStyle = () => {
    if (variant === 'block') {
      return [styles.buttonBlock, disabled && styles.disabledButton];
    } else if (variant === 'outline') {
      return [styles.buttonOutline, disabled && styles.disabledOutlineButton];
    }
    // Add more variants as needed
  };

  const getTitleStyle = () => {
    if (variant === 'block') {
      return [styles.titleBlock, disabled && styles.disabledText];
    } else if (variant === 'outline') {
      return [styles.titleOutline, disabled && styles.disabledText];
    }
    // Add more variants as needed
  };

  const getIconStyle = () => {
    if (variant === 'block') {
      return [styles.iconBlock, disabled && styles.disabledIcon];
    } else if (variant === 'outline') {
      return [styles.iconOutline, disabled && styles.disabledIcon];
    }
    // Add more variants as needed
  };

  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        styles.btnStyle,
        getButtonStyle(),
        style,
        {opacity: pressed ? 0.6 : 1},
      ]}
      onPress={onPress}>
      {!!img && <Image source={img} style={[styles.imgStyle, imgStyle]} />}
      {/* {!!icon && (
        <Icon
          name={icon}
          style={[getIconStyle(), styles.iconStyle, iconStyle]}
        />
      )} */}
      <AppText style={[getTitleStyle(), styles.titleStyle, labelStyle]}>
        {title}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: perfectSize(64),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(24),
    borderRadius: perfectSize(24),
    // columnGap: perfectSize(8),
    borderWidth: 1,
  },
  buttonBlock: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  buttonOutline: {
    borderColor: colors.danger,
  },
  titleStyle: {
    fontSize: perfectSize(18),
    color: COLORS.black,
    // fontFamily: fonts.inter700,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  titleBlock: {
    color: colors.white,
  },
  titleOutline: {
    color: colors.danger,
  },
  iconStyle: {
    fontSize: perfectSize(22),
  },
  iconBlock: {
    color: colors.white,
  },
  iconOutline: {
    color: colors.danger,
  },
  // styles for disabled state
  disabledButton: {
    backgroundColor: colors.light,
    borderColor: colors.light,
  },
  disabledOutlineButton: {
    borderColor: colors.slate1,
  },
  disabledText: {
    color: colors.slate1,
  },
  disabledIcon: {
    color: colors.slate1,
  },
  imgStyle: {
    width: perfectSize(20),
    height: perfectSize(20),
    resizeMode: 'contain',
    marginRight: perfectSize(8),
  },
});

export default AppButton;
