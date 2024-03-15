import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

// import { Avatar } from '@components/Avatar'
import { Caption } from '@components/Text'
import { COLORS } from '@const'

import insta from '../../assets/icons/insta.png'
import map from '../../assets/icons/map.png'
import tiktok from '../../assets/icons/tiktok.png'
import user from '../../assets/icons/user.png'
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
import { getInterestTopics } from '../../services'
import { checkPermission, openGallery } from '../../utils'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import { userDetail } from '../../redux/slices/authSlice'

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
  const user = useSelector(userDetail)
  const [intrests, setInrests] = useState([])
  console.log('userDetail', user)
  const [selectedIntrest, setSelectedIntrest] = useState()
  const profilePicUploadRef = useRef()
  const isIos = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const androidVersion = Platform.Version
 

  useEffect(() => {
    getInterestTopicsData()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      biography: user?.bio ?? '',
      fullName: user?.name ?? '',
      id: user?.id,
      instagramLink: '',
      interests: '',
      mapsAccount: '',
      tiktokLink: '',
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
  console.log(errors)
  const onSubmit = (data) => {
    console.log(data)
    // disapatch(updateProfile(data))
  }
  const handleIntrest = (param, isChecked = false) => {
    console.log(param)
    setSelectedIntrest((pre) => ({
      ...pre,
      [param.id]: { ...param, isChecked: !isChecked },
    }))
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
                placeholder="Ex: instagram.com/uichakir"
                ref={ref}
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
                  {...item}
                  isChecked={user?.user_interest_topics_turbo_id.some((data) => data.id === item.id)}
                  onClick={() => handleIntrest(item)}
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
