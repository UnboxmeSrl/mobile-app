import React, { useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'
import { __ } from 'ramda'
import styled from 'styled-components/native'
import { Instagram } from '@components/Auth/Instagram'
// import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Content } from '@components/Content'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, Caption, H3, SmallText, Subtitle } from '@components/Text'
import { COLORS, GENDER_LABELS } from '@const'
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import SubHeader from '../../components/Header/SubHeader'
import perfectSize from '../../utils/responsiveSize'
import Stack from '../../components/Elements/Stack'
import Avatar from '../../components/Elements/Avatar'
import userImg from '../../assets/images/userImg.png'
import { colors } from '../../utils/theme'
import AppInput from '../../components/InputFields/AppInput'
import user from '../../assets/icons/user.png'
import insta from '../../assets/icons/insta.png'
import tiktok from '../../assets/icons/tiktok.png'
import map from '../../assets/icons/map.png'
import AppTextArea from '../../components/InputFields/AppTextArea'
import AppButton from '../../components/Buttons'
import Label from '../../components/Elements/Label'
import Hobbies from '../../components/Elements/Hobbies'
import HStack from '../../components/Elements/HStack'
import { checkPermission, openGallery } from '../../utils'
import { PERMISSIONS } from 'react-native-permissions'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

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
  const [profilePicData, setProfilePicData] = useState(null)
  const userDetail = useSelector((state) => state.authSlice.loginData)
  console.log('userDetail', userDetail)
  const profilePicUploadRef = useRef()
  const isIos = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const androidVersion = Platform.Version
  const intrestData = [
    {
      interest_topics: 'Sports',
    },
    {
      interest_topics: 'Music',
    },
    {
      interest_topics: 'Design',
    },
    {
      interest_topics: 'Travel',
    },
    {
      interest_topics: 'Digital Art',
    },
  ]

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      biography: userDetail?.bio ?? '',
      fullName: userDetail?.name ?? '',
      instagramLink: '',
      interests: '',
      mapsAccount: '',
      tiktokLink: '',
    },
  })

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

  return (
    // <RouteContainer tKey={'profile.editProfile'} withArrow withPadding>
    //   <Container>
    <SafeAreaView style={{ flex: 1, paddingTop: perfectSize(24) }}>
      <SubHeader title="Edit Profile" />
      <ScrollView stylee={{ flex: 1 }}>
        <Stack style={styles.avatarStack}>
          <View style={styles.avatarGrid}>
            <Avatar img={userDetail?.Profile_pic?.url ?? userImg} style={styles.avatar} />
            <Pressable style={styles.uploadImg} onPress={handleGalleryPress}>
              <Ionicons name="camera" style={styles.cameIcon} />
            </Pressable>
          </View>
        </Stack>
        <Stack>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <AppInput
                errors={errors.fullName?.message}
                img={user}
                label="Full Name"
                // onChange={onChange}
                placeholder="Full name"
                value={value}
              />
            )}
            rules={{ required: 'Name is required' }}
          />
          <Controller
            control={control}
            name="biography"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <AppTextArea
                errors={errors.biography?.message}
                label="Biography"
                // onChangeText={onChange}
                placeholder="Write a new Bio here .."
                value={value}
              />
            )}
            rules={{ required: 'Biography is required' }}
          />
          <Controller
            control={control}
            name="instagramLink"
            render={({ field: { onChange, ref, onBlur, value } }) => (
              <AppInput
                img={insta}
                label="Instagram link"
                link
                // onChange={onChange}
                placeholder="Ex: instagram.com/uichakir"
                value={value}
                // errors={errors.instagramLink?.message}
              />
            )}
            rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="tiktokLink"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <AppInput
                errors={errors.tiktokLink?.message}
                img={tiktok}
                label="Tiktok link"
                link
                // onChange={onChange}
                placeholder="Ex: tiktok.com/uichakir"
                value={value}
              />
            )}
            rules={{ required: 'link is required' }}
          />
          <Controller
            control={control}
            name="mapsAccount"
            render={({ field: { onChange, ref, onBlur, value } }) => (
              <AppInput
                errors={errors.mapsAccount?.message}
                img={map}
                label="Maps Account"
                link
                // onChange={onChange}
                placeholder="Ex: maps.com/uichakir"
                value={value}
              />
            )}
            rules={{ required: 'link is required' }}
          />
          <View>
            <Label title="Intrests" />
            <HStack style={styles.intrestGrid}>
              {intrestData?.map((item, ind) => (
                <Hobbies key={ind} {...item} type="check" style={styles.hobbies} />
              ))}
            </HStack>
          </View>
          <AppButton title="Save changes" />
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
