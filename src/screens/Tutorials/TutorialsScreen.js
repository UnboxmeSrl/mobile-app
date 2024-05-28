import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTutorials} from './hooks';
import {COLORS, FONTS} from '../../constants';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';

const TutorialsScreen = () => {
  const {loading, tutorialsList, handleRedirect} = useTutorials();
  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={30} />
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <Text allowFontScaling={false} style={styles.headerTitleText}>
            Tutorials
          </Text>

          <View style={styles.listContainer}>
            <FlatList
              alwaysBounceVertical={false}
              data={tutorialsList}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.btnContainer}
                    activeOpacity={0.7}
                    onPress={() => handleRedirect(item?.link)}>
                    <Text
                      allowFontScaling={false}
                      style={styles.itemTitleText}>{`${item?.title}`}</Text>
                    <Image source={IMAGES.playBlack} style={styles.playIcon} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TutorialsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  playIcon: {
    height: moderateScale(15),
    marginLeft: scale(10),
    marginTop: verticalScale(5),
    tintColor: COLORS.blueViolet,
    width: moderateScale(14.25),
  },
  headerContainer: {
    paddingTop: verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(32),
    color: COLORS.newPrimary,
  },
  listContainer: {
    width: '100%',
    marginTop: verticalScale(70),
  },
  btnContainer: {
    flexDirection: 'row',
    height: verticalScale(56),
    width: '90%',
    backgroundColor: COLORS.veryLight02,
    borderWidth: moderateScale(2),
    borderColor: COLORS.blueViolet,
    borderRadius: moderateScale(18),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  itemTitleText: {
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    color: COLORS.blueViolet,
  },
});
