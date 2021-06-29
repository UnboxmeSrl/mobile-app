import React from 'react'

import { AwardTileFull } from '@components/AwardTileFull'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { ModalContainer } from '@components/ModalContainer'

export const SpecialAwardsPresenter = ({ awards, categoriesIds, category, onPress, title }) => (
  <ModalContainer tKey={title || 'awards.specialAwards'}>
    <Categories categoriesIds={categoriesIds} category={category} onPress={onPress} />
    <List
      Component={AwardTileFull}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      data={awards}
      horizontal={false}
    />
  </ModalContainer>
)
