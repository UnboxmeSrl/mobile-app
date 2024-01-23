import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectAwardPrizeCategory } from '@redux/modules/app'

import { selectCategoryById } from '../../../redux/modules/categories'
import { getCategories, getRestaurants } from '../../../services/LocationsService'

const useRestaurants = () => {
  const categoriesIds = useSelector(selectCategoryById)
  const category = useSelector(selectAwardPrizeCategory)
  const cityData = useNavigationParam('cityData')
  const [restaurantsData, setRestaurantsData] = useState()
  const [filter, setFilter] = useState(1)
  const [categories, setCategories] = useState([])

  const getRestaurantsData = async () => {
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
    }
    const res = await getRestaurants(prepData)
    console.log('res', res)
    setRestaurantsData(res)
  }

  const getCategoriesData = async () => {
    const res = await getCategories()
    setCategories(res)
  }

  const onCategoryChange = (CategoryId) => {
    console.log('Category change', CategoryId)
    setFilter(CategoryId)
  }

  useEffect(() => {
    getRestaurantsData()
  }, [filter])

  useEffect(() => {
    getCategoriesData()
  }, [])

  return {
    categories,
    categoriesIds,
    category,
    cityData,
    filter,
    onCategoryChange,
    restaurantsData,
    setFilter,
  }
}

export default useRestaurants
