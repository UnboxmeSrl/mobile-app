import React from 'react'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { ProductTile } from '@components/ProductTile'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'

export const ProductSelectionPresenter = ({ products = [], selected, setSelected, onConfirm }) => (
  <RouteContainer tKey={'productSelection.title'} withArrow withPadding>
    <Wrapper showsVerticalScrollIndicator={false}>
      <Text tKey={'productSelection.asGift'} />
      {products.map((product) => (
        <ProductTile
          key={product}
          onPress={() => setSelected(product)}
          product={product}
          selected={selected === product}
        />
      ))}
    </Wrapper>
    <StyledButton disabled={!selected} onPress={onConfirm} tKey={'Confirm'} />
  </RouteContainer>
)

const Text = styled(BodyText)`
  margin: 20px 0px;
`
const StyledButton = styled(Button)`
  bottom: 0;
  left: 20px;
  position: absolute;
`
const Wrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 60,
  },
})``
