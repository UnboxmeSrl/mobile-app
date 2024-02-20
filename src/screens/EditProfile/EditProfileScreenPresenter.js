import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'
import { __ } from 'ramda'
import styled from 'styled-components/native'
import { Instagram } from '@components/Auth/Instagram'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Content } from '@components/Content'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, Caption, H3, SmallText, Subtitle } from '@components/Text'
import { COLORS, GENDER_LABELS } from '@const'

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
}) => (
  <RouteContainer tKey={'profile.editProfile'} withArrow withPadding>
    <Container>
      <Center>
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
      </Tile>
    </Container>
  </RouteContainer>
)
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
