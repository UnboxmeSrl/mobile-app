import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets';
import {ContentStatusModal} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {useYourSchedule} from './hooks';
import {
  deadlineDaysCount,
  getDeadlineDate,
  getFormattedTime,
  perfectSize,
  xanoImageSize,
} from '../../utils';

const YourScheduleScreen = () => {
  const {
    bookings,
    bookingsWithoutCanceled,
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
  } = useYourSchedule();
  // console.log(
  //   'cancel_booking',
  //   // bookingsWithoutCanceled?.find(e => e.id === 15562),
  //   bookings.length,
  // );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.yourScheduleTextContainer}>
          <Text allowFontScaling={false} style={styles.dateSelectTitleText}>
            Your Schedule
          </Text>
        </View>
        <TouchableOpacity onPress={handleArchivePress}>
          <Image
            resizeMode="contain"
            source={IMAGES.swap}
            style={styles.calenderIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.selectionTabContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedTab(1)}
          style={[styles.tab, selectedTab === 1 && styles.selectedTab]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.selectionTabText,
              selectedTab === 1 && styles.selectedTabText,
            ]}>
            Booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={[styles.tab, selectedTab === 2 && styles.selectedTab]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.selectionTabText,
              selectedTab === 2 && styles.selectedTabText,
            ]}>
            Content
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.newPrimary} size={20} />
        </View>
      ) : (
        (selectedTab === 1 && (
          <FlatList
            data={bookings}
            // key={bookings.length}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onBookingRefresh}
              />
            }
            ListEmptyComponent={
              <View style={styles.listEmptyContainer}>
                <Text allowFontScaling={false} style={styles.listEmptyText}>
                  No bookings are there.
                </Text>
              </View>
            }
            renderItem={({item, index}) => {
              const myDate = new Date(item?.BookingDay);
              const month = myDate?.toLocaleString('en-US', {month: 'long'});
              const weekDay = myDate?.toLocaleString('en-US', {
                weekday: 'long',
              });
              const isEvent = item?._restaurant_turbo?.is_event;
              const timeFrame = item?._timeframes_turbo;
              const approvalStatus = item?.Approved
                ? 'Accepted'
                : item?.Rejectedstatus
                ? 'Rejected'
                : 'Pending';
              let actionNumId = item?._actions_turbo?.action_num_id ?? 0;
              let icon = item?._actions_turbo?.Action_icon?.url;
              let actionName = item?._actions_turbo?.Action_Name ?? 0;

              if (actionNumId === 6 && item?._diary_action_turbo?.id) {
                icon = item?._diary_action_turbo?.action_icon?.url;
                actionName = item?._diary_action_turbo?.action_for_others;
              } else if (item?.diary_action_turbo_id) {
                actionName = item?._diary_action_turbo?.action;
              }

              return (
                <TouchableOpacity
                  onPress={() => {
                    handleCardPress(
                      item,
                      approvalStatus,
                      actionName,
                      actionNumId,
                    );
                    console.log(
                      'item_id_onBookingCardPress',
                      item?.id,
                      // item,
                      item?.HourStart,
                      item?.HourEnd,
                      item?.MinuteStart,
                      item?.MinuteEnd,
                      timeFrame,
                      // item?.BookingDay,
                      // item?._actions_turbo?.Days_deadline,
                    );
                    // console.log('timeFrame_onBookingCardPress', timeFrame);
                  }}
                  style={styles.cardContainer}>
                  <View
                    style={[
                      styles.approvalStatusContainer,
                      approvalStatus === 'Pending'
                        ? {backgroundColor: COLORS.cornSilk}
                        : approvalStatus === 'Rejected' && {
                            backgroundColor: COLORS.seaShellRed,
                          },
                    ]}>
                    <Image
                      resizeMode="cover"
                      source={
                        item?.Approved
                          ? IMAGES.check
                          : item?.Rejectedstatus
                          ? IMAGES.reject
                          : IMAGES.pendingClock
                      }
                      style={[
                        styles.approvalIcon,
                        approvalStatus === 'Pending'
                          ? {tintColor: COLORS.americanYellow}
                          : approvalStatus === 'Rejected' && {
                              tintColor: COLORS.error,
                            },
                      ]}
                    />
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.approvalStatusText,
                        approvalStatus === 'Pending'
                          ? {color: COLORS.americanYellow}
                          : approvalStatus === 'Rejected' && {
                              color: COLORS.error,
                            },
                      ]}>
                      {approvalStatus}
                    </Text>
                  </View>

                  <View style={styles.nameLocationMainRow}>
                    <View>
                      <View style={styles.locationImageContainer}>
                        <FastImage
                          resizeMode="cover"
                          source={{
                            priority: FastImage.priority.high,
                            uri: `${item?._restaurant_turbo?.Cover?.url}?tpl=${xanoImageSize}.jpg`,
                          }}
                          style={styles.locationImage}
                        />
                      </View>
                      <View
                        style={[
                          styles.dateContainer,
                          approvalStatus === 'Pending'
                            ? {backgroundColor: COLORS.cornSilk}
                            : approvalStatus === 'Rejected' && {
                                backgroundColor: COLORS.seaShellRed,
                              },
                        ]}>
                        <Text
                          allowFontScaling={false}
                          style={styles.selectedDateMonthText}>
                          {month}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.selectedDateNumberText}>
                          {myDate?.getDate()}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.selectedDateDayText}>
                          {weekDay?.slice(0, 3)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.locationTimeMainContainer}>
                      <View style={styles.locationNameContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.locationNameText}>
                          {item?._restaurant_turbo?.Name}
                        </Text>
                      </View>
                      <View style={styles.serviceRequestedContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.serviceRequestedTitleText}>
                          Service Requested
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.serviceRequestedText}>
                          {item?._offers_turbo?.Offer_Name}
                        </Text>
                      </View>
                      <View style={styles.timeReelsContainer}>
                        {/* {actionNumId !== 9  ? ( */}
                        {actionNumId !== 9 &&
                        (timeFrame ||
                          item?.booking_time ||
                          (item?.HourStart && item?.HourEnd)) ? (
                          <View style={styles.timeContainer}>
                            {/* {Object.keys(timeFrame || {}).length &&
                              item.booking_time && (
                                <> */}
                            <Text
                              allowFontScaling={false}
                              style={styles.timeTitleText}>
                              Time
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={styles.timeText}>{`${
                              isEvent
                                ? `${getFormattedTime(item?.booking_time)}`
                                : `${
                                    timeFrame
                                      ? timeFrame?.Start
                                      : item?.HourStart
                                  }:${
                                    timeFrame
                                      ? timeFrame?.Minute_Start
                                      : item.MinuteStart
                                  } - ${
                                    timeFrame ? timeFrame?.End : item.HourEnd
                                  }:${
                                    timeFrame
                                      ? timeFrame?.Minute_End
                                      : item.MinuteEnd
                                  }`
                            }`}</Text>
                            {/* </>
                              )} */}
                          </View>
                        ) : (
                          <View style={styles.timeContainer} />
                        )}

                        {/* {actionNumId == 6 && item?.diary_action_turbo_id === 0 ? (
                          <View style={styles.reelsContainer}>
                            <Text allowFontScaling={false}  style={styles.reelsTitleText}>{`${actionName}`}</Text>
                            <View style={styles.tiktokReelsIconsContainer}>
                              <Image resizeMode="cover" source={IMAGES.tiktokWithoutBg} style={styles.reelIcon} />
                              <Image resizeMode="cover" source={IMAGES.reel} style={styles.reelIcon} />
                            </View>
                          </View>
                        ) : ( */}
                        <View style={styles.storyContainer}>
                          <Text
                            allowFontScaling={false}
                            style={styles.storyText}>
                            {actionName}
                          </Text>
                          <View style={styles.storyIconContainer}>
                            <FastImage
                              resizeMode="contain"
                              source={{
                                priority: FastImage.priority.high,
                                uri: icon,
                              }}
                              style={styles.storyIcon}
                            />
                            {/* <Image resizeMode="cover" source={icon} style={styles.storyIcon} /> */}
                          </View>
                        </View>
                        {/* )} */}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )) ||
        (selectedTab === 2 && (
          <FlatList
            data={contentList}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onContentRefresh}
              />
            }
            ListEmptyComponent={
              <View style={styles.listEmptyContainer}>
                <Text allowFontScaling={false} style={styles.listEmptyText}>
                  No content uploaded yet.
                </Text>
              </View>
            }
            renderItem={({item, index}) => {
              let actionNumId = item?._actions_turbo?.action_num_id ?? 0;
              let icon = item?._actions_turbo?.Action_icon?.url;
              let actionName = item?._actions_turbo?.Action_Name ?? 0;

              if (actionNumId === 6 && item?._diary_action_turbo?.id) {
                icon = item?._diary_action_turbo?.action_icon?.url;
                actionName = item?._diary_action_turbo?.action_for_others;
              } else if (item?.diary_action_turbo_id) {
                actionName = item?._diary_action_turbo?.action;
              }

              let contentApprovalStatus = item?.content_status_turbo_id;
              if (item?.content_status_turbo_id) {
                contentApprovalStatus = item?._content_status_turbo?.name;
              }
              // console.log(
              //   'contentApprovalStatus',
              //   contentApprovalStatus,
              //   item?.content_status_turbo_id,
              //   item?._content_status_turbo?.name,
              // );
              // For deadline days of content publish from (current date) to (booking date + deadline days)
              const deadlineDays = deadlineDaysCount(
                item?.BookingDay,
                item?._actions_turbo?.Days_deadline,
              );
              // console.log('item_id', item.id, item.content_url);

              return (
                <TouchableOpacity
                  style={contentStyles.cardContainer}
                  onPress={() => {
                    // console.log('item_id_onPress', item.id, item.content_url);
                    // console.log(
                    //   item.id,
                    //   item?._actions_turbo?.Days_deadline,
                    //   deadlineDaysdeadlineDays,
                    //   Date.parse(item?.BookingDay),
                    //   'missedDays',
                    // );
                    handleContentCardPress(item);
                  }}>
                  <View style={contentStyles.cardContentContainer}>
                    <View style={contentStyles.ratingSocialMediaMainContainer}>
                      <View style={contentStyles.ratingSocialMediaContainer}>
                        <View style={contentStyles.ratingContainer}>
                          <Text
                            allowFontScaling={false}
                            style={contentStyles.ratingUsersText}>
                            {item?._offers_turbo?.Credits}
                          </Text>
                          <Image
                            source={IMAGES.ratingStar}
                            style={contentStyles.ratingIconImage}
                          />
                        </View>
                      </View>
                      <View style={contentStyles.socialMediaIconNameContainer}>
                        <FastImage
                          resizeMode="contain"
                          source={{
                            priority: FastImage.priority.high,
                            uri: icon,
                          }}
                          style={contentStyles.socialMediaIcon}
                        />
                        {/* <Image resizeMode="cover" source={icon} style={contentStyles.socialMediaIcon} /> */}
                        <Text
                          allowFontScaling={false}
                          style={
                            contentStyles.socialMediaNameText
                          }>{`${actionName}`}</Text>
                      </View>
                    </View>

                    <View
                      style={[
                        contentStyles.deadLineLocationContainer,
                        item?.content_status_turbo_id !== 0 &&
                          styles.underReviewContainer,
                      ]}>
                      <View style={contentStyles.deadLineContainer}>
                        <View style={contentStyles.deadLineMainRow}>
                          <View
                            style={[
                              contentStyles.deadLineTitleTextContainer,
                              (contentApprovalStatus === 'Under Review' ||
                                contentApprovalStatus ===
                                  'Missed Deadline') && {
                                width: '60%',
                              },
                              item?.content_status_turbo_id === 0 && {
                                width: '100%',
                              },
                            ]}>
                            {!item?.content_url && (
                              <Text
                                allowFontScaling={false}
                                style={contentStyles.deadLineTitleText}>
                                Deadline:{' '}
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    contentStyles.deadLineTitleText,
                                    {fontWeight: 'bold', color: '#00000090'},
                                  ]}>
                                  {getDeadlineDate(
                                    item.BookingDay,
                                    item?._actions_turbo?.Days_deadline,
                                  )}
                                </Text>
                              </Text>
                            )}
                          </View>

                          {item?.content_status_turbo_id > 0 && (
                            <View
                              style={[
                                contentStyles.contentApprovalStatusContainer,
                                contentApprovalStatus === 'To Publish'
                                  ? {backgroundColor: COLORS.cornSilk}
                                  : contentApprovalStatus === 'Rejected'
                                  ? {backgroundColor: COLORS.seaShellRed}
                                  : contentApprovalStatus === 'Under Review'
                                  ? {backgroundColor: COLORS.azureishWhite}
                                  : contentApprovalStatus ===
                                      'Missed Deadline' && {
                                      backgroundColor: COLORS.paleRose,
                                    },
                              ]}>
                              <Text
                                allowFontScaling={false}
                                style={[
                                  contentStyles.contentApprovalStatusText,
                                  contentApprovalStatus === 'To Publish'
                                    ? {color: COLORS.americanYellow}
                                    : contentApprovalStatus === 'Rejected'
                                    ? {color: COLORS.error}
                                    : contentApprovalStatus === 'Under Review'
                                    ? {color: COLORS.celticBlue}
                                    : contentApprovalStatus ===
                                        'Missed Deadline' && {
                                        color: COLORS.redViolet,
                                      },
                                ]}>
                                {contentApprovalStatus}
                              </Text>
                            </View>
                          )}
                          {/* <View style={[contentStyles.threeDotsContainer]}>
                            <Image resizeMode="contain" source={IMAGES.threeDots} style={contentStyles.threeDotsIcon} />
                          </View> */}
                        </View>
                        {item?.content_status_turbo_id === 0 ? (
                          <View style={contentStyles.infoContainer}>
                            <Image
                              resizeMode="contain"
                              source={IMAGES.info}
                              style={contentStyles.infoIcon}
                            />
                            <Text
                              allowFontScaling={false}
                              style={[
                                contentStyles.deadLineText,
                                deadlineDays <= 0 && {color: COLORS.newPrimary},
                              ]}>
                              {deadlineDays == 0
                                ? 'Last Day'
                                : deadlineDays > 0
                                ? `${deadlineDays} Days left`
                                : Math.abs(deadlineDays) +
                                  (Math.abs(deadlineDays) === 1
                                    ? ' Day '
                                    : ' Days ') +
                                  'Overdue'}
                            </Text>
                          </View>
                        ) : (
                          <Text
                            style={[
                              contentStyles.deadLineText,
                              {marginTop: verticalScale(10)},
                            ]}>
                            Content Submitted
                          </Text>
                        )}
                      </View>
                      <View style={contentStyles.divider} />
                      <View style={contentStyles.locationMainRow}>
                        <View style={contentStyles.nameLocationMainRow}>
                          <View style={contentStyles.locationImageContainer}>
                            <FastImage
                              resizeMode="cover"
                              source={{
                                priority: FastImage.priority.high,
                                uri: `${item?._restaurant_turbo?.Cover?.url}?tpl=${xanoImageSize}.jpg`,
                              }}
                              style={contentStyles.locationImage}
                            />
                          </View>
                          <View style={contentStyles.locationNameContainer}>
                            <Text
                              allowFontScaling={false}
                              style={contentStyles.locationNameText}
                              numberOfLines={1}>
                              {item?._restaurant_turbo?.Name}
                            </Text>
                            <View style={contentStyles.locationTextContainer}>
                              <Text
                                allowFontScaling={false}
                                style={contentStyles.locationText}
                                numberOfLines={2}>
                                {item?._restaurant_turbo?.Adress}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={contentStyles.rightIconContainer}>
                          <Image
                            resizeMode="contain"
                            source={IMAGES.back}
                            style={contentStyles.rightIcon}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
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
    </SafeAreaView>
  );
};

export default YourScheduleScreen;

const styles = StyleSheet.create({
  underReviewContainer: {
    marginTop: verticalScale(10),
    // paddingBottom: verticalScale(30),
  },
  listEmptyContainer: {
    alignItems: 'center',
    height: verticalScale(40),
    justifyContent: 'center',
    marginTop: '50%',
  },
  listEmptyText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  locationTimeMainContainer: {
    width: '100%',
  },
  approvalIcon: {
    height: moderateScale(8),
    tintColor: COLORS.mayGreen,
    width: moderateScale(10),
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
    backgroundColor: COLORS.lightNewPrimary40,
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
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
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
    textAlign: 'center',
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  selectedDateDayText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
  selectedDateMonthText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  selectedDateNumberText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(24),
    textAlign: 'center',
  },
  selectedTab: {
    // backgroundColor: COLORS.desertSand,
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(20),
    borderWidth: 0,
    height: verticalScale(32),
    marginHorizontal: scale(3),
    width: scale(162),
  },
  selectedTabText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  selectionTabContainer: {
    alignSelf: 'center',
    // backgroundColor: COLORS.veryLight,
    backgroundColor: COLORS.lightNewPrimary,
    borderRadius: moderateScale(20),
    borderWidth: 0,
    flexDirection: 'row',
    height: verticalScale(40),
  },
  selectionTabText: {
    // color: COLORS.desertSand,
    color: COLORS.newPrimary,
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
    textAlign: 'center',
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
});

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
    paddingVertical: scale(2),
  },
  contentApprovalStatusText: {
    color: COLORS.mayGreen,
    fontFamily: FONTS.quicksandBold,
    lineHeight: moderateScale(12),
    fontSize: moderateScale(10),
  },
  cardContentContainer: {
    flexDirection: 'row',
  },
  deadLineLocationContainer: {
    width: '75%',
    // flex: 1,
    // backgroundColor: 'red',
  },
  rightIconContainer: {
    // width: '10%',
    // marginBottom: verticalScale(20),s
    // marginTop: verticalScale(15),
    marginLeft: scale(20),
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(16),
    // paddingBottom: verticalScale(15),
    width: '95%',
    // ...Platform.select({
    //   ios: {
    //     height: verticalScale(120),
    //   },
    // }),
    // height: verticalScale(132),
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
    width: '85%',
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
    ...Platform.select({
      ios: {
        marginTop: verticalScale(5),
      },
    }),
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: verticalScale(10),
    width: '80%',
  },
  rightIcon: {
    height: moderateScale(25),
    marginTop: verticalScale(10),
    tintColor: COLORS.black,
    transform: [{rotate: '180deg'}],
    width: moderateScale(25),
  },
  socialMediaNameText: {
    marginTop: verticalScale(8),
    color: COLORS.newPrimary,
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
    height: verticalScale(50),
    flex: 1,
    // width: '100%',
    // backgroundColor: 'yellow',
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
    fontSize: moderateScale(12),
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  infoIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
    marginTop: verticalScale(2),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  ratingIconImage: {
    height: moderateScale(10),
    marginLeft: scale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(10),
    // backgroundColor: 'red',
  },
  ratingUsersText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
    // backgroundColor: 'red',
    lineHeight: moderateScale(14),
  },
  deadLineMainRow: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    // backgroundColor: 'cyan',
  },
  deadLineTitleTextContainer: {
    width: '58%',
    flexDirection: 'row',
    // backgroundColor: 'yellow',
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
    marginTop: verticalScale(10),
    height: verticalScale(50),
    // backgroundColor: 'green',
  },
  ratingSocialMediaContainer: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    width: scale(80.68),
    height: verticalScale(20),
  },
  ratingSocialMediaMainContainer: {
    height: verticalScale(132),
    // backgroundColor: COLORS.isabelLine,
    backgroundColor: COLORS.lightNewPrimary40,
  },
});
