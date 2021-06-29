import React, { useCallback } from 'react'
import { prop } from 'ramda'
import styled from 'styled-components/native'

const defaultOptionKeyExtractor = ({ value, id }) => value || id

export const List = ({ data, horizontal = true, keyExtractor = defaultOptionKeyExtractor, Component, ...rest }) => {
  const renderItem = useCallback(
    ({ item }) => {
      const props = {
        item: item,
        ...item,
      }
      return <Component {...props} />
    },
    [Component]
  )
  const props = {
    data,
    horizontal,
    keyExtractor,
    renderItem,
    ...rest,
  }
  return <ListPresenter {...props} />
}

const ListPresenter = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
})``
