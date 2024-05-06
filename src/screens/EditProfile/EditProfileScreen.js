import React from 'react';
import {Controller} from 'react-hook-form';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import CountryPicker from 'react-native-country-picker-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import insta from '../../assets/icons/insta.png';
import map from '../../assets/icons/map.png';
import tiktok from '../../assets/icons/tiktok.png';
import {IMAGES} from '../../assets/images';
import userImg from '../../assets/images/userProfile.jpg';
import {
  AppButton,
  AppInput,
  AppText,
  AppTextArea,
  Avatar,
  Hobbies,
  HStack,
  Label,
  Stack,
  SubHeader,
} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {colors, perfectSize} from '../../utils';
import {useEditProfile} from './hooks';

const EditProfileScreen = () => {
  const {
    loading,
    user,
    country,
    profilePicData,
    control,
    handleSubmit,
    setValue,
    errors,
    interests,
    preIntrest,
    selectedIntrest,
    onSubmit,
    onSelect,
    handleIntrest,
    handlePaste,
    handleGalleryPress,
    handlePermission,
    getInterestTopics,
  } = useEditProfile();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SubHeader title="Edit Profile" />
      <ScrollView stylee={styles.avatarContainer}>
        <Stack style={styles.avatarStack}>
          <View style={styles.avatarGrid}>
            <Avatar
              img={
                profilePicData
                  ? {uri: profilePicData?.uri}
                  : user?.Profile_pic?.url
                  ? {uri: user?.Profile_pic?.url}
                  : userImg
              }
              style={styles.avatar}
            />
            <Pressable onPress={handleGalleryPress} style={styles.uploadImg}>
              <Ionicons name="camera" style={styles.cameIcon} />
            </Pressable>
          </View>
        </Stack>
        <Stack>
          <Controller
            control={control}
            name="fullName"
            render={({value, onBlur, onChange, ref}) => (
              <AppInput
                errors={errors.fullName?.message}
                img={user}
                label="Full Name"
                onChange={onChange}
                placeholder="Full name"
                ref={ref}
                value={value}
              />
            )}
            rules={{required: 'Name is required'}}
          />
          <View>
            <AppText style={styles.copuntrylabel}>Country</AppText>
            <CountryPicker
              containerButtonStyle={styles.countryContainer}
              onSelect={onSelect}
              renderFlagButton={({onOpen}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => onOpen()}
                    style={styles.countryContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {country?.cca2 ? (
                        <CountryFlag
                          isoCode={country?.cca2 ?? 'de'}
                          size={25}
                        />
                      ) : (
                        <Image
                          resizeMode={'contain'}
                          source={IMAGES.sampleFlag}
                          style={styles.flagIcon}
                        />
                      )}
                      <Text style={styles.countryText}>{`${
                        country?.name ?? 'Country'
                      }`}</Text>
                    </View>
                    <Image
                      source={IMAGES.downArrow}
                      style={styles.downArrowIcon}
                    />
                  </TouchableOpacity>
                );
              }}
              withEmoji={true}
              withFilter={true}
              withFlagButton={true}
            />
          </View>
          <Controller
            control={control}
            name="biography"
            render={({value, onBlur, onChange, ref}) => (
              <AppTextArea
                errors={errors.biography?.message}
                label="Biography"
                onChangeText={onChange}
                placeholder="Write a new Bio here .."
                value={value}
              />
            )}
            rules={{required: 'Biography is required'}}
          />
          <Controller
            control={control}
            name="instagramLink"
            render={({value, onChange, ref}) => (
              <AppInput
                errors={errors.instagramLink?.message}
                img={insta}
                label="Instagram link"
                link
                onChange={onChange}
                onPress={() => handlePaste('instagramLink')}
                placeholder="Ex: instagram.com/uichakir"
                ref={ref}
                value={value}
              />
            )}
            // rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="tiktokLink"
            render={({value, onChange, ref}) => (
              <AppInput
                errors={errors.tiktokLink?.message}
                img={tiktok}
                label="Tiktok link"
                link
                onChange={onChange}
                onPress={() => handlePaste('tiktokLink')}
                placeholder="Ex: tiktok.com/uichakir"
                ref={ref}
                value={value}
              />
            )}
            // rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="mapsAccount"
            render={({onChange, value, ref}) => (
              <AppInput
                errors={errors.mapsAccount?.message}
                img={map}
                label="Maps Account"
                link
                onChange={onChange}
                onPress={() => handlePaste('mapsAccount')}
                placeholder="Ex: maps.com/uichakir"
                ref={ref}
                value={value}
              />
            )}
          />
          <View>
            <Label title="Intrests" />
            <HStack style={styles.intrestGrid}>
              {interests?.map((item, ind) => (
                <Hobbies
                  key={ind}
                  // {...item}
                  {...(preIntrest[item?.id] ?? item)}
                  isChecked={
                    (selectedIntrest[item.id] || preIntrest[item?.id])
                      ?.isChecked
                  }
                  onClick={checked => handleIntrest(item, checked)}
                  style={styles.hobbies}
                  type="check"
                />
              ))}
            </HStack>
          </View>
          <AppButton
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
            title="Save changes"
          />
        </Stack>
      </ScrollView>
      {/* <Center>
      <Avatar onPress={onImagePress} source={source} />
    </Center>
    <Tile disabled>
      <SmallText>Email</SmallText>
      <RightColumn>
        <Value>{'Add'}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Tile disabled>
      <SmallText>Phone</SmallText>
      <RightColumn>
        <Value>{'Add'}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Space />
    <Tile onPress={navigateToNameEdit}>
      <SmallText>Name</SmallText>
      <RightColumn>
        <Value>{fullName}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Tile onPress={navigateToNameEdit}>
      <SmallText>Nickname</SmallText>
      <RightColumn>
        <Value>{username}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Space />
    <Tile onPress={navigateToGender}>
      <SmallText>Gender</SmallText>
      <RightColumn>
        <Value tKey={GENDER_LABELS[gender]} />
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Tile onPress={navigateToDob}>
      <SmallText>Date of birth</SmallText>
      <RightColumn>
        <Value>{format(dob, 'dd/MM/yyyy')}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile>
    <Tile onPress={navigateToCity}>
      <SmallText>City</SmallText>
      <RightColumn>
        <Value>{city}</Value>
        <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
      </RightColumn>
    </Tile> */}
    </SafeAreaView>
    // {/* </Container>
    // </RouteContainer> */}
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  avatarStack: {
    alignItems: 'center',
  },
  avatarGrid: {
    position: 'relative',
  },
  avatar: {
    height: perfectSize(140),
    width: perfectSize(140),
  },
  uploadImg: {
    height: perfectSize(50),
    width: perfectSize(50),
    borderRadius: perfectSize(50),
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: perfectSize(2),
    borderColor: colors.white,
    position: 'absolute',
    right: 0,
    bottom: perfectSize(6),
  },
  cameIcon: {
    color: colors.white,
    fontSize: perfectSize(26),
  },
  intrestGrid: {
    flexWrap: 'wrap',
    paddingBottom: perfectSize(24),
  },
  btnContainer: {
    marginTop: verticalScale(170),
  },
  flagIcon: {
    width: scale(24),
    height: verticalScale(18),
  },
  copuntrylabel: {
    // fontFamily: fonts.inter500,
    color: colors.infoLight,

    fontSize: perfectSize(14),

    fontWeight: '500',
    marginBottom: perfectSize(8),
    textTransform: 'capitalize',
  },
  countryContainer: {
    // marginTop: verticalScale(15),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.light,
    borderColor: COLORS.gainsboro,
    borderRadius: perfectSize(10),
    borderWidth: perfectSize(1),
    flexDirection: 'row',
    height: verticalScale(48),
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(15),
    width: '100%',
  },
  countryText: {
    color: colors.dark,
    fontFamily: FONTS.quicksand,
    fontSize: perfectSize(14),
    marginLeft: scale(10),
    textAlign: 'center',
  },
  downArrowIcon: {
    height: verticalScale(6.38),
    width: scale(11.63),
  },
  hobbies: {
    marginTop: perfectSize(12),
    marginRight: perfectSize(8),
  },
});
