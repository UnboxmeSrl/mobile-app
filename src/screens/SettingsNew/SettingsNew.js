import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {CommonHeader, CustomButton} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useSettings} from './hooks';

const SettingsNew = () => {
  const {
    versionName,
    isDeleting,
    isLoading,
    handleDeleteAccount,
    handleLogout,
  } = useSettings();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CommonHeader title={'Settings'} />

      <View style={styles.btnMainContainer}>
        <TouchableOpacity
          disabled={isDeleting}
          onPress={handleDeleteAccount}
          style={[
            styles.btnContainer,
            isDeleting && styles.disabledBtnContainer,
          ]}>
          {isDeleting ? (
            <ActivityIndicator size={30} color={COLORS.black22} />
          ) : (
            <Text
              style={[styles.btnText, isDeleting && styles.disabledBtnText]}>
              Delete Account
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <CustomButton
        title={'Logout'}
        handlePress={handleLogout}
        isLoading={isLoading}
        disabled={isLoading}
      />

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>{versionName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsNew;

const styles = StyleSheet.create({
  versionText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: scale(20),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightRed,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  btnMainContainer: {
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    marginBottom: verticalScale(-30),
    width: '100%',
  },
  btnText: {
    color: COLORS.error,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
  },
  disabledBtnText: {
    color: COLORS.gray,
  },
  disabledBtnContainer: {
    backgroundColor: COLORS.cultured,
  },
});
