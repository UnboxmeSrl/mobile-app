import React, { useCallback } from 'react'
import { prop } from 'ramda'
import styled from 'styled-components/native'

const defaultOptionKeyExtractor = prop('value')

export const List = ({ data, horizontal, keyExtractor = defaultOptionKeyExtractor, Component }) => {
  const renderItem = useCallback(({ item }) => <Component {...item} />, [Component])

  const props = {
    data,
    horizontal: true,
    keyExtractor,
    renderItem,
  }
  return <ListPresenter {...props} />
}

const ListPresenter = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
})``
