import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { CategoryPresenter } from '@components/Categories/CategoryPresenter'
import { List } from '@components/List'
import { selectCategoriesByIds } from '@redux/modules/awardCategories'

export const Categories = ({ categoriesIds, onPress, category, customCategories }) => {
  const categoriesFromApi = useSelector(selectCategoriesByIds(categoriesIds))
  // const categories = customCategories ?? [...categoriesFromApi]
  const categories = customCategories ?? [...categoriesFromApi]

  const Component = useCallback(
    (props) => {
      console.log(props)
      return (
        <CategoryPresenter
          onPress={() => onPress(props.id ?? props.value)}
          selected={category === props.id ?? props.value}
          {...props}
        />
      )
    },
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
