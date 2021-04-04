import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, H3, Subtitle } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'

import { IMAGES } from '../../assets/images'

export const BoxStepDescriptionPresenter = ({ onPress }) => {
  return (
    <Step>
      <ImageWrapper>
        <Image resizeMode={'contain'} source={IMAGES.boxItems} />
      </ImageWrapper>
      <Bottom>
        <Title>October box</Title>
        <Body>
          The October box is gonna be about the cure of your skin. Do you have a skin routine? This box is gonna help
          you start your personal skin building
        </Body>
        <Selected>8 products selected</Selected>
        <Button onPress={onPress} tKey={'next'} />
      </Bottom>
    </Step>
  )
}

const Selected = styled(Subtitle)`
  color: ${COLORS.primaryDark};
  margin-bottom: 40px;
  text-align: right;
`
const Title = styled(H3)`
  margin-bottom: 16px;
`
const Body = styled(BodyText)`
  margin-bottom: 16px;
`
const Bottom = styled.View`
  margin-bottom: 16px;
`
const Step = styled(StepContent)``
const ImageWrapper = styled.View`
  height: 250px;
  width: 90%;
`
const Image = styled.Image`
  flex: 1;
  width: 100%;
`
