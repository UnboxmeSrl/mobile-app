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
import FastImage from 'react-native-fast-image';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../assets/images';
import {ContentStatusModal, PickerModal} from '../../components';
import {COLORS, FONTS, SCREEN_NAMES} from '../../constants';
import {usePublishContent} from './hooks';
import {getFormattedTime, xanoImageSize} from '../../utils';
import {navigate, showToastError} from '../../services';

const PublishContentScreen = () => {
  const {
    link,
    setLink,
    approvalStage,
    isEvent,
    deadlineDays,
    contentPhotos,
    contentDetails,
    contentUploadRef,
    updatedContentDetails,
    actionNumId,
    actionName,
    icon,
    bookingDate,
    month,
    timeFrame,
    shouldShowContentLinkInput,
    shouldShowContentBrief,
    shouldShowVenuePicturesUpload,
    isLoading,
    isSendToReview,
    isContentStatusModalVisible,
    handleContentModalOpenClose,
    handleSendToReviewBtnPress,
    handlePositiveBtnPress,
    handleSendMessagePress,
    handleContentBriefPress,
    handleContentUpload,
    handleCameraPress,
    handleGalleryPress,
    handleBackPress,
  } = usePublishContent();
  const actionQuantity = Number(
    contentDetails?._actions_turbo?.Action_quantity || 0,
  );
  const actionTitle =
    contentDetails?.isVenueDealBookingAction && actionQuantity > 1
      ? `${actionQuantity} X ${actionName}`
      : actionName === 'Story'
      ? `3 X ${actionName}`
      : `${actionName}`;
  const credits = contentDetails?._offers_turbo?.Credits;
  const shouldShowCredits =
    credits !== undefined && credits !== null && credits !== '';
  // console.log('contentDetails', contentDetails?.isCheckedIn, contentDetails);
  // console.log(
  //   contentDetails?.HourStart,
  //   contentDetails?.MinuteStart,
  //   contentDetails,
  //   // timeFrame,
  //   'HourStart_PublicContentScreen',
  // );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainScrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}>
            <Image
              resizeMode="contain"
              source={IMAGES.arrowLeft}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text allowFontScaling={false} style={styles.headerTitleText}>
              Publish Content
            </Text>
          </View>
        </View>

        <View style={styles.onApprovalItemsMainContainer}>
          <View style={styles.socialMediaDetailsMainRow}>
            <View style={styles.socialMediaImageContainer}>
              {icon?.uri ? (
                <FastImage
                  resizeMode="contain"
                  source={{
                    priority: FastImage.priority.high,
                    uri: icon.uri,
                  }}
                  style={styles.socialMediaImage}
                />
              ) : (
                !!icon && (
                  <Image
                    resizeMode="contain"
                    source={icon}
                    style={styles.socialMediaImage}
                  />
                )
              )}
            </View>
            <View style={styles.socialMediaNameContainer}>
              <Text
                allowFontScaling={false}
                style={styles.socialMediaNameText}>{`${actionTitle}`}</Text>
              {shouldShowCredits && (
                <View style={styles.ratingContainer}>
                  <Text allowFontScaling={false} style={styles.ratingUsersText}>
                    {credits}
                  </Text>
                  <Image
                    source={IMAGES.ratingStar}
                    style={styles.ratingIconImage}
                  />
                </View>
              )}
              <View style={styles.infoContainer}>
                <Image
                  resizeMode="contain"
                  source={IMAGES.info}
                  style={styles.infoIcon}
                />
                <Text allowFontScaling={false} style={styles.deadLineText}>
                  {deadlineDays > 0
                    ? `${deadlineDays} Days left`
                    : 'Missed Deadline'}
                </Text>
              </View>
            </View>
            {/* <View
              style={[
                styles.onApprovalTextContainer,
                approvalStage === 'Pending'
                  ? { backgroundColor: COLORS.cornSilk }
                  : approvalStage === 'Rejected'
                  ? { backgroundColor: COLORS.seaShellRed }
                  : approvalStage === 'Under Review'
                  ? { backgroundColor: COLORS.azureishWhite }
                  : approvalStage === 'Missed Deadline' && { backgroundColor: COLORS.paleRose },
              ]}
            >
              <Text allowFontScaling={false}
                style={[
                  styles.onApprovalText,
                  approvalStage === 'Pending'
                    ? { color: COLORS.americanYellow }
                    : approvalStage === 'Rejected'
                    ? { color: COLORS.error }
                    : approvalStage === 'Under Review'
                    ? { color: COLORS.celticBlue }
                    : approvalStage === 'Missed Deadline' && { color: COLORS.redViolet },
                ]}
              >{`${approvalStage}`}</Text>
            </View> */}
          </View>

          {shouldShowContentLinkInput && (
            <View style={styles.linkUploadDescriptionContainer}>
              <Text
                allowFontScaling={false}
                style={styles.linkUploadDescriptionText}>
                Enter the link to your content and sent to review
              </Text>
              <View style={styles.linkUploadTextInputMainContainer}>
                <View style={styles.linkUploadIconContainer}>
                  <Image
                    source={IMAGES.link}
                    style={styles.linkUploadIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.linkUploadTextInputContainer}>
                  <TextInput
                    allowFontScaling={false}
                    placeholder="Paste content link here"
                    placeholderTextColor={COLORS.newPrimary}
                    style={styles.linkUploadTextInput}
                    value={link}
                    onChangeText={setLink}
                  />
                </View>
              </View>
            </View>
          )}
          {shouldShowContentBrief && (
            <TouchableOpacity
              style={styles.readContentBriefContainer}
              onPress={handleContentBriefPress}>
              <Text
                allowFontScaling={false}
                style={styles.contentBriefTitleText}>
                Read Content Brief & Tags
              </Text>
              <Image
                resizeMode="contain"
                source={IMAGES.back}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {shouldShowVenuePicturesUpload && (
          <View style={styles.imageUploadMainContainer}>
            <Text allowFontScaling={false} style={styles.uploadPictureTitle}>
              Upload 3 pictures at the venue
            </Text>
            <FlatList
              data={contentPhotos}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleContentUpload(index)}
                    style={styles.imageUploadContainer}
                    activeOpacity={0.4}>
                    {item?.fileName ? (
                      <Image
                        source={{uri: item?.uri}}
                        style={styles.actualUploadedPicture}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <>
                        <Image
                          source={IMAGES.gallery}
                          style={styles.galleryIcon}
                        />
                        <Text
                          allowFontScaling={false}
                          style={styles.uploadText}>
                          Upload
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}

        <View>
          <View style={styles.bookingDetailsTitleContainer}>
            <Text
              allowFontScaling={false}
              style={styles.bookingDetailsTitleText}>
              Booking Details:
            </Text>
          </View>
        </View>

        <View style={styles.nameLocationMainRow}>
          <View style={styles.locationImageContainer}>
            <FastImage
              resizeMode="cover"
              source={{
                priority: FastImage.priority.high,
                uri: `${contentDetails?._restaurant_turbo?.Cover?.url}?tpl=${xanoImageSize}.jpg`,
              }}
              style={styles.locationImage}
            />
          </View>
          <View style={styles.locationNameContainer}>
            <Text allowFontScaling={false} style={styles.locationNameText}>
              {contentDetails?._restaurant_turbo?.Name}
            </Text>
            <View style={styles.locationTextContainer}>
              <Text allowFontScaling={false} style={styles.locationText}>
                {contentDetails?._restaurant_turbo?.Adress}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.serviceBoxContainer}>
          <View style={styles.serviceContainer}>
            <Text allowFontScaling={false} style={styles.serviceTitleText}>
              Service
            </Text>
            <Text allowFontScaling={false} style={styles.serviceNameText}>
              {contentDetails?._offers_turbo?.Offer_Name}
            </Text>
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.timeContainer}>
            <Text allowFontScaling={false} style={styles.timeTitleText}>
              Date
            </Text>
            <Text
              allowFontScaling={false}
              style={
                styles.timeText
              }>{`${bookingDate?.getUTCDate()} ${month} ${bookingDate?.getUTCFullYear()}`}</Text>
          </View>
          {actionNumId !== 9 &&
            (!!timeFrame ||
              (contentDetails?.HourStart && contentDetails?.HourEnd)) && (
              <View style={styles.timeContainer}>
                <Text allowFontScaling={false} style={styles.timeTitleText}>
                  Time
                </Text>
                <Text allowFontScaling={false} style={styles.timeText}>
                  {isEvent
                    ? `${getFormattedTime(contentDetails?.booking_time)}`
                    : `${timeFrame?.Start}:${timeFrame?.Minute_Start} - ${timeFrame?.End}:${timeFrame?.Minute_End}`}
                </Text>
              </View>
            )}
        </View>

        <View>
          <View style={styles.contentDetailsContainer}>
            <Text allowFontScaling={false} style={styles.contentDetailsText}>
              Content details :
            </Text>
          </View>
        </View>
        <View style={styles.redirectsContainer}>
          <TouchableOpacity
            style={styles.contentBriefContainer}
            onPress={handleContentBriefPress}>
            <Text allowFontScaling={false} style={styles.socialMediaTitleText}>
              Content Brief & Tags
            </Text>
            <Image
              resizeMode="contain"
              source={IMAGES.back}
              style={styles.rightIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.howItWorksContainer}
            onPress={() => navigate(SCREEN_NAMES.AppInfo)}>
            <Text allowFontScaling={false} style={styles.socialMediaTitleText}>
              How it works
            </Text>
            <Image
              resizeMode="contain"
              source={IMAGES.back}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sendToReviewBtnMainContainer}>
          {isSendToReview ? (
            <View style={styles.sendToReviewBtnContainer}>
              <ActivityIndicator color={COLORS.black22} size={30} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSendToReviewBtnPress}
              style={[
                styles.sendToReviewBtnContainer,
                // !contentDetails?.isCheckedIn && {opacity: 0.4},
              ]}
              // disabled={!contentDetails?.isCheckedIn}
            >
              <Text allowFontScaling={false} style={styles.sendToReviewBtnText}>
                Send to review
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {isContentStatusModalVisible && (
          <ContentStatusModal
            visible={isContentStatusModalVisible}
            isLoading={isLoading}
            contentDetails={updatedContentDetails}
            handleNegativeBtnPress={handleContentModalOpenClose}
            handlePositiveBtnPress={handlePositiveBtnPress}
            handleSendMessagePress={handleSendMessagePress}
          />
        )}
        <PickerModal
          ref={contentUploadRef}
          handleCameraPress={handleCameraPress}
          handleGalleryPress={handleGalleryPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublishContentScreen;

const styles = StyleSheet.create({
  uploadPictureTitle: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
    color: COLORS.black,
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15.72),
  },
  imageUploadMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadContainer: {
    width: scale(100),
    height: verticalScale(100),
    backgroundColor: COLORS.cultured,
    borderWidth: moderateScale(0.98),
    borderRadius: moderateScale(16),
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginHorizontal: scale(5),
  },
  actualUploadedPicture: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(16),
  },
  galleryIcon: {
    height: moderateScale(21.62),
    width: moderateScale(21.62),
  },
  uploadText: {
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(14),
    color: COLORS.darkSilver,
    marginTop: verticalScale(15.72),
  },

  mainScrollView: {
    backgroundColor: COLORS.white,
  },
  serviceNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
  },
  serviceTitleText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  serviceContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
  },
  serviceBoxContainer: {
    marginHorizontal: scale(10),
  },
  linkUploadTextInput: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  linkUploadTextInputContainer: {
    justifyContent: 'center',
    width: '82%',
  },
  linkUploadIcon: {
    tintColor: COLORS.newPrimary,
    width: moderateScale(24),
    height: moderateScale(24),
  },
  linkUploadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  linkUploadTextInputMainContainer: {
    height: verticalScale(44),
    width: '95%',
    flexDirection: 'row',
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.white,
    marginTop: verticalScale(8),
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    justifyContent: 'center',
  },
  linkUploadDescriptionText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  linkUploadDescriptionContainer: {
    marginTop: verticalScale(13),
    marginLeft: scale(15),
  },
  bookingDetailsTitleContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(24),
  },
  bookingDetailsTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17.77),
  },
  backIcon: {
    height: moderateScale(24),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(24),
  },
  backIconContainer: {
    alignItems: 'center',
    height: moderateScale(44),
    justifyContent: 'center',
    width: '15%',
  },
  contentBriefContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(44),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  contentDetailsContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(24),
  },
  contentDetailsText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(17.77),
    marginTop: verticalScale(10),
  },
  readContentBriefContainer: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(44),
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: scale(15),
  },
  contentBriefTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  dateTimeContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  deadLineText: {
    color: COLORS.philippineGray,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(5),
  },
  howItWorksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  infoIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  locationImage: {
    borderRadius: moderateScale(67),
    height: moderateScale(67),
    width: moderateScale(67),
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
  },
  locationText: {
    color: COLORS.gray,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(12),
  },
  locationTextContainer: {
    width: '100%',
    paddingRight: scale(80),
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(15),
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
  onApprovalItemsMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightNewPrimary,
    borderRadius: moderateScale(10),
    paddingBottom: verticalScale(10),
    width: '95%',
  },
  onApprovalText: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  onApprovalTextContainer: {
    alignItems: 'center',
    borderRadius: moderateScale(10),
    height: verticalScale(28),
    justifyContent: 'center',
    width: scale(100),
  },
  socialMediaDetailsMainRow: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
  },
  socialMediaImageContainer: {
    marginLeft: scale(13),
  },
  socialMediaNameContainer: {
    marginLeft: scale(15),
    width: '50%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  rightIcon: {
    height: moderateScale(25),
    tintColor: COLORS.black,
    transform: [{rotate: '180deg'}],
    width: moderateScale(25),
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingIconImage: {
    height: moderateScale(16),
    marginLeft: scale(5),
    tintColor: COLORS.newPrimary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  redirectsContainer: {
    marginTop: verticalScale(5),
    paddingHorizontal: scale(10),
  },
  socialMediaTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(14),
  },
  socialMediaImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  sendToReviewBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.newPrimary,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  sendToReviewBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(14),
    padding: moderateScale(24),
    width: '100%',
  },
  sendToReviewBtnText: {
    color: COLORS.black22,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  timeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(19),
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
