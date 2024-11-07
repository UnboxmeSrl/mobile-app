import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useReject} from './hooks';
import {IMAGES} from '../../assets';
import {AppButton} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {perfectSize} from '../../utils';

const RejectedScreen = () => {
  const {handleGuestPress} = useReject();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <Image source={IMAGES.rejected} style={styles.image} />
        <Text allowFontScaling={false} style={styles.title}>
          You have not been approved
        </Text>
        <Text allowFontScaling={false} style={styles.desc}>
          We are sorry but for some reasons we are not able to include you in
          Claris for now! Don’t give up though you may have the potential!
        </Text>
      </View>
      <AppButton
        labelStyle={styles.btnLabel}
        onPress={handleGuestPress}
        style={styles.btn}
        title="Continue as a guest"
      />
    </SafeAreaView>
  );
};

export default RejectedScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#131115',
    padding: perfectSize(24),
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: perfectSize(188),
    width: perfectSize(209),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONTS.quicksandBold,
    color: '#F6475F',
    textAlign: 'center',
    fontSize: perfectSize(32),
    marginTop: perfectSize(85),
    marginBottom: perfectSize(43),
  },
  desc: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: perfectSize(16),
  },
  descriptionContainer: {
    marginTop: verticalScale(10),
    width: '80%',
    alignSelf: 'center',
  },
  btn: {
    height: perfectSize(48),
    borderRadius: perfectSize(16),
  },
  btnLabel: {
    fontSize: perfectSize(18),
    color: '#764837',
    fontFamily: FONTS.quicksandLight,
    textTransform: 'none',
    letterSpacing: 0.36,
  },
});
