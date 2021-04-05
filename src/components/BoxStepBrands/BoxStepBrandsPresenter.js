import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { List } from '@components/List'
import { H3 } from '@components/Text'
import { TileBrand } from '@components/TileBrand'
import { TileCategory } from '@components/TileCategory'
import { TileExtraProduct } from '@components/TileExtraProduct'
import { StepContent } from '@components/WizardStep'
import { BRANDS_OPTIONS } from '@const/brands'
import { EXTRA_PRODUCTS, PRODUCT_CATEGORIES } from '@const/categories'

export const BoxStepBrandsPresenter = ({ onPress }) => {
  return (
    <Step>
      <Sections>
        <Section>
          <Title tKey={'brands'} />
          <List Component={TileBrand} data={BRANDS_OPTIONS} vertical />
        </Section>
        <Section>
          <Title tKey={'productCategories'} />
          <List Component={TileCategory} data={PRODUCT_CATEGORIES} vertical />
        </Section>
        <Section>
          <Title tKey={'extraProduct'} />
          <List Component={TileExtraProduct} data={EXTRA_PRODUCTS} vertical />
        </Section>
      </Sections>
      <Bottom>
        <Button onPress={onPress} tKey={'next'} />
      </Bottom>
    </Step>
  )
}

const Sections = styled.ScrollView``
const Section = styled.View`
  margin-bottom: 40px;
`
const Bottom = styled.View`
  margin-bottom: 16px;
`
const Step = styled(StepContent)``
const Title = styled(H3)`
  margin-bottom: 16px;
`
