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

export const SettingsPresenter = ({ RightButton, navigateToAddresses }) => (
  <RouteContainer RightButton={RightButton} tKey={'settings'} withArrow>
    <Content>
      <Button onPress={navigateToAddresses} tKey={'addresses.title'} />
    </Content>
  </RouteContainer>
)
const Content = styled.ScrollView`
  padding: 20px 20px;
`
