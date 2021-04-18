import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { prop } from 'ramda'
import styled from 'styled-components/native'

import { BoxInReview } from '@components/BoxInReview'
import { Button } from '@components/Button'
import { BodyText, Caption, H3, Subtitle } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

export const BoxStepDescriptionPresenter = ({
  onPress,
  box,
  order,
  navigateToBrands,
  navigateToHowItWorks,
  navigateToRequiredMedia,
  inReview,
  tKey,
}) => {
  return (
    <Step>
      <ImageWrapper>
        <Image resizeMode={'contain'} source={{ url: box.imageUrl }} />
      </ImageWrapper>
      <Bottom>
        <Title translations={box.name} />
        <Body translations={box.description} />
        <Selected tKey={'productsSelected'} tOptions={{ count: box.productsCount }} />
        {order ? (
          <Wrapper>
            <Pressable onPress={navigateToBrands}>
              <BodyText tKey={'box.brandsAndCategories'} />
              <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={30} />
            </Pressable>
            <Pressable onPress={navigateToHowItWorks}>
              <BodyText tKey={'box.howItWorks'} />
              <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={30} />
            </Pressable>
            <Pressable onPress={navigateToRequiredMedia}>
              <BodyText tKey={'box.requiredMedia'} />
              <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={30} />
            </Pressable>
          </Wrapper>
        ) : null}
        {inReview ? <BoxInReview /> : <Button onPress={onPress} tKey={tKey} />}
      </Bottom>
    </Step>
  )
}

const Wrapper = styled.View`
  margin-bottom: 20px;
`
const Pressable = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 40px;
  justify-content: space-between;
  margin-bottom: 4px;
`
const Selected = styled(Subtitle)`
  color: ${COLORS.primaryDark};
  margin-bottom: 20px;
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
const InReview = styled.View`
  background-color: ${COLORS.tertiary};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  bottom: -${prop('bottomInset')}px;
  left: -20px;
  padding: 20px 40px 60px 40px;
  width: ${screenWidth}px;
`
const ReviewText = styled(Caption)`
  color: ${COLORS.primaryDark};
  text-align: center;
`
