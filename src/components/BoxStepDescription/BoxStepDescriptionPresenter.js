import React from 'react'
import FastImage from 'react-native-fast-image'
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
        <Image resizeMode={'contain'} source={{ uri: box.imageUrl }} />
      </ImageWrapper>
      <Bottom>
        <Row>
          <Title translations={box.name} />
          <Body translations={box.description} />
          <Selected tKey={'productsSelected'} tOptions={{ count: box.productsCount }} />
          {order ? (
            <>
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
            </>
          ) : null}
        </Row>
        <ButtonRow>{inReview ? <BoxInReview /> : <StyledButton onPress={onPress} tKey={tKey} />}</ButtonRow>
      </Bottom>
    </Step>
  )
}
const StyledButton = styled(Button)``
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
  flex: 0.75;
  justify-content: space-between;
`
const Step = styled(StepContent)``
const ImageWrapper = styled.View`
  flex: 0.25;
  width: 90%;
`
const Image = styled(FastImage)`
  flex: 1;
  width: 100%;
`
const Row = styled.View``
const ButtonRow = styled(Row)`
  height: 130px;
  justify-content: flex-end;
`
