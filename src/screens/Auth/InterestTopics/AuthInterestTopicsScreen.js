import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { CustomButton, CustomHeader } from '../../../components'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../../assets/images'
import { useAuthInterestTopics } from './hooks'

const AuthInterestTopicsScreen = () => {
  const { interestTopicsList, selectedInterests, handleInterestSelect, handleNextPress } = useAuthInterestTopics()
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={'Interests & Topics'} step={8} />
      <View style={styles.interestTopicsMainContainer}>
        {interestTopicsList.map((item, index) => {
          let isSelected = false
          const filteredRes = selectedInterests?.filter((si) => si?.id === item?.id)
          if (filteredRes.length > 0) {
            isSelected = true
          }
          return (
            <TouchableOpacity
              onPress={() => handleInterestSelect(item)}
              style={[styles.topicContainer, isSelected && styles.topicContainerWithSelection]}
              key={index}
            >
              {!isSelected && <Image source={IMAGES.plus} style={styles.plusIcon} />}
              <Text style={[styles.topicText, isSelected && styles.topicTextWithSelection]}>{item?.name}</Text>
              {isSelected && <Image source={IMAGES.checkRight} style={styles.checkIcon} />}
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Let the venues owners know about your topics</Text>
      </View>

      <View style={styles.btnContainer}>
        <CustomButton title={'Next'} handlePress={handleNextPress} />
      </View>
    </View>
  )
}

export default AuthInterestTopicsScreen

const styles = StyleSheet.create({
  descriptionText: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(14),
  },
  descriptionContainer: {
    marginTop: verticalScale(14),
    height: verticalScale(54),
    justifyContent: 'center',
  },
  checkIcon: {
    marginLeft: scale(5),
    height: moderateScale(8.25),
    width: moderateScale(12),
  },
  topicTextWithSelection: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.primary,
  },
  topicText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: moderateScale(16),
    marginLeft: scale(5),
  },
  plusIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
  },
  topicContainerWithSelection: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: moderateScale(2),
  },
  topicContainer: {
    paddingHorizontal: moderateScale(15),
    height: verticalScale(48),
    marginTop: verticalScale(10),
    backgroundColor: COLORS.isabelLine,
    flexDirection: 'row',
    marginHorizontal: scale(5),
    borderRadius: moderateScale(56),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnContainer: {
    marginTop: verticalScale(70),
  },
  interestTopicsMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
})
