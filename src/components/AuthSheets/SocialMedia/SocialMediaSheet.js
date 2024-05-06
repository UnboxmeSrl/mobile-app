import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {COLORS, FONTS} from '../../../constants';
import {BottomSheet} from '../../BottomSheet';

const SocialMediaSheet = React.forwardRef(
  (
    {title, description, placeholder, field, onChangeText, handlePress},
    ref,
  ) => {
    return (
      <BottomSheet ref={ref}>
        <View style={styles.mainContainer}>
          <CustomTitle title={`${title}`} />
          <View style={styles.descriptionContainer}>
            <Text
              allowFontScaling={false}
              style={styles.descriptionText}>{`${description}`}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <CustomTextInput
              placeholder={`${placeholder}`}
              value={field}
              handleOnChangeText={onChangeText}
              isRemoveTextIconVisible={true}
            />
          </View>

          <View style={styles.belowContainer}>
            <View style={styles.descriptionContainer}>
              <Text
                allowFontScaling={false}
                style={
                  styles.descriptionText
                }>{`And send us a message to prove you’re the account owner`}</Text>
            </View>
            <CustomButton title={'Add'} handlePress={handlePress} />
          </View>
        </View>
      </BottomSheet>
    );
  },
);

export default SocialMediaSheet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    fontWeight: '400',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginLeft: scale(15),
    marginTop: verticalScale(12),
    width: '90%',
  },
  fieldContainer: {
    marginTop: verticalScale(10),
  },
  belowContainer: {
    marginTop: '30%',
  },
});
