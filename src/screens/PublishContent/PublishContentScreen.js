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
import React from 'react'
import { usePublishContent } from './hooks'
import { IMAGES } from '../../assets/images'
import { COLORS, FONTS } from '../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import FastImage from 'react-native-fast-image'
import { ContentStatusModal } from '../../components'

const PublishContentScreen = () => {
  const {
    link,
    setLink,
    approvalStage,
    contentDetails,
    updatedContentDetails,
    actionName,
    icon,
    bookingDate,
    month,
    timeFrame,
    isLoading,
    isSendToReview,
    isContentStatusModalVisible,
    handleContentModalOpenClose,
    handleSendToReviewBtnPress,
    handlePositiveBtnPress,
    handleContentBriefPress,
    handleEditPress,
    handleBackPress,
  } = usePublishContent()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
            <Image resizeMode="cover" source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Publish Content</Text>
          </View>
        </View>

        <View style={styles.onApprovalItemsMainContainer}>
          <View style={styles.socialMediaDetailsMainRow}>
            {actionName !== 'Story' && (
              <TouchableOpacity style={styles.editIconContainer} onPress={handleEditPress}>
                <Image source={IMAGES.edit} style={styles.editIcon} />
              </TouchableOpacity>
            )}
            <View style={styles.socialMediaImageContainer}>
              <FastImage resizeMode="contain" source={icon} style={styles.socialMediaImage} />
            </View>
            <View style={styles.socialMediaNameContainer}>
              <Text style={styles.socialMediaNameText}>{` ${
                actionName === 'Story' ? `3 X ${actionName}` : `Full ${actionName}`
              }`}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingUsersText}>240</Text>
                <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
              </View>
              <View style={styles.infoContainer}>
                <Image resizeMode="contain" source={IMAGES.info} style={styles.infoIcon} />
                <Text style={styles.deadLineText}>{`${contentDetails?._actions_turbo?.Days_deadline} Days left`}</Text>
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
              <Text
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

          {actionName !== 'Story' && (
            <>
              <View style={styles.linkUploadDescriptionContainer}>
                <Text style={styles.linkUploadDescriptionText}>Enter the link to your content and sent to review</Text>
                <View style={styles.linkUploadTextInputMainContainer}>
                  <View style={styles.linkUploadIconContainer}>
                    <Image source={IMAGES.link} style={styles.linkUploadIcon} resizeMode="contain" />
                  </View>
                  <View style={styles.linkUploadTextInputContainer}>
                    <TextInput
                      placeholder="Paste content link here"
                      placeholderTextColor={COLORS.newPrimary}
                      style={styles.linkUploadTextInput}
                      value={link}
                      onChangeText={(val) => setLink(val)}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.readContentBriefContainer} onPress={handleContentBriefPress}>
                <Text style={styles.contentBriefTitleText}>Read Content Brief & Tags</Text>
                <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View>
          <View style={styles.bookingDetailsTitleContainer}>
            <Text style={styles.bookingDetailsTitleText}>Booking Details:</Text>
          </View>
        </View>

        <View style={styles.nameLocationMainRow}>
          <View style={styles.locationImageContainer}>
            <FastImage
              resizeMode="cover"
              source={{ priority: FastImage.priority.high, uri: contentDetails?._restaurant_turbo?.Cover?.url }}
              style={styles.locationImage}
            />
          </View>
          <View style={styles.locationNameContainer}>
            <Text style={styles.locationNameText}>{contentDetails?._restaurant_turbo?.Name}</Text>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>{contentDetails?._restaurant_turbo?.Adress}</Text>
            </View>
          </View>
        </View>
        <View style={styles.serviceBoxContainer}>
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceTitleText}>Service</Text>
            <Text style={styles.serviceNameText}>{contentDetails?._offers_turbo?.Offer_Name}</Text>
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Date</Text>
            <Text style={styles.timeText}>{`${bookingDate?.getDate()} ${month} ${bookingDate?.getFullYear()}`}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitleText}>Time</Text>
            <Text style={styles.timeText}>
              {`${timeFrame?.Start}.${timeFrame?.Minute_Start} - ${timeFrame?.End}.${timeFrame?.Minute_End}`}{' '}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.contentDetailsContainer}>
            <Text style={styles.contentDetailsText}>Content details :</Text>
          </View>
        </View>
        <View style={styles.redirectsContainer}>
          <TouchableOpacity style={styles.contentBriefContainer} onPress={handleContentBriefPress}>
            <Text style={styles.socialMediaTitleText}>Content Brief & Tags</Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.howItWorksContainer}>
            <Text style={styles.socialMediaTitleText}>How it works </Text>
            <Image resizeMode="contain" source={IMAGES.back} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sendToReviewBtnMainContainer}>
        {isSendToReview ? (
          <View style={styles.sendToReviewBtnContainer}>
            <ActivityIndicator color={COLORS.black22} size={30} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleSendToReviewBtnPress} style={styles.sendToReviewBtnContainer}>
            <Text style={styles.sendToReviewBtnText}>Send to review</Text>
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
        />
      )}
    </ScrollView>
  )
}

export default PublishContentScreen

const styles = StyleSheet.create({
  editIcon: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  editIconContainer: {
    height: moderateScale(25),
    width: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    left: scale(10),
    top: verticalScale(-5),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(25),
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
    height: moderateScale(30),
    tintColor: COLORS.achromaticBlack,
    width: moderateScale(30),
  },
  backIconContainer: {
    alignItems: 'flex-end',
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
    width: '80%',
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(15),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(20),
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
    width: '45%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  rightIcon: {
    height: moderateScale(25),
    tintColor: COLORS.black,
    transform: [{ rotate: '180deg' }],
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
})
