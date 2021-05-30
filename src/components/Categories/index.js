import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'

import { CategoryPresenter } from '@components/Categories/CategoryPresenter'
import { List } from '@components/List'

export const Categories = () => {
  const [selected, setSelected] = useState('all')
  const categories = [
    { label: 'All categories', value: 'all' },
    { label: 'Cosmetic boxes', value: 'cosmeticBoxes' },
    { label: 'SPA', value: 'spa' },
    { label: 'Vacation', value: 'vacation' },
    { label: 'Adventure', value: 'adventure' },
  ]
  const onPress = useCallback((id) => setSelected(id), [setSelected])
  const Component = useCallback(
    (props) => (
      <CategoryPresenter onPress={() => onPress(props.value)} selected={selected === props.value} {...props} />
    ),
    [selected, onPress]
  )
  return (
    <Wrapper>
      <List Component={Component} contentContainerStyle={{ paddingLeft: 20 }} data={categories} />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  margin: 20px 0;
`
