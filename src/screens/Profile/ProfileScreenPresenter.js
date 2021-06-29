import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Instagram } from '@components/Auth/Instagram'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { FormTask } from '@components/FormTask'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { Points } from '@components/Points'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, Caption, H3, Subtitle, TinyText } from '@components/Text'
import { COLORS } from '@const'

const EditIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'create-outline'} size={24} />
const AddPersonIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'person-add-outline'} size={24} />

export const ProfileScreenPresenter = ({
  navigateTikTokModal,
  fullName,
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
  navigateToSettings,
  navigateToEditProfile,
  source,
}) => (
  <Container tKey={'profile'}>
    <FormTask />
    {isAuthenticated ? (
      <>
        <Header>
          <Points />
          <Column>
            <SmallButton Icon={EditIcon} onPress={navigateToEditProfile} />
            <SmallButton
              Icon={() => <Ionicons color={COLORS.achromaticBlack} name={'settings-outline'} size={24} />}
              onPress={navigateToSettings}
            />
          </Column>
        </Header>
        <Center>
          <Avatar source={source} />
          <H3>{fullName}</H3>
          <Caption>{city}</Caption>
        </Center>
        <Button
          bgColor={COLORS.veryLight}
          leftIconName={'logo-tiktok'}
          light
          onPress={navigateTikTokModal}
          tKey={tiktokUsername ? 'onValidation' : 'connectTikTok'}
          tOptions={{ username: `@${tiktokUsername}` }}
        />
        <Instagram bgColor={COLORS.tertiary} light />
        <Tile onPress={navigateToQuestionnaire}>
          <>
            <Row style={{ marginBottom: 12 }}>
              <ButtonText>Health profiling</ButtonText>
              <EditIcon />
            </Row>
            {!hasQuestionnaire ? (
              <BodyText>
                Please fill it out so that we can select only the products that suit you and your type of skin.
              </BodyText>
            ) : (
              <>
                <Row>
                  <BodyText>Skin type</BodyText>
                  <Labels>{skinType}</Labels>
                </Row>
                <Row>
                  <BodyText>Skin routine</BodyText>
                  <Labels>{skincareRoutine ? 'Yes' : 'No'}</Labels>
                </Row>
                <Row>
                  <BodyText>Cream types</BodyText>
                  <Labels>{creams}</Labels>
                </Row>
                <Row>
                  <BodyText>Favourite brands</BodyText>
                  <Labels>{brands.length} brands</Labels>
                </Row>
              </>
            )}
          </>
        </Tile>
        <Tile onPress={navigateToInvite}>
          <Row style={{ marginBottom: 12 }}>
            <ButtonText>Invite a friend</ButtonText>
            <AddPersonIcon />
          </Row>
          <BodyText>and get 300 points Experience!</BodyText>
        </Tile>
      </>
    ) : (
      <LoginGuest />
    )}
    {/* <Button onPress={navigateToOnboarding} tKey={'onboardingTitle'} /> */}
    {/* <Button onPress={navigateToAddresses} tKey={'addresses.title'} /> */}
    {/* <Button onPress={navigateToYourRating} tKey={'Your Rating'} /> */}
    {/* {isAuthenticated ? <Button onPress={navigateToQuestionnaire} tKey={'questionnaire.title'} /> : null} */}
  </Container>
)

const Container = styled(RouteContainer)`
  flex: 1;
`
const Center = styled.View`
  align-items: center;
  justify-content: center;
  top: -20px;
`
const Column = styled.View`
  flex-direction: row;
`
const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 20px;
`
const SmallButton = styled(IconButton)`
  margin-left: 4px;
`
const Tile = styled.TouchableOpacity`
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  margin: 12px 20px;
  padding: 20px;
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Labels = styled(Subtitle)``
