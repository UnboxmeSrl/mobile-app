// eslint-disable-next-line simple-import-sort/imports
import Clipboard from '@react-native-clipboard/clipboard'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
// import { Avatar } from '@components/Avatar'
import { Caption } from '@components/Text'
import { COLORS } from '@const'
import { IMAGES } from '../../assets/images'
import insta from '../../assets/icons/insta.png'
import map from '../../assets/icons/map.png'
import tiktok from '../../assets/icons/tiktok.png'
import userImg from '../../assets/images/userImg.png'
import AppButton from '../../components/Buttons'
import Avatar from '../../components/Elements/Avatar'
import HStack from '../../components/Elements/HStack'
import Hobbies from '../../components/Elements/Hobbies'
import Label from '../../components/Elements/Label'
import Stack from '../../components/Elements/Stack'
import SubHeader from '../../components/Header/SubHeader'
import AppInput from '../../components/InputFields/AppInput'
import AppTextArea from '../../components/InputFields/AppTextArea'
import { setproFileData, userDetail } from '../../redux/slices/authSlice'
import CountryPicker from 'react-native-country-picker-modal'
import CountryFlag from 'react-native-country-flag'
import { getInterestTopics, updateProfile } from '../../services'
import { checkPermission, openGallery } from '../../utils'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../constants'

const EditIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'create-outline'} size={24} />
const AddPersonIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'person-add-outline'} size={24} />

export const EditProfileScreenPresenter = ({
  navigateTikTokModal,
  fullName,
  username,
  city,
  tiktokUsername,
  isAuthenticated,
  hasQuestionnaire,
  navigateToQuestionnaire,
  skinType,
  skincareRoutine,
  creams,
  brands,
  navigateToInvite,
  onImagePress,
  url,
  image,
  source,
  phone,
  gender,
  dob,
  email,
  navigateToWizard,
  navigateToNameEdit,
  navigateToDob,
  navigateToGender,
  navigateToCity,
}) => {
  const dispatch = useDispatch()
  const [profilePicData, setProfilePicData] = useState(null)

  const user = useSelector(userDetail)
  const [country, setCountry] = useState({
    cca2: user?.countryCode,
    name: user?.nationality,
  })
  console.log('checkUser', user.Profile_pic)
  const [intrests, setInrests] = useState([])
  const [selectedIntrest, setSelectedIntrest] = useState({})
  const isIos = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const androidVersion = Platform.Version

  const preIntrest = useMemo(() => {
    const data = user?.user_interest_topics_turbo_id.reduce(
      (acc, item) => ({ ...acc, [item.id]: { ...item, isChecked: true } }),
      {}
    )
    return data
  }, [user?.user_interest_topics_turbo_id])

  useEffect(() => {
    getInterestTopicsData()
  }, [])
  console.log('selectedIntrest', selectedIntrest)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      biography: user?.bio ?? '',
      countryCode: user?.countryCode ?? 'AI',
      fullName: user?.name ?? '',
      id: user?.id,
      instagramLink: user.IG_account ?? '',
      mapsAccount: '',
      nationality: user?.nationality ?? 'Anguilla',
      tiktokLink: user?.Tiktok_account ?? '',
    },
  })
  const getInterestTopicsData = async () => {
    const res = await getInterestTopics()
    setInrests(res?.data)
  }
  const handlePermission = async (permission) => {
    const res = await checkPermission(permission)
    return res
  }
  const handleGalleryPress = async () => {
    const permission = isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : isAndroid &&
        (androidVersion > 32 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    const isGranted = await handlePermission(permission)
    if (isGranted) {
      const res = await openGallery({ selectionLimit: 1 })

      if (res?.assets?.length > 0) {
        setProfilePicData(res?.assets[0])
      }
    }
    // profilePicUploadRef.current.close()
  }
  const handlePaste = async (param) => {
    const text = await Clipboard.getString()
    setValue(param, text)
  }
  const onSubmit = useCallback(
    async (data) => {
      const topicIds = Object.values({ ...preIntrest, ...selectedIntrest })?.filter((item) => item.isChecked)
      console.log(topicIds, 'ids')
      const formData = new FormData()
      formData.append('bio', data?.biography)
      formData.append('name', data?.fullName)
      formData.append('nationality', country?.name)
      formData.append('countryCode', country?.countryCode)
      topicIds?.map((item) => formData.append('user_interest_topics_turbo_id[]', item.id))
      if (profilePicData) {
        formData.append('profileImage', {
          name: profilePicData.fileName,
          type: profilePicData.type,
          uri: profilePicData.uri,
        })
      } else {
        formData.append('profileImage', {
          name: user.Profile_pic.fileName,
          type: user.Profile_pic.type,
          uri: user.Profile_pic.uri,
        })
      }
      formData.append('IG_account', data?.instagramLink)
      formData.append('Tiktok_account', data?.tiktokLink)
      const resProfile = await updateProfile({ formData, userID: user?.id })
      if (resProfile.success) {
        dispatch(setproFileData(resProfile.data))
      } else {
        console.error('Profile update failed')
      }
    },
    [dispatch, profilePicData, selectedIntrest, user, preIntrest]
  )

  const handleIntrest = useCallback(
    (param, isChecked) => {
      const interest = preIntrest[param.id]
      setSelectedIntrest((prev) => {
        const prevData = { ...prev }
        if (prevData[param.id] && interest?.isChecked === isChecked) {
          delete prevData[param.id]
        } else {
          prevData[param.id] = { ...param, isChecked }
        }
        return prevData
      })
    },
    [preIntrest]
  )
  const onSelect = (country) => {
    // console.log(country)
    // setValue('nationality', country.name)
    // setValue('countryCode', country.cca2)
    setCountry(country)
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: perfectSize(24) }}>
      <SubHeader title="Edit Profile" />
      <ScrollView stylee={{ flex: 1 }}>
        <Stack style={styles.avatarStack}>
          <View style={styles.avatarGrid}>
            <Avatar
              img={
                profilePicData
                  ? { uri: profilePicData.uri }
                  : { uri: user?.Profile_pic?.url ? user?.Profile_pic?.url : userImg }
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
            render={({ value, onBlur, onChange, ref }) => (
              <AppInput
                errors={errors.fullName?.message}
                img={user}
                label="Full Name"
                onChange={onChange}
                placeholder="Full name"
                value={value}
              />
            )}
            rules={{ required: 'Name is required' }}
          />
          <CountryPicker
            containerButtonStyle={styles.countryContainer}
            onSelect={onSelect}
            renderFlagButton={({ onOpen }) => {
              return (
                <TouchableOpacity onPress={() => onOpen()} style={styles.countryContainer} activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {country?.cca2 ? (
                      <CountryFlag isoCode={country?.cca2 ?? 'de'} size={25} />
                    ) : (
                      <Image source={IMAGES.sampleFlag} style={styles.flagIcon} resizeMode={'contain'} />
                    )}
                    <Text style={styles.countryText}>{`${country?.name ?? 'Country'}`}</Text>
                  </View>
                  <Image source={IMAGES.downArrow} style={styles.downArrowIcon} />
                </TouchableOpacity>
              )
            }}
            withEmoji={true}
            withFilter={true}
            withFlagButton={true}
          />
          <Controller
            control={control}
            name="biography"
            render={({ value, onBlur, onChange, ref }) => (
              <AppTextArea
                errors={errors.biography?.message}
                label="Biography"
                onChangeText={onChange}
                placeholder="Write a new Bio here .."
                value={value}
              />
            )}
            rules={{ required: 'Biography is required' }}
          />
          <Controller
            control={control}
            name="instagramLink"
            render={({ value, onChange, ref }) => (
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
            rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="tiktokLink"
            render={({ value, onChange, ref }) => (
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
            rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="mapsAccount"
            render={({ onChange, value, ref }) => (
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
            rules={{ required: 'link is required' }}
          />
          <View>
            <Label title="Intrests" />
            <HStack style={styles.intrestGrid}>
              {intrests?.map((item, ind) => (
                <Hobbies
                  key={ind}
                  // {...item}
                  {...(preIntrest[item?.id] ?? item)}
                  isChecked={(selectedIntrest[item.id] || preIntrest[item?.id])?.isChecked}
                  onClick={(checked) => handleIntrest(item, checked)}
                  style={styles.hobbies}
                  type="check"
                />
              ))}
            </HStack>
          </View>
          <AppButton onPress={handleSubmit(onSubmit)} title="Save changes" />
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
  )
}
const styles = StyleSheet.create({
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
  countryContainer: {
    marginTop: verticalScale(15),
    height: verticalScale(48),
    paddingHorizontal: scale(15),
    width: '85%',
    alignSelf: 'center',
    borderWidth: perfectSize(1),
    borderColor: COLORS.gainsboro,
    borderRadius: perfectSize(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: perfectSize(14),
    marginLeft: scale(10),
  },
  downArrowIcon: {
    height: verticalScale(6.38),
    width: scale(11.63),
  },
  hobbies: {
    marginTop: perfectSize(12),
    marginRight: perfectSize(8),
  },
})
const Space = styled.View`
  height: 20px;
`
const Container = styled.ScrollView`
  flex: 1;
`
const RightColumn = styled.View`
  flex-direction: row;
`
const Value = styled(Caption)`
  margin-right: 12px;
`
const Center = styled.View`
  align-items: center;
  justify-content: center;
`
const Tile = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  flex-direction: row;
  height: 52px;
  justify-content: space-between;
  margin: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  padding: 8px 20px;
`
