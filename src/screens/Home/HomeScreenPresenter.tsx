import React, { useCallback } from 'react'
import { Container } from '@components/Container'
import { RegularText } from '@components/Text'
import { Button } from '@components/Button'
import styled from 'styled-components/native'

const Info = styled.View`
  margin-bottom: 32px;
  justify-content: center;
  align-items: center;
`
const Image = styled.Image`
  height: 120px
  width: 120px
  border-radius: 60px
`

export const HomeScreenPresenter: React.FC = ({
  onPress,
  email,
  photo,
  displayName,
}) => (
  <Container>
    <Info>
      {photo ? <Image source={{ uri: photo }} /> : null}
      <RegularText reverted>{email}</RegularText>
      <RegularText reverted>{displayName}</RegularText>
    </Info>
    <Button onPress={onPress}>
      <RegularText>Log out</RegularText>
    </Button>
  </Container>
)
