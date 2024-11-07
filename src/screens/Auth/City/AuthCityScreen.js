import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {CustomButton, CustomHeader, CustomTextInput} from '../../../components';
import {COLORS} from '../../../constants';
import {useAuthCity} from './hooks';

const AuthCityScreen = () => {
  const {isBtnDisabled, city, setCity, handleBackPress, handleNextPress} =
    useAuthCity();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title={'City'} step={5} handleBackPress={handleBackPress} />
      <CustomTextInput
        placeholder={'City'}
        value={city}
        handleOnChangeText={setCity}
      />
      <View style={styles.btnContainer}>
        <CustomButton
          title={'Next'}
          handlePress={handleNextPress}
          disabled={isBtnDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthCityScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(170),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
