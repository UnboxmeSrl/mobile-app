import React from 'react'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { BoxInReview } from '@components/BoxInReview'
import { Button } from '@components/Button'
import { Caption, H3 } from '@components/Text'
import { StepContent } from '@components/WizardStep'
import { COLORS } from '@const'

import { IMAGES } from '../../assets/images'

export const RequiredActions = () => (
  <Section>
    <Row>
      <Tile>
        <Image source={IMAGES.instagram} />
        <Caption>Instagram story</Caption>
      </Tile>
      <OrText />
      <Tile>
        <Image source={IMAGES.tiktok} />
        <Caption>Tik Tok video</Caption>
      </Tile>
    </Row>
  </Section>
)
export const BoxStepRequiredMediaPresenter = ({ onPress, order, inReview }) => {
  return (
    <Step>
      <Sections showsVerticalScrollIndicator={false}>
        <Section>
          <Title tKey={'requiredMedia'} />
          <Row>
            <Tile>
              <Image source={IMAGES.instagram} />
              <Caption>Instagram story</Caption>
            </Tile>
            <OrText>or</OrText>
            <Tile>
              <Image source={IMAGES.tiktok} />
              <Caption>Tik Tok video</Caption>
            </Tile>
          </Row>
        </Section>
        <Section>
          <Title tKey={'callToActions'} />
          <CallRow>
            <Action>
              <SmallTile>
                <Image source={IMAGES.swipeUp} style={{ height: 40, top: 6, width: 40 }} />
              </SmallTile>
              <Caption>Swipeup</Caption>
            </Action>
            <Action>
              <SmallTile>
                <Ionicons color={COLORS.black} name={'pricetag-outline'} size={40} />
              </SmallTile>
              <Caption>Tag</Caption>
            </Action>
          </CallRow>
        </Section>
      </Sections>
      <Bottom>
        {inReview ? <BoxInReview /> : order ? null : <Button onPress={onPress} tKey={'box.getThisBox'} />}
      </Bottom>
    </Step>
  )
}

const Sections = styled.ScrollView``
const Section = styled.View`
  margin-bottom: 40px;
`
const Bottom = styled.View``
const Step = styled(StepContent)``
const Title = styled(H3)`
  margin-bottom: 16px;
`
const Row = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
`
const CallRow = styled(Row)`
  justify-content: space-around;
`
const Tile = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 16px;
  flex: 1;
  height: 130px;
  justify-content: center;
  padding: 12px 20px;
`
const OrText = styled(Caption)`
  margin: 0 16px;
`
const Image = styled(FastImage)`
  height: 48px;
  margin-bottom: 12px;
  width: 48px;
`
const Action = styled.View`
  align-items: center;
`
const SmallTile = styled.View`
  align-items: center;
  background-color: ${COLORS.veryLight};
  border-radius: 10px;
  height: 60px;
  justify-content: center;
  width: 60px;
`
