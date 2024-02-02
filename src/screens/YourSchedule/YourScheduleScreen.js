import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

import { useYourSchedule } from './hooks'

const YourScheduleScreen = () => {
  const { selectedTab, setSelectedTab, handleCardPress } = useYourSchedule()
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
        data={[0, 1, 2]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={handleCardPress} style={styles.cardContainer}>
              <View style={styles.approvalStatusContainer}>
                <Image resizeMode="cover" source={IMAGES.check} style={styles.approvalIcon} />
                <Text style={styles.approvalStatusText}>Accepted</Text>
              </View>

              <View style={styles.nameLocationMainRow}>
                <View>
                  <View style={styles.locationImageContainer}>
                    <Image resizeMode="cover" source={IMAGES.testImage2} style={styles.locationImage} />
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.selectedDateMonthText}>July</Text>
                    <Text style={styles.selectedDateNumberText}>19</Text>
                    <Text style={styles.selectedDateDayText}>WED</Text>
                  </View>
                </View>
                <View>
                  <View style={styles.locationNameContainer}>
                    <Text style={styles.locationNameText}>Blue Beauty Salon SuperBali</Text>
                  </View>
                  <View style={styles.serviceRequestedContainer}>
                    <Text style={styles.serviceRequestedTitleText}>Service Requested</Text>
                    <Text style={styles.serviceRequestedText}>Airtouch</Text>
                  </View>
                  <View style={styles.timeReelsContainer}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeTitleText}>Time</Text>
                      <Text style={styles.timeText}>5:00 pm</Text>
                    </View>

                    <View style={styles.reelsContainer}>
                      <Text style={styles.reelsTitleText}>Reels</Text>
                      <Image resizeMode="cover" source={IMAGES.reel} style={styles.reelIcon} />
                    </View>
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
    height: moderateScale(30),
    width: moderateScale(30),
  },
  reelsContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
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
  },
  serviceRequestedTitleText: {
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
  timeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
  },
  timeReelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
