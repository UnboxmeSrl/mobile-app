import React, { useCallback, useContext, useMemo } from 'react'
import { Button, TextInput } from 'react-native'
import styled from 'styled-components/native'

import { BodyText } from '@components/Text'

const ListItem = (item) => <BodyText key={item}>{item}</BodyText>

export const FormTaskPresenter = ({ onChangeText, onSubmit, result, value }) => {
  return (
    <Wrapper>
      {result.map(ListItem)}
      <Row>
        <Input onChangeText={onChangeText} value={value} />
        <Button onPress={onSubmit} title={'Submit'} />
      </Row>
    </Wrapper>
  )
}
const Input = styled.TextInput`
  border: 1px;
  width: 150px;
`
const Wrapper = styled.View``
const Row = styled.View`
  flex-direction: row;
`
