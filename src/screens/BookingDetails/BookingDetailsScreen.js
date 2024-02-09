import React, { useEffect, useState } from 'react'
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
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import DateTimePicker from '@react-native-community/datetimepicker'

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
      <View style={styles.mainContainer}>
        <View style={styles.headerAndDateContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
            </TouchableOpacity>

            <View>
              <Text style={styles.dateSelectTitleText}>Select a Date</Text>
            </View>
            <View>
              <Image resizeMode="cover" source={IMAGES.calender} style={styles.calenderIcon} />
            </View>
          </View>
          {/* <DateTimePicker display="inline" value={new Date()} /> */}
          <View style={{ marginBottom: 24 }}>
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
              calendarHeaderStyle={{ color: 'black' }}
              dateNameStyle={{ color: COLORS.primary, fontFamily: FONTS.quicksand, fontSize: 12 }}
              dateNumberStyle={{ color: COLORS.yankeesBlue, fontFamily: FONTS.quicksand, fontSize: 16 }}
              datesBlacklist={datesBlacklistFunc}
              endDate={endDate}
              highlightDateContainerStyle={styles.highlightedDateContainer}
              highlightDateNameStyle={{ color: COLORS.primary, fontFamily: FONTS.quicksand, fontSize: 12 }}
              highlightDateNumberStyle={{ color: COLORS.primary, fontFamily: FONTS.quicksand, fontSize: 16 }}
              iconLeft={IMAGES.back}
              iconRight={IMAGES.back}
              //   renderDate={renderDate}
              onDateSelected={(date) => setSelectedDate(date)}
              selectedDate={selectedDate}
              showMonth={false}
              showYear={false}
              startingDate={startDate}
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
            numColumns={2}
            renderItem={({ item, index }) => {
              const isSelected = item?.id === selectedTimeFame?.id
              return (
                <TouchableOpacity
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
    </ScrollView>
  )
}

export default BookingDetailsScreen

const styles = StyleSheet.create({
  availableHoursContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  availableHoursTitleContainer: {
    marginTop: 24,
  },
  availableHoursTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  backIcon: {
    height: 30,
    tintColor: COLORS.achromaticBlack,
    width: 30,
  },
  bookBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteShadedTransparent,
    borderRadius: 16,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },
  bookBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 14,
    padding: 24,
    width: '100%',
  },
  bookBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: 18,
    fontWeight: '600',
  },
  calenderIcon: {
    height: 24,
    tintColor: COLORS.achromaticBlack,
    width: 24,
  },
  dateHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 24,
  },
  dateSelectTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerAndDateContainer: {
    backgroundColor: COLORS.lightPink,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  highlightedDateContainer: {
    backgroundColor: COLORS.lightBrown,
    borderColor: COLORS.primary,
    borderRadius: 8,
    borderWidth: 1,
  },
  hoursContainer: {
    alignItems: 'center',
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-evenly',
    marginRight: 20,
    marginTop: 16,
    width: '45%',
  },
  listEmptyContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 16,
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
    height: 20,
    tintColor: COLORS.achromaticBlack,
    transform: [{ rotate: '180deg' }],
    width: 20,
  },
  previousDatesIcon: {
    height: 20,
    tintColor: COLORS.achromaticBlack,
    width: 20,
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
    borderRadius: 10,
    justifyContent: 'center',
    width: '20%',
  },
  selectedDateMainContainer: {
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 72,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedTimeFrameStyle: {
    borderColor: COLORS.primary,
    borderWidth: moderateScale(2),
  },
  sendMessageTextContainer: {
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: 10,
    borderWidth: 1,
    height: 88,
    marginBottom: 20,
    marginRight: 20,
    marginTop: 16,
  },
  sendMessageTextInput: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksand,
    fontSize: 14,
    height: 88,
    marginHorizontal: 20,
    marginTop: -20,
  },
  sendMessageTitleContainer: {
    marginTop: 24,
  },
  sendMessageTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: 16,
    marginTop: 10,
  },
  timeCircleIcon: {
    height: 12.33,
    tintColor: COLORS.achromaticBlack,
    width: 12.33,
  },
  timeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '60%',
  },
})
