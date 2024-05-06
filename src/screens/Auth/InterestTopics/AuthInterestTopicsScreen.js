import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {CustomButton, CustomHeader} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthInterestTopics} from './hooks';

const AuthInterestTopicsScreen = () => {
  const {
    isLoading,
    isBtnDisabled,
    interestTopicsList,
    selectedInterests,
    handleInterestSelect,
    handleBackPress,
    handleNextPress,
  } = useAuthInterestTopics();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title={'Interests & Topics'}
        step={8}
        handleBackPress={handleBackPress}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size={moderateScale(20)}
            color={COLORS.newPrimary}
          />
        </View>
      ) : (
        <>
          <View style={styles.interestTopicsMainContainer}>
            {interestTopicsList?.map((item, index) => {
              let isSelected = false;
              const filteredRes = selectedInterests?.filter(
                si => si?.id === item?.id,
              );
              if (filteredRes.length > 0) {
                isSelected = true;
              }
              return (
                <TouchableOpacity
                  onPress={() => handleInterestSelect(item)}
                  style={[
                    styles.topicContainer,
                    isSelected && styles.topicContainerWithSelection,
                  ]}
                  key={index}>
                  {!isSelected && (
                    <Image source={IMAGES.plus} style={styles.plusIcon} />
                  )}
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.topicText,
                      isSelected && styles.topicTextWithSelection,
                    ]}>
                    {item?.interest_topics}
                  </Text>
                  {isSelected && (
                    <Image
                      source={IMAGES.checkRight}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.descriptionContainer}>
            <Text allowFontScaling={false} style={styles.descriptionText}>
              Let the venues owners know about your topics
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <CustomButton
              title={'Next'}
              handlePress={handleNextPress}
              disabled={isBtnDisabled}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default AuthInterestTopicsScreen;

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
    tintColor: COLORS.newPrimary,
    marginLeft: scale(5),
    height: moderateScale(8.25),
    width: moderateScale(12),
  },
  topicTextWithSelection: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.newPrimary,
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
    borderColor: COLORS.newPrimary,
    borderWidth: moderateScale(2),
  },
  topicContainer: {
    paddingHorizontal: moderateScale(15),
    height: verticalScale(48),
    marginTop: verticalScale(10),
    backgroundColor: COLORS.lightNewPrimaryA6,
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
  },
  loaderContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
