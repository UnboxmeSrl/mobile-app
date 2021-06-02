import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { CategoryPresenter } from '@components/Categories/CategoryPresenter'
import { List } from '@components/List'
import { useAction } from '@hooks/common'
import { _awardCategory, selectAwardCategory, setAppData } from '@redux/modules/app'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { selectAwardCategories, selectAwardsByCategory } from '@redux/modules/awardCategories'
import { selectOrderByBoxId } from '@redux/modules/orders'

export const Categories = () => {
  const setCategory = useAction(setAppData)
  const categoriesFromApi = useSelector(selectAwardCategories)
  const category = useSelector(selectAwardCategory)
  const categories = [{ name: { en: 'All categories' }, value: 'all' }, ...categoriesFromApi]

  const onPress = useCallback((id) => setCategory({ [_awardCategory]: id }), [setCategory])
  const Component = useCallback(
    (props) => (
      <CategoryPresenter onPress={() => onPress(props.value)} selected={category === props.value} {...props} />
    ),
    [category, onPress]
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
