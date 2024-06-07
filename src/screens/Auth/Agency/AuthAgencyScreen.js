import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../assets';
import {CustomButton, CustomHeader, CustomTextInput} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import {useAuthAgency} from './hooks';
import AppSelect from '../../../components/Elements/AppSelect';

const AuthAgencyScreen = () => {
  const {
    isBtnDisabled,
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleBackPress,
    handleNextPress,
    interestTopicsList,
    selectedInterests,
    handleInterestSelect,
    userTypeList,
    setSelectedUserType,
    selectedUserType,
  } = useAuthAgency();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title={'your Agency'}
        step={3}
        handleBackPress={handleBackPress}
      />
      <View style={styles.content}>
        <AppSelect
          data={userTypeList || []}
          setSelectedValue={setSelectedUserType}
          selectedValue={selectedUserType}
          placeholder={'What are you?'}
        />

        <View style={styles.OptionsMainContainer}>
          <TouchableOpacity
            onPress={() => setSelectedValue(1)}
            style={styles.freelancerContainer}>
            {selectedValue === 1 ? (
              <Image source={IMAGES.checkMark} style={styles.checkMarkIcon} />
            ) : (
              <View style={styles.roundedView} />
            )}
            <Text allowFontScaling={false} style={styles.textStyle}>
              I am a freelances
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedValue(2)}
            style={styles.agencyContainer}>
            {selectedValue === 2 ? (
              <Image source={IMAGES.checkMark} style={styles.checkMarkIcon} />
            ) : (
              <View style={styles.roundedView} />
            )}
            <Text allowFontScaling={false} style={styles.textStyle}>
              I work with Agency
            </Text>
          </TouchableOpacity>
        </View>

        {selectedValue === 2 && (
          <CustomTextInput
            placeholder={'your Agency'}
            value={agencyName}
            handleOnChangeText={setAgencyName}
          />
        )}

        <Text
          allowFontScaling={false}
          style={[
            styles.textStyle,
            {marginTop: verticalScale(24), marginBottom: verticalScale(10)},
          ]}>
          Interest & Topics
        </Text>
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
                  <Image source={IMAGES.checkRight} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title={'Next'}
          handlePress={handleNextPress}
          disabled={isBtnDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthAgencyScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(150),
  },
  agencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  freelancerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONTS.quicksandBold,
    textAlign: 'center',
    color: COLORS.achromaticBlack,
    fontSize: moderateScale(16),
    marginLeft: scale(20),
  },
  roundedView: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(24),
    borderWidth: moderateScale(1),
    borderColor: COLORS.newPrimary,
  },
  checkMarkIcon: {
    // tintColor: COLORS.newPrimary,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  OptionsMainContainer: {
    // marginLeft: scale(24),
    marginTop: verticalScale(24),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  interestTopicsMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
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
    // marginLeft: scale(5),
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
    // paddingHorizontal: moderateScale(15),
    height: verticalScale(48),
    marginTop: verticalScale(10),
    backgroundColor: COLORS.lightNewPrimaryA6,
    flexDirection: 'row',
    marginHorizontal: scale(5),
    borderRadius: moderateScale(56),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: scale(10),
    columnGap: scale(5),
  },
  content: {
    padding: verticalScale(16),
    flex: 1,
  },
});
