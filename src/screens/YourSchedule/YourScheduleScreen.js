import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useYourSchedule } from './hooks'

const YourScheduleScreen = () => {
  const { bookings, selectedTab, setSelectedTab, handleCardPress } = useYourSchedule()
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.yourScheduleTextContainer}>
          <Text style={styles.dateSelectTitleText}>Your Schedule</Text>
        </View>
        <View>
          <Image resizeMode="contain" source={IMAGES.swap} style={styles.calenderIcon} />
        </View>
      </View>

      <View style={styles.selectionTabContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedTab(1)}
          style={[styles.tab, selectedTab === 1 && styles.selectedTab]}
        >
          <Text style={[styles.selectionTabText, selectedTab === 1 && styles.selectedTabText]}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={[styles.tab, selectedTab === 2 && styles.selectedTab]}
        >
          <Text style={[styles.selectionTabText, selectedTab === 2 && styles.selectedTabText]}>Content</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bookings}
        renderItem={({ item, index }) => {
          const myDate = new Date(item?.BookingDay)
          const month = myDate.toLocaleString('default', { month: 'long' })
          const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
          const timeFrame = item?._timeframes_turbo
          const approvalStatus = item?.Approved ? 'Accepted' : item?.Rejectedstatus ? 'Rejected' : 'Pending'
          return (
            <TouchableOpacity onPress={() => handleCardPress(item, approvalStatus)} style={styles.cardContainer}>
              <View
                style={[
                  styles.approvalStatusContainer,
                  approvalStatus === 'Pending'
                    ? { backgroundColor: COLORS.cornSilk }
                    : approvalStatus === 'Rejected' && { backgroundColor: COLORS.seaShellRed },
                ]}
              >
                <Image
                  resizeMode="cover"
                  source={item?.Approved ? IMAGES.check : item?.Rejectedstatus ? IMAGES.info : IMAGES.pendingClock}
                  style={[
                    styles.approvalIcon,
                    approvalStatus === 'Pending'
                      ? { tintColor: COLORS.americanYellow }
                      : approvalStatus === 'Rejected' && { tintColor: COLORS.error },
                  ]}
                />
                <Text
                  style={[
                    styles.approvalStatusText,
                    approvalStatus === 'Pending'
                      ? { color: COLORS.americanYellow }
                      : approvalStatus === 'Rejected' && { color: COLORS.error },
                  ]}
                >
                  {approvalStatus}
                </Text>
              </View>

              <View style={styles.nameLocationMainRow}>
                <View>
                  <View style={styles.locationImageContainer}>
                    <FastImage
                      resizeMode="cover"
                      source={{ priority: FastImage.priority.high, uri: item?._restaurant_turbo?.Cover?.url }}
                      style={styles.locationImage}
                    />
                  </View>
                  <View
                    style={[
                      styles.dateContainer,
                      approvalStatus === 'Pending'
                        ? { backgroundColor: COLORS.cornSilk }
                        : approvalStatus === 'Rejected' && { backgroundColor: COLORS.seaShellRed },
                    ]}
                  >
                    <Text style={styles.selectedDateMonthText}>{month}</Text>
                    <Text style={styles.selectedDateNumberText}>{myDate?.getDate()}</Text>
                    <Text style={styles.selectedDateDayText}>{weekDay?.slice(0, 3)}</Text>
                  </View>
                </View>
                <View style={{ width: '100%' }}>
                  <View style={styles.locationNameContainer}>
                    <Text style={styles.locationNameText}>{item?._restaurant_turbo?.Name}</Text>
                  </View>
                  <View style={styles.serviceRequestedContainer}>
                    <Text style={styles.serviceRequestedTitleText}>Service Requested</Text>
                    <Text style={styles.serviceRequestedText}>{item?._offers_turbo?.Offer_Name}</Text>
                  </View>
                  <View style={styles.timeReelsContainer}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeTitleText}>Time</Text>
                      <Text
                        style={styles.timeText}
                      >{`${timeFrame?.Start}.${timeFrame?.Minute_Start} - ${timeFrame?.End}.${timeFrame?.Minute_End}`}</Text>
                    </View>

                    {item?._offers_turbo?.Story ? (
                      <View style={styles.storyContainer}>
                        <Text style={styles.storyText}>Story</Text>
                        <View style={styles.storyIconContainer}>
                          <Image resizeMode="cover" source={IMAGES.instagramStory} style={styles.storyIcon} />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.reelsContainer}>
                        <Text style={styles.reelsTitleText}>{`${
                          item?.reel === '1' ? 'Reels' : item?.reel === '2' ? 'Tiktok' : 'Tiktok/ Reels'
                        }`}</Text>
                        {item?.reel === '1' ? (
                          <Image resizeMode="cover" source={IMAGES.reel} style={styles.reelIcon} />
                        ) : item?.reel === '2' ? (
                          <Image resizeMode="cover" source={IMAGES.tiktokWithoutBg} style={styles.reelIcon} />
                        ) : (
                          <View style={styles.tiktokReelsIconsContainer}>
                            <Image resizeMode="cover" source={IMAGES.tiktokWithoutBg} style={styles.reelIcon} />
                            <Image resizeMode="cover" source={IMAGES.reel} style={styles.reelIcon} />
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  )
}

export default YourScheduleScreen

const styles = StyleSheet.create({
  approvalIcon: {
    height: moderateScale(6.8),
    tintColor: COLORS.mayGreen,
    width: moderateScale(9.33),
  },
  approvalStatusContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.honeyDewGreen,
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: scale(25),
    marginTop: verticalScale(16),
    padding: moderateScale(5),
  },
  approvalStatusText: {
    color: COLORS.mayGreen,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    marginLeft: scale(5),
  },
  backIcon: {
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  calenderIcon: {
    height: moderateScale(14.63),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(20.63),
  },
  cardContainer: {
    alignSelf: 'center',
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(23),
    paddingBottom: verticalScale(15),
    width: '95%',
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.veryLight,
    borderRadius: moderateScale(5),
    height: verticalScale(83),
    justifyContent: 'center',
    marginLeft: scale(10),
    marginTop: verticalScale(11),
    width: scale(70),
  },
  dateSelectTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(20),
    width: '100%',
  },
  locationImage: {
    borderRadius: moderateScale(60),
    height: moderateScale(60),
    width: moderateScale(60),
  },
  locationImageContainer: {
    marginLeft: scale(13),
  },
  locationNameContainer: {
    marginLeft: scale(15),
  },
  locationNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  nameLocationMainRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  reelIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  reelsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(35),
    marginTop: verticalScale(19),
    width: '50%',
  },
  reelsTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  selectedDateDayText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
  selectedDateMonthText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(24),
    textAlign: 'center',
  },
  selectedTab: {
    backgroundColor: COLORS.desertSand,
    borderRadius: moderateScale(20),
    borderWidth: 0,
    height: verticalScale(32),
    marginLeft: scale(3),
    width: scale(162),
  },
  selectedTabText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  selectionTabContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.veryLight,
    borderRadius: moderateScale(20),
    borderWidth: 0,
    flexDirection: 'row',
    height: verticalScale(40),
  },
  selectionTabText: {
    color: COLORS.desertSand,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  serviceRequestedContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
  },
  serviceRequestedText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    width: '70%',
  },
  serviceRequestedTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  storyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(35),
    marginTop: verticalScale(19),
    width: '50%',
  },
  storyIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  storyIconContainer: {
    marginTop: verticalScale(5),
  },
  storyText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  tab: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    height: verticalScale(35),
    justifyContent: 'center',
    width: scale(162),
  },
  tiktokReelsIconsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  timeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
    width: '35%',
  },
  timeReelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
  yourScheduleTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scale(30),
    width: '90%',
  },
})
