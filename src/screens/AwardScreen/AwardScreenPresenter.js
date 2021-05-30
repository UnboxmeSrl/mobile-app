import React from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AWARDS } from '@screens/Prizes/PrizesScreenPresenter'
import styled from 'styled-components/native'

import { AwardTile } from '@components/AwardTile'
import { BoxStepRequiredMedia } from '@components/BoxStepRequiredMedia'
import {
  BoxStepRequiredMediaPresenter,
  RequiredActions,
} from '@components/BoxStepRequiredMedia/BoxStepRequiredMediaPresenter'
import { Button } from '@components/Button'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { Points } from '@components/Points'
import { RouteContainer } from '@components/RouteContainer'
import { SectionHeader } from '@components/SectionHeader'
import { BodyText, ButtonText, Subtitle } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

const Image = styled(FastImage)`
  border-radius: 16px;
  height: 224px;
  margin-right: 12px;
  width: ${screenWidth / 1.5}px;
`
const Content = styled.ScrollView`
  padding: 0 20px;
`
const Section = styled.View`
  margin: 8px 0;
`
const CheckSlotsButton = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`

const ImageItem = ({ image }) => <Image source={{ uri: image }} />

export const AwardScreenPresenter = ({ navigateToSlots, label = 'Special award name 1' }) => (
  <RouteContainer RightButton={() => <Points points={100} />} tKey={label} withArrow>
    <List
      Component={ImageItem}
      contentContainerStyle={{ flex: 0, marginTop: 20, paddingLeft: 20 }}
      data={AWARDS}
      horizontal
    />
    <Content>
      <Section>
        <Subtitle>Description</Subtitle>
        <BodyText>
          Spend unforgettable moments at the QC terme. You get a free entrance with access to: SPA, SAUNA, SKIN
          TREATMENT and LOUNG AREA To use it any day you want in the opening hours
        </BodyText>
      </Section>
      <Section>
        <CheckSlotsButton onPress={navigateToSlots}>
          <BodyText tKey={'awards.checkSlots'} />
          <Ionicons color={COLORS.achromaticBlack} name={'chevron-forward-outline'} size={20} />
        </CheckSlotsButton>
      </Section>
      <Section>
        <Subtitle>What you will need to do</Subtitle>
        <RequiredActions />
      </Section>
      <Button tKey={'book'} />
    </Content>
  </RouteContainer>
)
