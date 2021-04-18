import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { LabelValue } from '@components/LabelValue'
import { Subtitle, TinyText } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'

export const ProductTilePresenter = ({ box, key, imageUrl, name, brand, category, selected, onPress }) => {
  return (
    <Wrapper onPress={onPress}>
      <Row>
        <ColumnLeft>
          <Image source={{ url: imageUrl }} />
        </ColumnLeft>
        <ColumnRight>
          <Title translations={name} />
          <LabelValue labelTKey={'Brand'} translations={brand.name} />
          <LabelValue labelTKey={'productFor'} translations={category.name} />
          <LabelValue labelTKey={'availableProducts'} value={20} />
        </ColumnRight>
      </Row>
      <Bottom selected={selected}>
        {selected ? <Ionicons color={COLORS.white} name={'checkbox-outline'} size={18} /> : null}
        <Choose selected={selected} tKey={selected ? 'selected' : 'chooseThisProduct'} />
        {/* <TextButtonStyled color={COLORS.achromaticBlack} tKey={'seeDetails'} /> */}
      </Bottom>
    </Wrapper>
  )
}
const Choose = styled(TinyText)`
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.primaryDark)};
  margin-left: 8px;
  margin-right: 4px;
`

const Row = styled.View`
  flex-direction: row;
  padding: 12px 24px;
`
const Wrapper = styled.TouchableOpacity`
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  margin-bottom: 40px;
  width: 100%;
`
const Bottom = styled.View`
  align-items: center;
  background-color: ${({ selected }) => (selected ? COLORS.primary : COLORS.veryLight)};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  flex-direction: row;
  height: 48px;
  padding: 0 24px;
`
const Title = styled(Subtitle)`
  line-height: 24px;
  margin-bottom: 24px;
  padding-right: 20px;
`

const ColumnLeft = styled.View`
  flex: 0.3;
`
const ColumnRight = styled.View`
  flex: 0.7;
  justify-content: center;
  padding: 16px 0px 0px 16px;
`
const Image = styled.Image`
  flex: 1;
`

const TextButtonStyled = styled(TextButton).attrs({
  textStyle: {
    fontSize: 12,
  },
})``
