import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { CategoryPresenter } from '@components/Categories/CategoryPresenter'
import { List } from '@components/List'
import { _awardCategory, selectAwarselectAwardCategorydCategory } from '@redux/modules/app'
import { selectCategoriesByIds } from '@redux/modules/awardCategories'

export const Categories = ({ categoriesIds, onPress, category }) => {
  const categoriesFromApi = useSelector(selectCategoriesByIds(categoriesIds))
  const categories = [{ name: { en: 'All categories' }, value: 'all' }, ...categoriesFromApi]

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
