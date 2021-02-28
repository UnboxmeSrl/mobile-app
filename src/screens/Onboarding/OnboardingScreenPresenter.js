import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Content } from '@components/Content'
import { Text } from '@components/Text'
import { COLORS } from '@const'
import { screenHeight, screenWidth } from '@const/common'

import { IMAGES } from '../../assets/images'

const BUTTON_SIZE = 56

export const OnboardingScreenPresenter = ({ onPress }) => (
  <Background resizeMode={'cover'} source={IMAGES.onboarding}>
    <ContentStyled>
      <TextStyled tKey={'onboarding'} />
      <Button onPress={onPress}>
        <Ionicons
          color={COLORS.white}
          name={'arrow-forward-outline'}
          size={BUTTON_SIZE / 2}
        />
      </Button>
    </ContentStyled>
  </Background>
)

const Background = styled.ImageBackground`
  height: ${screenHeight}px;
  justify-content: flex-end;
  width: ${screenWidth}px;
`
const ContentStyled = styled(Content)`
  flex-direction: row;
  justify-content: space-between;
`
const TextStyled = styled(Text)`
  font-size: 24px;
  line-height: 36px;
  width: 70%;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  align-self: flex-end;
  background-color: ${COLORS.dark};
  border-radius: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  justify-content: center;
  width: ${BUTTON_SIZE}px;
`
