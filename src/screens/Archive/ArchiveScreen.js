import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {useArchive} from './hooks';

const ArchiveScreen = () => {
  const {isLoading, refreshing, onRefresh, canceledBookings, handleBackPress} =
    useArchive();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}>
          <Image
            resizeMode="cover"
            source={IMAGES.back}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleText}>Archive</Text>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={20} />
        </View>
      ) : (
        <FlatList
          data={canceledBookings}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text style={styles.emptyComponentText}>No Data Found.</Text>
            </View>
          }
          renderItem={({item, index}) => {
            const myDate = new Date(item?.BookingDay);
            const month = myDate.toLocaleString('en-US', {month: 'long'});
            const weekDay = myDate.toLocaleString('en-US', {weekday: 'long'});
            const timeFrame = item?._timeframes_turbo;
            const actionNumId = item?._actions_turbo?.action_num_id;
            return (
              <View style={styles.cardContainer}>
                <View style={styles.cardContentContainer}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.selectedDateMonthText}>{month}</Text>
                    <Text style={styles.selectedDateNumberText}>
                      {myDate?.getDate()}
                    </Text>
                    <Text style={styles.selectedDateDayText}>
                      {weekDay?.slice(0, 3)}
                    </Text>
                  </View>

                  <View style={styles.timeServiceContainer}>
                    {actionNumId !== 9 && (
                      <>
                        <View style={styles.timeContainer}>
                          <Text style={styles.timeTitleText}>Time</Text>
                          <Text style={styles.timeText}>
                            {`${timeFrame?.Start}:${timeFrame?.Minute_Start} - ${timeFrame?.End}:${timeFrame?.Minute_End}`}
                          </Text>
                        </View>
                        <View style={styles.divider} />
                      </>
                    )}
                    <View style={styles.serviceRequestedContainer}>
                      <Text style={styles.serviceRequestedTitleText}>
                        Service Requested
                      </Text>
                      <Text
                        style={styles.serviceRequestedText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item?._offers_turbo?.Offer_Name}
                      </Text>
                    </View>
                  </View>
                  {/* <View style={styles.rightIconContainer}>
                    <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
                  </View> */}
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  cardContentContainer: {
    flexDirection: 'row',
  },
  timeServiceContainer: {
    width: '90%',
  },
  rightIconContainer: {
    width: '15%',
    marginBottom: verticalScale(20),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  backIconContainer: {
    alignItems: 'flex-end',
    width: '15%',
  },
  cardContainer: {
    alignSelf: 'center',
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(16),
    paddingBottom: verticalScale(15),
    width: '95%',
    height: verticalScale(132),
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    height: verticalScale(132),
    justifyContent: 'center',
    width: scale(80.68),
  },
  divider: {
    alignSelf: 'center',
    borderColor: COLORS.lightPink,
    borderWidth: moderateScale(1),
    marginTop: verticalScale(9),
    width: '100%',
  },
  emptyComponentContainer: {
    marginTop: '70%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyComponentText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
  },
  headerTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rightIcon: {
    height: moderateScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{rotate: '180deg'}],
    width: moderateScale(25),
  },
  selectedDateDayText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
  selectedDateMonthText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(24),
    textAlign: 'center',
  },
  serviceRequestedContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(8),
  },
  serviceRequestedText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    width: '80%',
  },
  serviceRequestedTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  timeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(13),
    width: '100%',
  },
  timeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
  },
  timeTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
});
