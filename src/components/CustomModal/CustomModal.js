import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'

const CustomModal = ({ visible, title, description, isLoading, handleNegativeBtnPress, handlePositiveBtnPress }) => {
  return (
    <Modal animationType="slide" onRequestClose={handleNegativeBtnPress} transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleDescriptionContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            {isLoading ? (
              <View style={styles.yesBtnContainer}>
                <ActivityIndicator color={COLORS.primary} size={20} />
              </View>
            ) : (
              <TouchableOpacity onPress={handlePositiveBtnPress} style={styles.yesBtnContainer}>
                <Text style={styles.yesBtnText}>Yes</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleNegativeBtnPress} style={styles.noBtnContainer}>
              <Text style={styles.noBtnText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  titleDescriptionContainer: {
    height: verticalScale(104),
  },
  titleContainer: {
    marginTop: verticalScale(19),
    height: verticalScale(24),
    width: scale(238),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.josefinSansSemiBold,
    fontSize: moderateScale(16),
    color: COLORS.achromaticBlack,
  },
  descriptionContainer: {
    marginTop: verticalScale(2),
    height: verticalScale(40),
    width: scale(238),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: FONTS.josefinSans,
    fontSize: moderateScale(14),
    color: COLORS.achromaticBlack,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(44),
    borderRadius: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderTopColor: COLORS.lightGray,
  },
  yesBtnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
    borderRightWidth: moderateScale(1),
    borderRightColor: COLORS.lightGray,
  },
  yesBtnText: {
    fontFamily: FONTS.josefinSans,
    fontSize: moderateScale(16),
    color: COLORS.dark,
  },
  noBtnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  noBtnText: {
    fontFamily: FONTS.josefinSans,
    fontSize: moderateScale(16),
    color: COLORS.dark,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    height: verticalScale(148),
    width: scale(270),
  },
})

export default CustomModal
