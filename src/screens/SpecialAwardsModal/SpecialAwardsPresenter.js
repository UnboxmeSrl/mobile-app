import React from 'react'

import { AwardTileFull } from '@components/AwardTileFull'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { ModalContainer } from '@components/ModalContainer'

export const SpecialAwardsPresenter = ({ awards }) => (
  <ModalContainer tKey={'awards.specialAwards'}>
    <Categories />
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
