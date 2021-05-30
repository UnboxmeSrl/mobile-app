import React from 'react'
import { AWARDS } from '@screens/Prizes/PrizesScreenPresenter'
import styled from 'styled-components/native/dist/styled-components.native.esm'

import { AwardTile } from '@components/AwardTile'
import { AwardTileFull } from '@components/AwardTileFull'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { ModalContainer } from '@components/ModalContainer'

export const SpecialAwardsPresenter = ({}) => (
  <ModalContainer tKey={'awards.specialAwards'}>
    <Categories />
    <List
      Component={AwardTileFull}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      data={AWARDS}
      horizontal={false}
    />
  </ModalContainer>
)
