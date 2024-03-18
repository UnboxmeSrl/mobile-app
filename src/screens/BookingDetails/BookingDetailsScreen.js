import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'
import DeviceInfo from 'react-native-device-info'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useBookingDetails } from './hooks'

const BookingDetailsScreen = () => {
  const {
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
    isDateAvailable,
    isDatesLoading,
    showPreviousWeek,
    showNextWeek,
    handleBackPress,
    setSelectedDate,
    handleConfirmBtnPress,
    handleRemoveBtnPress,
  } = useBookingDetails()

  //   const renderDate = (date) => {
  //     const isAvailable = isDateAvailable(date)
  //     const dateStyle = isAvailable ? { color: 'black' } : { color: 'gray' }
  //     return (
  //       <TouchableOpacity onPress={() => setSelectedDate(date)}>
  //         <View>
  //           {/* <Text style={{ color: 'black' }}>{date.format('dd')}</Text>
  //           <Text style={dateStyle}>{date.format('D')}</Text> */}
  //         </View>
  //       </TouchableOpacity>
  //     )
  //   }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isDatesLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size={30} />
        </View>
      ) : (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.headerAndDateContainer}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                  <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
                </TouchableOpacity>

                <View>
                  <Text style={styles.dateSelectTitleText}>Select a Date</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  {/* This need to remove in future */}
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>{DeviceInfo.getBrand()}</Text>
                    <Text> {DeviceInfo.getBuildNumber()}</Text>
                    <Text> {DeviceInfo.getSystemVersion()}</Text>
                    <Text> {DeviceInfo.getModel()}</Text>
                  </View>
                  {/* only above one line and style={{ alignItems: 'center' }} */}
                  <Image resizeMode="cover" source={IMAGES.calender} style={styles.calenderIcon} />
                </View>
              </View>
              {/* <DateTimePicker display="inline" value={new Date()} /> */}
              <View style={styles.calendarMainContainer}>
                <View style={styles.dateHeader}>
                  <View>
                    <Text style={styles.selectedMonthName}>{currentMonth}</Text>
                  </View>
                  <View style={styles.previousNextIconsContainer}>
                    <TouchableOpacity onPress={showPreviousWeek}>
                      <Image resizeMode="cover" source={IMAGES.back} style={styles.previousDatesIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showNextWeek}>
                      <Image resizeMode="cover" source={IMAGES.back} style={styles.nextDatesIcon} />
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
                  iconStyle={styles.calendarStripIcon}
                  selectedDate={selectedDate}
                  showMonth={false}
                  showYear={false}
                  startingDate={startDate}
                  iconRight={IMAGES.back}
                  //   renderDate={renderDate}
                  onDateSelected={(date) => setSelectedDate(date)}
                />
              </View>
              <View />
            </View>
            <View style={styles.availableHoursContainer}>
              <View style={styles.availableHoursTitleContainer}>
                <Text style={styles.availableHoursTitleText}>Available Hours</Text>
              </View>

              <FlatList
                ListEmptyComponent={
                  <View style={styles.listEmptyContainer}>
                    <Text style={styles.listEmptyText}>Not available on this day.</Text>
                  </View>
                }
                data={weekDayWiseTimeSlots}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
                renderItem={({ item, index }) => {
                  const isSelected = item?.id === selectedTimeFame?.id
                  return (
                    <TouchableOpacity
                      key={item.id + 'booking'}
                      onPress={() => setSelectedTimeFame(item)}
                      style={[styles.hoursContainer, isSelected && styles.selectedTimeFrameStyle]}
                    >
                      <Image resizeMode="cover" source={IMAGES.timeCircle} style={styles.timeCircleIcon} />
                      <Text>{`${item?.Start}.${item?.Minute_Start} - ${item?.End}.${item?.Minute_End}`}</Text>
                    </TouchableOpacity>
                  )
                }}
              />

              <View style={styles.sendMessageTitleContainer}>
                <Text style={styles.sendMessageTitleText}>Send Message (Optional)</Text>
              </View>
              <View style={styles.sendMessageTextContainer}>
                <TextInput
                  placeholder="Ask owner your specific questions about this apoitment"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sendMessageTextInput}
                />
              </View>

              {selectedTimeFame?.id && (
                <View style={styles.selectedDateMainContainer}>
                  <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateNumberText}>{currentDate}</Text>
                    <Text style={styles.selectedDateMonthText}>{currentMonth?.slice(0, 3)}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.selectedDateTitleText}>Date 1</Text>
                    <Text
                      style={styles.selectedDateWithTimeText}
                    >{`${currentWeekDay}, ${selectedTimeFame?.Start}.${selectedTimeFame?.Minute_Start} - ${selectedTimeFame?.End}.${selectedTimeFame?.Minute_End}`}</Text>
                  </View>
                  <TouchableOpacity onPress={handleRemoveBtnPress} style={styles.removeBtnContainer}>
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.bookBtnMainContainer}>
            {isLoading ? (
              <View style={styles.bookBtnContainer}>
                <ActivityIndicator color={COLORS.primary} size={30} />
              </View>
            ) : (
              <TouchableOpacity
                disabled={!selectedTimeFame?.id}
                onPress={handleConfirmBtnPress}
                style={[
                  styles.bookBtnContainer,
                  selectedTimeFame?.id && {
                    backgroundColor: COLORS.lightBrown,
                  },
                ]}
              >
                <Text style={styles.bookBtnText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default BookingDetailsScreen

const styles = StyleSheet.create({
  availableHoursContainer: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
  },
  availableHoursTitleContainer: {
    marginTop: verticalScale(16),
  },
  calendarHeaderStyle: {
    color: 'black',
  },
  availableHoursTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  calendarStripIcon: {
    transform: [{ scale: 0 }],
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  calendarStripIconContainer: {
    height: 0,
    marginHorizontal: scale(10),
    width: 0,
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(16),
    height: verticalScale(44),
    justifyContent: 'center',
    width: '100%',
  },
  dateNameStyle: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
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
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: '100%',
  },
  bookBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  highlightDateNameStyle: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  calendarMainContainer: {
    marginBottom: verticalScale(24),
  },
  highlightDateNumberStyle: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
  },
  calenderIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  dateNumberStyle: {
    color: COLORS.yankeesBlue,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(16),
  },
  dateHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginVertical: verticalScale(24),
  },
  dateSelectTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headerAndDateContainer: {
    backgroundColor: COLORS.lightPink,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  highlightedDateContainer: {
    backgroundColor: COLORS.lightBrown,
    borderColor: COLORS.primary,
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
    marginRight: scale(20),
    marginTop: verticalScale(16),
    width: '45%',
  },
  listEmptyContainer: {
    alignItems: 'center',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  listEmptyText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  nextDatesIcon: {
    height: moderateScale(20),
    tintColor: COLORS.achromaticBlack,
    transform: [{ rotate: '180deg' }],
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
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
  },
  selectedDateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
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
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.primary,
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
    borderColor: COLORS.primary,
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
    marginTop: verticalScale(-20),
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
})
