import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import React from 'react'
import { IMAGES } from '../../assets/images'
import FastImage from 'react-native-fast-image'

const ContentStatusModal = ({
  visible,
  title,
  description,
  isLoading,
  handleNegativeBtnPress,
  handlePositiveBtnPress,
}) => {
  const approvalStage = 'Approved'
  return (
    <Modal animationType="slide" onRequestClose={handleNegativeBtnPress} transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIconContainer}>
            <Image source={IMAGES.close} style={styles.closeIcon} />
          </TouchableOpacity>

          <View style={styles.statusIconTextContainer}>
            <View>
              <Image resizeMode="cover" source={IMAGES.approvalSuccess} style={styles.approvalIcon} />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusText}>Your content has been approved!</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingUsersText}>240</Text>
            <Image source={IMAGES.ratingStar} style={styles.ratingIconImage} />
          </View>

          <View
            style={[
              styles.onApprovalItemsMainContainer,
              approvalStage === 'To Publish'
                ? { backgroundColor: COLORS.cornSilk, borderColor: COLORS.americanYellow }
                : approvalStage === 'Rejected'
                ? { backgroundColor: COLORS.seaShellRed, borderColor: COLORS.follyRed }
                : approvalStage === 'Under Review'
                ? { backgroundColor: COLORS.azureishWhite, borderColor: COLORS.hanBlue }
                : approvalStage === 'Missed Deadline' && {
                    backgroundColor: COLORS.paleRose,
                    borderColor: COLORS.byzantine,
                  },
            ]}
          >
            <View style={styles.socialMediaDetailsMainRow}>
              <View style={styles.socialMediaImageContainer}>
                <FastImage resizeMode="contain" source={IMAGES.tiktok} style={styles.socialMediaImage} />
              </View>
              <View style={styles.socialMediaNameContainer}>
                <Text style={styles.socialMediaNameText}>
                  {/* {bookingDetails?._offers_turbo?.Offer_Name} */}
                  Full Tik tok
                </Text>
              </View>
              <View
                style={[
                  styles.onApprovalTextContainer,
                  approvalStage === 'To Publish'
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
                    approvalStage === 'To Publish'
                      ? { color: COLORS.americanYellow }
                      : approvalStage === 'Rejected'
                      ? { color: COLORS.error }
                      : approvalStage === 'Under Review'
                      ? { color: COLORS.celticBlue }
                      : approvalStage === 'Missed Deadline' && { color: COLORS.redViolet },
                  ]}
                >{`${approvalStage}`}</Text>
              </View>
            </View>
            <View style={styles.nameLocationMainRow}>
              <View style={styles.locationImageContainer}>
                <FastImage
                  resizeMode="cover"
                  source={IMAGES.testImage}
                  // source={{ priority: FastImage.priority.high, uri: bookingDetails?._restaurant_turbo?.Cover?.url }}
                  style={styles.locationImage}
                />
              </View>
              <View style={styles.locationNameContainer}>
                <Text style={styles.locationNameText}>
                  Pizzami Bali
                  {/* {bookingDetails?._restaurant_turbo?.Name} */}
                </Text>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationText}>
                    Chengduu Street 34, Bali
                    {/* {bookingDetails?._restaurant_turbo?.Adress} */}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.boxDescriptionContainer}>
              <Text
                style={[
                  styles.boxDescription,
                  approvalStage === 'To Publish'
                    ? { color: COLORS.americanYellow }
                    : approvalStage === 'Rejected'
                    ? { color: COLORS.error }
                    : approvalStage === 'Under Review'
                    ? { color: COLORS.celticBlue }
                    : approvalStage === 'Missed Deadline' && { color: COLORS.redViolet },
                ]}
              >{`Congratulations your content created at Pizzami has been approved!`}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.queryContainer}>
            <Image source={IMAGES.aeroplane} style={styles.queryIcon} />
            <Text style={styles.queryText}>Send us a message</Text>
          </TouchableOpacity>

          <View style={styles.okayBtnMainContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.okayBtnContainer}>
              <Text style={styles.okayBtnText}>Send to review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ContentStatusModal

const styles = StyleSheet.create({
  boxDescriptionContainer: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  closeIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  closeIconContainer: {
    marginTop: verticalScale(10),
    marginRight: scale(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  approvalIcon: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    // height: verticalScale(500),
    width: '99%',
  },
  statusIconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
  statusTextContainer: {
    marginTop: verticalScale(5),
    width: '90%',
  },
  ratingContainer: {
    marginTop: verticalScale(22),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ratingIconImage: {
    height: moderateScale(16),
    marginLeft: scale(5),
    tintColor: COLORS.primary,
    width: moderateScale(16),
  },
  ratingUsersText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(16),
  },
  onApprovalItemsMainContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.honeyDewGreen,
    borderColor: COLORS.mayGreen,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: verticalScale(32),
    paddingBottom: verticalScale(10),
    width: '95%',
  },
  onApprovalText: {
    color: COLORS.mayGreen,
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
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  socialMediaImageContainer: {
    marginLeft: scale(13),
  },
  socialMediaNameContainer: {
    width: '40%',
  },
  socialMediaNameText: {
    color: COLORS.black,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(18),
  },
  socialMediaImage: {
    borderRadius: moderateScale(10),
    height: moderateScale(67),
    width: moderateScale(67),
  },
  locationImage: {
    borderRadius: moderateScale(42),
    height: moderateScale(42),
    width: moderateScale(42),
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
    width: '95%',
  },
  nameLocationMainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(15),
  },
  boxDescription: {
    color: COLORS.mayGreen,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  queryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: verticalScale(50),
    width: '90%',
  },
  queryIcon: {
    height: moderateScale(19),
    marginRight: scale(5),
    tintColor: COLORS.primary,
    width: moderateScale(20),
  },
  queryText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(16),
    marginLeft: scale(16),
  },
  okayBtnContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightBrown,
    borderRadius: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    width: '100%',
  },
  okayBtnMainContainer: {
    borderBottomWidth: 0,
    borderColor: COLORS.whiteShadedTransparent,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: verticalScale(33),
    padding: moderateScale(24),
    width: '100%',
  },
  okayBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
})
