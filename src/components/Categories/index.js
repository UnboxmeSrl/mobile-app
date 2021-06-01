import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { CategoryPresenter } from '@components/Categories/CategoryPresenter'
import { List } from '@components/List'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { selectAwardCategories } from '@redux/modules/awardCategories'

export const Categories = () => {
  const [selected, setSelected] = useState('all')
  const categoriesFromApi = useSelector(selectAwardCategories)
  const categories = [{ name: { en: 'All categories' }, value: 'all' }, ...categoriesFromApi]
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
