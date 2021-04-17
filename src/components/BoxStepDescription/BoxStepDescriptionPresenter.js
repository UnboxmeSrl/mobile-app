import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { BodyText, H3, Subtitle } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'

export const BoxStepDescriptionPresenter = ({ onPress, box }) => {
  return (
    <Step>
      <ImageWrapper>
        <Image resizeMode={'contain'} source={{ url: box.imageUrl }} />
      </ImageWrapper>
      <Bottom>
        <Title translations={box.name} />
        <Body translations={box.description} />
        <Selected tKey={'productsSelected'} tOptions={{ count: box.productsCount }} />
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
