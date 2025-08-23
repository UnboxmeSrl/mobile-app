import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {COLORS, FONTS} from '../../../constants';
import {BottomSheet} from '../../BottomSheet';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {IMAGES} from '../../../assets';
import {perfectSize} from '../../../utils';

const SocialMediaSheet = React.forwardRef(
  (
    {
      title,
      description,
      placeholder,
      showInfoText,
      field,
      onChangeText,
      handlePress,
      disabled,
      defualtInfoMsg,
      defaultUrl,
      setTiktokInputValue,
    },
    ref,
  ) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const inputRef = React.useRef(null);

    // const [url, setUrl] = useState(defaultUrl);
    // const [errorText, setErrorText] = useState(showInfoText ?? '');

    useEffect(() => {
      // console.log(field.trim(), 'field');
      if (field?.trim()?.length > 2) {
        setIsBtnDisabled(false);
      } else {
        setIsBtnDisabled(true);
      }
    }, [field]);
    // console.log(showInfoText, 'showInfoText', defualtInfoMsg, 'defualtInfoMsg');
    useEffect(() => {
      // Focus and position cursor at end
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setNativeProps({
          selection: {start: defaultUrl.length},
        });
      }, 100);
    }, [defaultUrl?.length]);

    return (
      <BottomSheet ref={ref}>
        <View style={styles.mainContainer}>
          <View>
            <CustomTitle title={`${title}`} />
            <View style={styles.descriptionContainer}>
              <Text
                allowFontScaling={false}
                style={styles.descriptionText}>{`${description}`}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <CustomTextInput
                inputWrapperStyle={{paddingLeft: scale(10)}}
                textInputStyle={{
                  minWidth: moderateScale(130),
                  maxWidth: moderateScale(150),
                  alignItems: 'center',
                  marginLeft: moderateScale(-3),
                }}
                ref={inputRef}
                placeholder={`${placeholder}`}
                value={field}
                PrefixValue={defaultUrl}
                handleOnChangeText={onChangeText}
                isRemoveTextIconVisible={true}
                handleReset={() => onChangeText('')}
                // multiLine
              />
              {!!showInfoText && (
                <View style={styles.infoContainer}>
                  <Image style={styles.infoIcon} source={IMAGES.info} />
                  <View style={{width: '90%', flexWrap: 'wrap'}}>
                    <Text
                      style={[
                        {width: '95%'},
                        !defualtInfoMsg && {color: COLORS.redFont},
                      ]}>
                      {showInfoText}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.belowContainer}>
            <View style={styles.descriptionContainer}>
              <Text
                allowFontScaling={false}
                style={
                  styles.descriptionText
                }>{`And send us a message to prove you’re the account owner`}</Text>
            </View>
            <CustomButton
              title={'Add'}
              handlePress={handlePress}
              // disabled={disabled || isBtnDisabled}
            />
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
    justifyContent: 'space-between',
    // paddingBottom: verticalScale(12),
    // backgroundColor: 'yellow',
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
    backgroundColor: COLORS.white,
  },
  belowContainer: {
    // marginTop: '30%',
    // backgroundColor: 'cyan',
    paddingBottom: verticalScale(12),
  },
  infoContainer: {
    // width: '90%',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '2%',
    alignItems: 'flex-start',
    fontFamily: FONTS.quicksand,
    // fontWeight: '400',
    // backgroundColor: 'yellow',
  },
  infoIcon: {
    height: scale(16),
    resizeMode: 'contain',
  },
});
