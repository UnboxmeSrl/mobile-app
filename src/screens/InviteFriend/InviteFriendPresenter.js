import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Instagram } from '@components/Auth/Instagram'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { ModalContainer } from '@components/ModalContainer'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, Caption, H2, H3, Subtitle, TinyText } from '@components/Text'
import { COLORS } from '@const'

const EditIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'create-outline'} size={24} />
const AddPersonIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'person-add-outline'} size={24} />

export const InviteFriendPresenter = ({
  navigateToWizard,
  onShare,
  onCopy,
  code,
  generatedReferralCode,
  generatedLink,
}) => (
  <ModalContainer tKey={'inviteFriend.title'}>
    <Content>
      <Description>Get 300 points Exp! The bonus points are useful to redeem special prices! </Description>
      <Tile>
        <ButtonText>{code ? 'You added the below code' : 'I have a code'}</ButtonText>
        {code ? (
          <>
            <H2>{code}</H2>
            <BodyText>You can't change the code once added</BodyText>
          </>
        ) : (
          <>
            <Description>
              If you came at the invitation of another user and they gave you their promo code, then enter it here!
            </Description>
            <StyledButton onPress={navigateToWizard} tKey={'inviteFriend.enterCode'} />
          </>
        )}
      </Tile>
      <Tile>
        <ButtonText>And this is your promocode</ButtonText>
        <H2>{generatedReferralCode}</H2>
        <Description>
          If you came at the invitation of another user and they gave you their promo code, then enter it here!
        </Description>
        <StyledButton onPress={onCopy} tKey={'inviteFriend.copyCode'} />
        <Description>or just share the link</Description>
        <ShareButton onPress={onShare}>
          <ButtonText>{generatedLink}</ButtonText>
          <Ionicons color={COLORS.achromaticBlack} name={'paper-plane-outline'} size={22} />
        </ShareButton>
      </Tile>
    </Content>
  </ModalContainer>
)
const Content = styled.ScrollView`
  padding: 0 20px;
`
const StyledButton = styled(Button)`
  margin-bottom: 0;
`
const Description = styled(BodyText)`
  margin: 16px 0;
`
const Tile = styled.View`
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  margin: 12px 0;
  padding: 20px;
`
const ShareButton = styled.TouchableOpacity`
  align-items: center;
  background-color: white;
  border-radius: 12px;
  flex-direction: row;
  height: 44px;
  justify-content: space-between;
  padding: 8px 16px;
`
