import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../constants';

const Categories = ({categories, selectedIndex, onCategoryChange}) => {
  return (
    <View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              onPress={() => onCategoryChange(index, item)}
              style={[
                styles.containerStyle,
                isSelected && {backgroundColor: COLORS.newPrimary},
              ]}>
              <Text
                style={[
                  styles.categoryName,
                  isSelected && {
                    color: COLORS.white,
                    fontFamily: FONTS.quicksandBold,
                  },
                ]}>
                {item?.CategoryName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryName: {
    color: COLORS.black,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(15),
  },
  containerStyle: {
    backgroundColor: COLORS.lightNewPrimary,
    marginLeft: scale(10),
    marginVertical: verticalScale(10),
    height: verticalScale(30),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
