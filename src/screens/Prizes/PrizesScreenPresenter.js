import React from 'react'
import styled from 'styled-components/native/dist/styled-components.native.esm'

import { AwardTile } from '@components/AwardTile'
import { BookingTile } from '@components/BookingTile'
import { Categories } from '@components/Categories'
import { List } from '@components/List'
import { Points } from '@components/Points'
import { RouteContainer } from '@components/RouteContainer'
import { SectionHeader } from '@components/SectionHeader'

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
    {bookings.length ? <SectionHeader tKey={'awards.yourBookings'} /> : null}
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
