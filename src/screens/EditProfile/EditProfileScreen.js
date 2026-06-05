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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
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
import {
  formatInstagramUrl,
  formatTiktokUrl,
  INSTA_USERNAME_REGEX,
  TIKTOK_USERNAME_REGEX,
} from '../../navigation/constants';
import {colors, perfectSize} from '../../utils';
import {useEditProfile} from './hooks';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const EditProfileScreen = () => {
  const {
    loading,
    user,
    country,
    profilePicData,
    control,
    handleSubmit,
    errors,
    interests,
    preIntrest,
    selectedIntrest,
    onSubmit,
    onSelect,
    defaultTiktokUrl,
    defaultInstagramUrl,
    tiktokRef,
    instaRef,
    setDynamicInputTextSpacing,
    tiktokInputOnChange,
    tiktokUserName,
    setTiktokUserName,
    handleIntrest,
    handlePaste,
    handleGalleryPress,
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
            render={({value, onChange, ref}) => (
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
                    <View style={styles.innerCountryContainer}>
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
                      <Text
                        allowFontScaling={false}
                        style={styles.countryText}>{`${
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
            render={({value, onChange}) => (
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
          {/* <View style={{marginVertical: verticalScale(12)}}>
            <Text style={styles.label}>Select Social Platform</Text>
            <AppSelect
              btnTextStyle={{fontFamily: FONTS.quicksand}}
              btnStyle={{backgroundColor: colors.light}}
              data={influencer_type || []}
              // label={'Select Social Platform'}
              selectStyle={{}}
              setSelectedValue={item => setSelectedInFluencer_type(item)}
              selectedValue={selectedInFluencer_type}
              placeholder={'Choose platforms where you qualify'}
            />
          </View> */}
          <Controller
            control={control}
            name="instagramLink"
            rules={{
              pattern: {
                value: INSTA_USERNAME_REGEX,
                // /^(https?:\/\/www\.instagram\.com\/[a-zA-Z0-9_]+|www\.instagram\.com\/[a-zA-Z0-9_]+|instagram\.com\/[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)$/,
                message: 'Enter a valid Instagram profile link',
              },
            }}
            render={({value, onChange, ref}) => (
              <AppInput
                inputWrapperStyle={{
                  paddingHorizontal: perfectSize(14),
                  // backgroundColor: 'cyan',
                }}
                prefixStyle={{paddingLeft: perfectSize(10)}}
                textInputStyle={{
                  alignItems: 'center',
                  marginLeft: moderateScale(-9),
                  // backgroundColor: 'cyan',
                }}
                iconStyle={{fontSize: perfectSize(20)}}
                prefixValue={defaultInstagramUrl}
                errors={errors.instagramLink?.message}
                img={insta}
                label="Instagram link"
                link
                onChange={val => {
                  let {username, link} = formatInstagramUrl(val);
                  onChange(username);
                  // setTiktokUserName(link);
                }}
                onPress={() => handlePaste('instagramLink')}
                // onfocus={() =>
                //   setDynamicInputTextSpacing(
                //     tiktokRef,
                //     defaultTiktokUrl?.length,
                //   )
                // }
                placeholder="user name"
                ref={ref}
                value={value}
              />
            )}
            // rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="tiktokLink"
            rules={{
              pattern: {
                value: TIKTOK_USERNAME_REGEX,
                message: 'Enter a valid Tiktok profile link',
              },
            }}
            render={({value, onChange, ref}) => (
              <AppInput
                inputWrapperStyle={{
                  paddingHorizontal: perfectSize(14),
                  // justifyContent: 'flex-end',
                  // backgroundColor: 'cyan',
                }}
                prefixStyle={{paddingLeft: perfectSize(10)}}
                textInputStyle={{
                  alignItems: 'center',
                  marginLeft: moderateScale(-9),
                  // backgroundColor: 'cyan',
                }}
                iconStyle={{fontSize: perfectSize(20)}}
                // pasteBtnStyle={{
                //   width: perfectSize(40),
                //   flexDirection: 'row',
                //   justifyContent: 'flex-end',
                //   // alignItems: 'flex-end ',
                //   backgroundColor: 'yellow',
                // }}
                ref={tiktokRef}
                errors={errors.tiktokLink?.message}
                img={tiktok}
                label="Tiktok link"
                link
                prefixValue={defaultTiktokUrl}
                onChange={val => {
                  let {username, link} = formatTiktokUrl(val);
                  onChange(username);
                  // setTiktokUserName(link);
                }}
                onPress={() => handlePaste('tiktokLink')}
                // onfocus={() =>
                //   setDynamicInputTextSpacing(
                //     tiktokRef,
                //     defaultTiktokUrl?.length,
                //   )
                // }
                placeholder="user name"
                value={tiktokUserName || value}
              />
            )}
            // rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="mapsAccount"
            render={({onChange, value, ref}) => (
              <AppInput
                inputWrapperStyle={{
                  paddingHorizontal: perfectSize(14),
                  // backgroundColor: 'yellow',
                }}
                iconStyle={{fontSize: perfectSize(20)}}
                // pasteBtnStyle={{
                //   width: perfectSize(40),
                //   flexDirection: 'row',
                //   justifyContent: 'flex-end',
                //   // flex: .18,
                //   // alignItems: 'flex-end ',
                //   backgroundColor: 'yellow',
                // }}
                ref={instaRef}
                errors={errors.mapsAccount?.message}
                img={map}
                label="Maps Account"
                link
                onChange={onChange}
                onPress={() => handlePaste('mapsAccount')}
                placeholder="Ex: maps.com/uichakir"
                value={value}
                onfocus={() =>
                  setDynamicInputTextSpacing(
                    instaRef,
                    defaultInstagramUrl?.length,
                  )
                }
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
            title={loading ? 'Saving...' : 'Save changes'}
            // style={{}}
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
  innerCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  label: {
    // fontFamily: fonts.inter500,
    color: colors.infoLight,

    fontSize: perfectSize(14),

    fontWeight: '500',
    marginBottom: perfectSize(8),
    textTransform: 'capitalize',
  },
});
