import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
// import DeviceInfo from 'react-native-device-info'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {COLORS, FONTS} from '../../constants';
import {useBookingDetails} from './hooks';

const BookingDetailsScreen = () => {
  const {
    actionNumId,
    datesBlacklistFunc,
    currentWeekDay,
    currentDate,
    selectedTimeFame,
    setSelectedTimeFame,
    startDate,
    weekDayWiseTimeSlots,
    endDate,
    selectedDate,
    currentMonth,
    isLoading,
    // isDateAvailable,
    isDatesLoading,
    showPreviousWeek,
    showNextWeek,
    handleBackPress,
    setSelectedDate,
    handleConfirmBtnPress,
    handleRemoveBtnPress,
  } = useBookingDetails();

  //   const renderDate = (date) => {
  //     const isAvailable = isDateAvailable(date)
  //     const dateStyle = isAvailable ? { color: 'black' } : { color: 'gray' }
  //     return (
  //       <TouchableOpacity onPress={() => setSelectedDate(date)}>
  //         <View>
  //           {/* <Text allowFontScaling={false}  style={{ color: 'black' }}>{date.format('dd')}</Text>
  //           <Text allowFontScaling={false}  style={dateStyle}>{date.format('D')}</Text> */}
  //         </View>
  //       </TouchableOpacity>
  //     )
  //   }
  console.log('WeekDayWiseTimeSlots', weekDayWiseTimeSlots);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainScrollView}>
      {isDatesLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={30} />
        </View>
      ) : (
        <>
          <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerAndDateContainer}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                  <Image
                    resizeMode="cover"
                    source={IMAGES.back}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>

                <View>
                  <Text
                    allowFontScaling={false}
                    style={styles.dateSelectTitleText}>
                    Select a Date
                  </Text>
                </View>

                <View style={styles.calendarContainer}>
                  {/* This need to remove in future */}
                  {/* <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text allowFontScaling={false} >{DeviceInfo.getBrand()}</Text>
                    <Text allowFontScaling={false} > {DeviceInfo.getBuildNumber()}</Text>
                    <Text allowFontScaling={false} > {DeviceInfo.getSystemVersion()}</Text>
                    <Text allowFontScaling={false} > {DeviceInfo.getModel()}</Text>
                  </View> */}
                  {/* only above one line and style={{ alignItems: 'center' }} */}
                  <Image
                    resizeMode="cover"
                    source={IMAGES.calender}
                    style={styles.calenderIcon}
                  />
                </View>
              </View>
              {/* <DateTimePicker display="inline" value={new Date()} /> */}
              <View style={styles.calendarMainContainer}>
                <View style={styles.dateHeader}>
                  <View>
                    <Text
                      allowFontScaling={false}
                      style={styles.selectedMonthName}>
                      {currentMonth}
                    </Text>
                  </View>
                  <View style={styles.previousNextIconsContainer}>
                    <TouchableOpacity onPress={showPreviousWeek}>
                      <Image
                        resizeMode="cover"
                        source={IMAGES.back}
                        style={styles.previousDatesIcon}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showNextWeek}>
                      <Image
                        resizeMode="cover"
                        source={IMAGES.back}
                        style={styles.nextDatesIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <CalendarStrip
                  calendarHeaderStyle={styles.calendarHeaderStyle}
                  dateNameStyle={styles.dateNameStyle}
                  dateNumberStyle={styles.dateNumberStyle}
                  datesBlacklist={datesBlacklistFunc}
                  endDate={endDate}
                  highlightDateContainerStyle={styles.highlightedDateContainer}
                  highlightDateNameStyle={styles.highlightDateNameStyle}
                  highlightDateNumberStyle={styles.highlightDateNumberStyle}
                  iconContainer={styles.calendarStripIconContainer}
                  iconLeft={IMAGES.back}
                  iconRight={IMAGES.back}
                  iconStyle={styles.calendarStripIcon}
                  onDateSelected={date => setSelectedDate(date)}
                  selectedDate={selectedDate}
                  showMonth={false}
                  showYear={false}
                  startingDate={startDate}
                  //   renderDate={renderDate}
                />
              </View>
              <View />
            </View>
            <View style={styles.availableHoursContainer}>
              {actionNumId !== 9 && (
                <>
                  <View style={styles.availableHoursTitleContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.availableHoursTitleText}>
                      Available Hours
                    </Text>
                  </View>

                  <View style={styles.timeSlotsMainContainer}>
                    {weekDayWiseTimeSlots.length === 0 && (
                      <View style={styles.listEmptyContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.listEmptyText}>
                          Not available on this day.
                        </Text>
                      </View>
                    )}
                    {!isDatesLoading &&
                      weekDayWiseTimeSlots?.map((item, index) => {
                        let isShow = true;
                        let isSelected = item?.id === selectedTimeFame?.id;
                        // console.log(selectedTimeFame?.id, index === 0);
                        // if (item?.id === selectedTimeFame?.id) {
                        //   isSelected = true;
                        //   setSelectedTimeFame(item);
                        // }
                        const dayData = item?.weekdays?.filter(
                          wt => wt?.day === currentWeekDay,
                        );
                        if (dayData?.length === 0) {
                          isShow = false;
                        }
                        return (
                          isShow && (
                            <TouchableOpacity
                              onPress={() => setSelectedTimeFame(item)}
                              style={[
                                styles.hoursContainer,
                                isSelected && styles.selectedTimeFrameStyle,
                              ]}>
                              <Image
                                resizeMode="cover"
                                source={IMAGES.timeCircle}
                                style={styles.timeCircleIcon}
                              />
                              <Text
                                allowFontScaling={false}
                                style={
                                  styles.timingText
                                }>{`${item?.Start}:${item?.Minute_Start} - ${item?.End}:${item?.Minute_End}`}</Text>
                            </TouchableOpacity>
                          )
                        );
                      })}
                  </View>
                  {/* {!isDatesLoading && (
                    <FlatList
                      ListEmptyComponent={
                        <View style={styles.listEmptyContainer}>
                          <Text allowFontScaling={false}  style={styles.listEmptyText}>
                            Not available on this day.
                          </Text>
                        </View>
                      }
                      data={weekDayWiseTimeSlots}
                      keyExtractor={(_, index) => index.toString()}
                      numColumns={2}
                      renderItem={({item, index}) => {
                        let isShow = true;
                        let isSelected = item?.id === selectedTimeFame?.id;
                        if (!selectedTimeFame?.id && index === 0) {
                          isSelected = true;
                          setSelectedTimeFame(item);
                        }
                        const dayData = item?.weekdays?.filter(
                          wt => wt?.day === currentWeekDay,
                        );
                        if (dayData?.length === 0) {
                          isShow = false;
                        }
                        return (
                          isShow && (
                            <TouchableOpacity
                              onPress={() => setSelectedTimeFame(item)}
                              style={[
                                styles.hoursContainer,
                                isSelected && styles.selectedTimeFrameStyle,
                              ]}>
                              <Image
                                resizeMode="cover"
                                source={IMAGES.timeCircle}
                                style={styles.timeCircleIcon}
                              />
                              <Text allowFontScaling={false} 
                                style={
                                  styles.timingText
                                }>{`${item?.Start}.${item?.Minute_Start} - ${item?.End}.${item?.Minute_End}`}</Text>
                            </TouchableOpacity>
                          )
                        );
                      }}
                    />
                  )} */}
                </>
              )}
              <View style={styles.sendMessageTitleContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.sendMessageTitleText}>
                  Send Message (Optional)
                </Text>
              </View>
              <View style={styles.sendMessageTextContainer}>
                <TextInput
                  allowFontScaling={false}
                  numberOfLines={2}
                  placeholderTextColor={COLORS.gray}
                  style={styles.sendMessageTextInput}
                  multiline
                  placeholder="Ask owner your specific questions about this appointment"
                />
              </View>

              <View style={styles.selectedDateMainContainer}>
                <View style={styles.selectedDateContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.selectedDateNumberText}>
                    {currentDate}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.selectedDateMonthText}>
                    {currentMonth?.slice(0, 3)}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.selectedDateTitleText}>
                    Selected Date
                  </Text>
                  {actionNumId !== 9 && selectedTimeFame?.Start ? (
                    <Text
                      allowFontScaling={false}
                      style={
                        styles.selectedDateWithTimeText
                      }>{`${currentWeekDay},  ${selectedTimeFame?.Start}:${selectedTimeFame?.Minute_Start} - ${selectedTimeFame?.End}:${selectedTimeFame?.Minute_End}`}</Text>
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={
                        styles.selectedDateWithTimeText
                      }>{`${currentWeekDay}`}</Text>
                  )}
                </View>
                {actionNumId === 9 ? (
                  <View style={styles.innerCalendarIconContainer}>
                    <Image
                      source={IMAGES.calender}
                      style={styles.innerCalendarIcon}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRemoveBtnPress}
                    style={styles.removeBtnContainer}>
                    <Text allowFontScaling={false} style={styles.removeBtnText}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </SafeAreaView>
          <View style={styles.bookBtnMainContainer}>
            {isLoading ? (
              <View style={styles.bookBtnContainer}>
                <ActivityIndicator color={COLORS.black22} size={30} />
              </View>
            ) : (
              <TouchableOpacity
                disabled={
                  !selectedTimeFame?.id && actionNumId !== 9 && !isLoading
                }
                onPress={handleConfirmBtnPress}
                style={[
                  styles.bookBtnContainer,
                  (selectedTimeFame?.id || actionNumId === 9) && {
                    backgroundColor: COLORS.newPrimary,
                  },
                ]}>
                <Text allowFontScaling={false} style={styles.bookBtnText}>
                  Confirm
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  timeSlotsMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timingText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(13),
  },
  mainScrollView: {
    backgroundColor: COLORS.white,
  },
  innerCalendarIconContainer: {
    alignSelf: 'center',
    marginLeft: scale(15),
  },
  innerCalendarIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  availableHoursContainer: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
  },

  availableHoursTitleContainer: {
    marginTop: verticalScale(16),
  },
  availableHoursTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
  },
  bookBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  bookBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  calendarContainer: {
    alignItems: 'center',
  },
  calendarHeaderStyle: {
    color: 'black',
  },
  calendarMainContainer: {
    marginBottom: verticalScale(24),
  },
  calendarStripIcon: {
    transform: [{scale: 0}],
  },
  dateNameStyle: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  calendarStripIconContainer: {
    height: 0,
    marginHorizontal: scale(10),
    width: 0,
  },
  calenderIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  dateHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginVertical: verticalScale(24),
  },
  dateNumberStyle: {
    color: COLORS.yankeesBlue,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
  },
  dateSelectTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headerAndDateContainer: {
    backgroundColor: COLORS.lightNewPrimary40,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  highlightDateNameStyle: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  highlightDateNumberStyle: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
  },
  highlightedDateContainer: {
    backgroundColor: COLORS.lightNewPrimaryA6,
    borderColor: COLORS.newPrimary,
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
  },
  hoursContainer: {
    alignItems: 'center',
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    flexDirection: 'row',
    height: verticalScale(40),
    justifyContent: 'space-evenly',
    // marginRight: scale(20),
    marginTop: verticalScale(16),
    marginLeft: scale(10),
    width: '45%',
  },
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  listEmptyText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  nextDatesIcon: {
    height: moderateScale(20),
    tintColor: COLORS.achromaticBlack,
    transform: [{rotate: '180deg'}],
    width: moderateScale(20),
  },
  previousDatesIcon: {
    height: moderateScale(20),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(20),
  },
  previousNextIconsContainer: {
    flexDirection: 'row',
  },
  removeBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  removeBtnText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
  },
  selectedDateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightNewPrimary,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    width: '20%',
  },
  selectedDateMainContainer: {
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    flexDirection: 'row',
    height: verticalScale(72),
    width: '100%',
  },
  selectedDateMonthText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateTitleText: {
    color: COLORS.graniteGray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  selectedDateWithTimeText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(9),
  },
  selectedMonthName: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  selectedTimeFrameStyle: {
    backgroundColor: COLORS.lightNewPrimaryA6,
    borderColor: COLORS.newPrimary,
    borderWidth: moderateScale(2),
  },
  sendMessageTextContainer: {
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    height: verticalScale(88),
    marginBottom: verticalScale(20),
    marginRight: scale(20),
    marginTop: verticalScale(16),
  },
  sendMessageTextInput: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    height: verticalScale(88),
    marginHorizontal: scale(20),
    // marginTop: verticalScale(-20),
  },
  sendMessageTitleContainer: {
    marginTop: verticalScale(24),
  },
  sendMessageTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  timeCircleIcon: {
    height: moderateScale(12.33),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(12.33),
  },
  timeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: scale(10),
    width: '60%',
  },
});
