import React from 'react'
import styled from 'styled-components/native/dist/styled-components.native.esm'

import { AwardTile } from '@components/AwardTile'
import { BookingTile } from '@components/BookingTile'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { Points } from '@components/Points'
import { RouteContainer } from '@components/RouteContainer'
import { SectionHeader } from '@components/SectionHeader'

export const AWARDS = [
  {
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    label: 'QC Terme 1',
    points: '240',
    value: 1,
  },
  {
    image:
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    label: 'QC Terme 2',
    points: '360',
    value: 2,
  },
  {
    image:
      'https://images.unsplash.com/photo-1570174006382-148305ce4972?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    label: 'Spa',
    points: '100',
    value: 3,
  },
]

export const PrizesScreenPresenter = ({ bookings, navigateToSpecialAwards, awards }) => (
  <RouteContainer>
    <Header>
      <Points />
    </Header>
    <Categories />
    <SectionHeader onPress={navigateToSpecialAwards} tKey={'awards.specialAwards'} />
    <List
      Component={AwardTile}
      contentContainerStyle={{ marginBottom: 20, marginTop: 8, paddingLeft: 20 }}
      data={awards}
      horizontal
    />
    <SectionHeader tKey={'awards.yourBookings'} />
    <List
      Component={BookingTile}
      contentContainerStyle={{ marginBottom: 20, marginTop: 8, paddingLeft: 20 }}
      data={bookings}
      horizontal
    />
  </RouteContainer>
)

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 20px;
`
