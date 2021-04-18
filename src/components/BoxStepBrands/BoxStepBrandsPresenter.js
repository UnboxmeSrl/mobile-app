import React from 'react'
import styled from 'styled-components/native'

import { BoxInReview } from '@components/BoxInReview'
import { Button } from '@components/Button'
import { List } from '@components/List'
import { H3 } from '@components/Text'
import { TileBrand } from '@components/TileBrand'
import { TileCategory } from '@components/TileCategory'
import { TileExtraProduct } from '@components/TileExtraProduct'
import { StepContent } from '@components/WizardStep'

export const BoxStepBrandsPresenter = ({ onPress, brandsData, products, categoriesData, inReview, order }) => {
  return (
    <Step>
      <Sections showsVerticalScrollIndicator={false}>
        <Section>
          <Title tKey={'brands'} />
          <List Component={TileBrand} data={brandsData} vertical />
        </Section>
        <Section>
          <Title tKey={'productCategories'} />
          <List Component={TileCategory} data={categoriesData} vertical />
        </Section>
        <Section>
          <Title tKey={'extraProduct'} />
          <List Component={TileExtraProduct} data={products} vertical />
        </Section>
      </Sections>
      <Bottom>{inReview ? <BoxInReview /> : order ? null : <Button onPress={onPress} tKey={'next'} />}</Bottom>
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
