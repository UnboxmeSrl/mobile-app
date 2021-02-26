import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { AppleLogin } from '@components/Auth/AppleLogin'
import { OtherOptionsButton } from '@components/Auth/LoginButton'
import { Content } from '@components/Content'
import { Policies } from '@components/Policies'
import { BodyText, H3, Text } from '@components/Text'
import { screenHeight,screenWidth } from '@const/common'

import { IMAGES } from '../../assets/images'

export const SignUpScreenPresenter = () => (
    <Background resizeMode={'cover'} source={IMAGES.signUp}>
      <ContentStyled>
        <Header>
          <HeaderTitle tKey={'signUp.createContent'} />
          <Body tKey={'signUp.tellEveryone'} />
        </Header>
        <Buttons>
          <AppleLogin />
          <OtherOptionsButton />
        </Buttons>
        <PoliciesPart />
      </ContentStyled>
    </Background>
)

const ContentStyled = styled(Content)`
  flex: 1
`
const Header = styled.View`
  flex: 0.3;
  justify-content: center;
`
const HeaderTitle = styled(H3)`
  margin-bottom: 16px;
  text-align: center;
`
const Body = styled(BodyText)`
  text-align: center;
`
const Buttons = styled.View`
  flex: 0.6;
  justify-content: center;
`
const PoliciesPart = styled(Policies)`
  flex: 0.1;
  justify-content: flex-end;
`

const Background = styled.ImageBackground`
  height: ${screenHeight}px;
  width: ${screenWidth}px;
`
