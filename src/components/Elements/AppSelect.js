import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS} from '../../constants';

export default function AppSelect({
  data,
  setSelectedValue,
  selectedValue,
  onSelect,
  placeholder,
  textStyle,
  ...rest
}) {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        setSelectedValue(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={[styles.dropdownButtonTxtStyle, textStyle]}>
              {(selectedValue && selectedValue.name) || placeholder}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: '#D2D9DF'}),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    color: COLORS.gray,
    fontSize: moderateScale(14),
  },
  dropdownButtonArrowStyle: {
    fontSize: moderateScale(20),
    color: COLORS.davyGrey,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: moderateScale(14),
    color: COLORS.dark,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
