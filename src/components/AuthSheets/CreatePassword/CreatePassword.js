import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from '../../BottomSheet';
import {CustomButton, CustomTextInput, CustomTitle} from '../../Custom';
import {useCreatePassword} from './hooks';
import {COLORS, FONTS} from '../../../constants';

const CreatePassword = React.forwardRef(({}, ref) => {
  const {
    isBtnDisabled,
    error,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleCreatePasswordPress,
  } = useCreatePassword();

  return (
    <BottomSheet ref={ref}>
      <View style={styles.mainContainer}>
        <CustomTitle title={'Create a password'} />
        <CustomTextInput
          placeholder={'Create a password'}
          value={password}
          handleOnChangeText={setPassword}
          isSecureTextInput={true}
        />
        <CustomTextInput
          placeholder={'Confirm password'}
          value={confirmPassword}
          handleOnChangeText={setConfirmPassword}
          isSecureTextInput={true}
        />
        {error?.message && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error?.message}</Text>
          </View>
        )}

        <View style={styles.btnContainer}>
          <CustomButton
            title={'Continue'}
            handlePress={() => handleCreatePasswordPress(ref)}
            disabled={isBtnDisabled}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

export default CreatePassword;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
  },
  errorContainer: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  btnContainer: {
    marginTop: '30%',
  },
  codeDescriptionText: {
    fontFamily: FONTS.quicksand,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  codeDescriptionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: verticalScale(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
});
