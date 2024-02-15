import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import { useYourSchedule } from './hooks'
import { checkActionName } from '../../utils'
import { ContentStatusModal } from '../../components'

const YourScheduleScreen = () => {
  const {
    bookings,
    contentList,
    selectedTab,
    setSelectedTab,
    updatedContentDetails,
    isLoading,
    isContentStatusModalVisible,
    refreshing,
    onBookingRefresh,
    onContentRefresh,
    handleContentModalOpenClose,
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
  } = useYourSchedule()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.yourScheduleTextContainer}>
          <Text style={styles.dateSelectTitleText}>Your Schedule</Text>
        </View>
        <TouchableOpacity onPress={handleArchivePress}>
          <Image resizeMode="contain" source={IMAGES.swap} style={styles.calenderIcon} />
        </TouchableOpacity>
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

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.primary} size={20} />
        </View>
      ) : (
        (selectedTab === 1 && (
          <FlatList
            data={bookings}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onBookingRefresh} />}
            renderItem={({ item, index }) => {
              const myDate = new Date(item?.BookingDay)
              const month = myDate.toLocaleString('default', { month: 'long' })
              const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
              const timeFrame = item?._timeframes_turbo
              const approvalStatus = item?.Approved ? 'Accepted' : item?.Rejectedstatus ? 'Rejected' : 'Pending'

              let actionName = item?._actions_turbo?.Action_Name ?? 0
              if (item?.diary_action_turbo_id) {
                actionName = item?._diary_action_turbo?.action
              }
              const icon = checkActionName(actionName)

              return (
                <TouchableOpacity
                  onPress={() => handleCardPress(item, approvalStatus, actionName)}
                  style={styles.cardContainer}
                >
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
                    <View style={styles.locationTimeMainContainer}>
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

                        {actionName ? (
                          <View style={styles.storyContainer}>
                            <Text style={styles.storyText}>{actionName}</Text>
                            <View style={styles.storyIconContainer}>
                              <Image resizeMode="cover" source={icon} style={styles.storyIcon} />
                            </View>
                          </View>
                        ) : (
                          <View style={styles.reelsContainer}>
                            <Text style={styles.reelsTitleText}>{`Tiktok/ Reels`}</Text>
                            <View style={styles.tiktokReelsIconsContainer}>
                              <Image resizeMode="cover" source={IMAGES.tiktokWithoutBg} style={styles.reelIcon} />
                              <Image resizeMode="cover" source={IMAGES.reel} style={styles.reelIcon} />
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        )) ||
        (selectedTab === 2 && (
          <FlatList
            data={contentList}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onContentRefresh} />}
            renderItem={({ item, index }) => {
              let actionName = item?._actions_turbo?.Action_Name ?? 0
              if (item?.diary_action_turbo_id) {
                actionName = item?._diary_action_turbo?.action
              }
              const icon = checkActionName(actionName)
              let contentApprovalStatus = item?.content_status_turbo_id
              if (item?.content_status_turbo_id) {
                contentApprovalStatus = item?._content_status_turbo?.name
              }
              return (
                <TouchableOpacity style={contentStyles.cardContainer} onPress={() => handleContentCardPress(item)}>
                  <View style={contentStyles.cardContentContainer}>
                    <View style={contentStyles.ratingSocialMediaMainContainer}>
                      <View style={contentStyles.ratingSocialMediaContainer}>
                        <View style={contentStyles.ratingContainer}>
                          <Text style={contentStyles.ratingUsersText}>240</Text>
                          <Image source={IMAGES.ratingStar} style={contentStyles.ratingIconImage} />
                        </View>
                      </View>
                      <View style={contentStyles.socialMediaIconNameContainer}>
                        <Image resizeMode="cover" source={icon} style={contentStyles.socialMediaIcon} />
                        <Text style={contentStyles.socialMediaNameText}>{`${item?._actions_turbo?.Action_Name}`}</Text>
                      </View>
                    </View>

                    <View style={contentStyles.deadLineLocationContainer}>
                      <View style={contentStyles.deadLineContainer}>
                        <View style={contentStyles.deadLineMainRow}>
                          <View
                            style={[
                              contentStyles.deadLineTitleTextContainer,
                              (contentApprovalStatus === 'Under Review' ||
                                contentApprovalStatus === 'Missed Deadline') && {
                                width: '52%',
                              },
                              item?.content_status_turbo_id === 0 && { width: '100%' },
                            ]}
                          >
                            <Text style={contentStyles.deadLineTitleText}>Deadline:</Text>
                          </View>
                          {item?.content_status_turbo_id > 0 && (
                            <View
                              style={[
                                contentStyles.contentApprovalStatusContainer,
                                contentApprovalStatus === 'To Publish'
                                  ? { backgroundColor: COLORS.cornSilk }
                                  : contentApprovalStatus === 'Rejected'
                                  ? { backgroundColor: COLORS.seaShellRed }
                                  : contentApprovalStatus === 'Under Review'
                                  ? { backgroundColor: COLORS.azureishWhite }
                                  : contentApprovalStatus === 'Missed Deadline' && {
                                      backgroundColor: COLORS.paleRose,
                                    },
                              ]}
                            >
                              <Text
                                style={[
                                  contentStyles.contentApprovalStatusText,
                                  contentApprovalStatus === 'To Publish'
                                    ? { color: COLORS.americanYellow }
                                    : contentApprovalStatus === 'Rejected'
                                    ? { color: COLORS.error }
                                    : contentApprovalStatus === 'Under Review'
                                    ? { color: COLORS.celticBlue }
                                    : contentApprovalStatus === 'Missed Deadline' && { color: COLORS.redViolet },
                                ]}
                              >
                                {contentApprovalStatus}
                              </Text>
                            </View>
                          )}
                          {/* <View style={[contentStyles.threeDotsContainer]}>
                            <Image resizeMode="contain" source={IMAGES.threeDots} style={contentStyles.threeDotsIcon} />
                          </View> */}
                        </View>
                        <View style={contentStyles.infoContainer}>
                          <Image resizeMode="contain" source={IMAGES.info} style={contentStyles.infoIcon} />
                          <Text
                            style={contentStyles.deadLineText}
                          >{`${item?._actions_turbo?.Days_deadline} Days left`}</Text>
                        </View>
                      </View>
                      <View style={contentStyles.divider} />
                      <View style={contentStyles.locationMainRow}>
                        <View style={contentStyles.nameLocationMainRow}>
                          <View style={contentStyles.locationImageContainer}>
                            <FastImage
                              resizeMode="cover"
                              source={{ priority: FastImage.priority.high, uri: item?._restaurant_turbo?.Cover?.url }}
                              style={contentStyles.locationImage}
                            />
                          </View>
                          <View style={contentStyles.locationNameContainer}>
                            <Text style={contentStyles.locationNameText} numberOfLines={1}>
                              {item?._restaurant_turbo?.Name}
                            </Text>
                            <View style={contentStyles.locationTextContainer}>
                              <Text style={contentStyles.locationText} numberOfLines={2}>
                                {item?._restaurant_turbo?.Adress}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={contentStyles.rightIconContainer}>
                          <Image resizeMode="contain" source={IMAGES.back} style={contentStyles.rightIcon} />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        ))
      )}
      {isContentStatusModalVisible && (
        <ContentStatusModal
          visible={isContentStatusModalVisible}
          isLoading={false}
          contentDetails={updatedContentDetails}
          handleNegativeBtnPress={handleContentModalOpenClose}
          handlePositiveBtnPress={handleContentModalOpenClose}
        />
      )}
    </View>
  )
}

export default YourScheduleScreen

const styles = StyleSheet.create({
  locationTimeMainContainer: {
    width: '100%',
  },
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
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    width: '40%',
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
    width: '40%',
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
    width: '45%',
  },
  timeReelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
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

const contentStyles = StyleSheet.create({
  contentApprovalIcon: {
    height: moderateScale(6.8),
    tintColor: COLORS.mayGreen,
    width: moderateScale(9.33),
  },
  contentApprovalStatusContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.honeyDewGreen,
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(5),
  },
  contentApprovalStatusText: {
    color: COLORS.mayGreen,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
    marginLeft: scale(5),
  },
  cardContentContainer: {
    flexDirection: 'row',
  },
  deadLineLocationContainer: {
    width: '75%',
  },
  rightIconContainer: {
    width: '15%',
    marginBottom: verticalScale(20),
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  socialMediaIconNameContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    height: verticalScale(112),
    justifyContent: 'center',
    width: scale(80.68),
    marginTop: verticalScale(-5),
  },
  divider: {
    alignSelf: 'center',
    borderColor: COLORS.gainsboro,
    borderWidth: moderateScale(0.5),
    marginTop: verticalScale(9),
    width: '90%',
  },
  locationImage: {
    borderRadius: moderateScale(32),
    height: moderateScale(32),
    width: moderateScale(32),
  },
  locationImageContainer: {
    marginLeft: scale(13),
  },
  locationNameContainer: {
    marginLeft: scale(10),
    width: '70%',
  },
  locationNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  locationText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  locationTextContainer: {
    width: '100%',
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    width: '80%',
  },
  rightIcon: {
    height: moderateScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
    width: moderateScale(25),
  },
  socialMediaNameText: {
    marginTop: verticalScale(8),
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
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
    width: '70%',
  },
  serviceRequestedTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  socialMediaIcon: {
    height: moderateScale(28.7),
    width: moderateScale(30),
  },
  deadLineContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(5),
    width: '100%',
  },
  deadLineText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(5),
  },
  deadLineTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  infoIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  ratingIconImage: {
    height: moderateScale(10.2),
    marginLeft: scale(5),
    tintColor: COLORS.primary,
    width: moderateScale(10.58),
  },
  ratingUsersText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12.09),
  },
  deadLineMainRow: {
    flexDirection: 'row',
    width: '95%',
  },
  deadLineTitleTextContainer: {
    width: '58%',
  },
  threeDotsContainer: {
    width: '5%',
    marginLeft: scale(10),
    justifyContent: 'center',
  },
  threeDotsIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  locationMainRow: {
    flexDirection: 'row',
  },
  ratingSocialMediaContainer: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    width: scale(80.68),
    height: verticalScale(20),
  },
  ratingSocialMediaMainContainer: {
    height: verticalScale(132),
    backgroundColor: COLORS.isabelLine,
  },
})
