import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../assets';
import {COLORS, FONTS, SCREEN_NAMES} from '../../constants';
import {selectAppInfo} from '../../redux';
import {useYourScheduleDetails} from './hooks';
import {navigate} from '../../services';

const AppInfo = ({route}) => {
  // const appInfo = useSelector(selectAppInfo);
  const appInfo = useSelector(selectAppInfo)?.description;
  // console.log('appInfo', appInfo);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainScrollView}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigate('back')}
              style={styles.backIconContainer}>
              <Image
                resizeMode="cover"
                source={IMAGES.back}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text allowFontScaling={false} style={styles.headerTitleText}>
                How it works
              </Text>
            </View>
          </View>
          <View>
            {/* <Text>AppInfo</Text> */}
            <Text>{appInfo}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: scale(18),
    backgroundColor: COLORS.white,
  },
  mainScrollView: {
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  backIconContainer: {
    alignItems: 'flex-end',
    width: '15%',
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
});
