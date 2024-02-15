import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { selectAwardPrizeCategory } from '@redux/modules/app'
import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { getCategories, getRestaurants } from '../../../services/LocationsService'

const useRestaurants = () => {
  const categoriesIds = useSelector(selectCategoryById)
  const category = useSelector(selectAwardPrizeCategory)
  const cityData = useNavigationParam('cityData')
  const [isLoading, setIsLoading] = useState(false)
  const [restaurantsData, setRestaurantsData] = useState()
  const [filter, setFilter] = useState(0)
  const [categories, setCategories] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    getCategoriesData()
    getRestaurantsData()
    setRefreshing(false)
  }

  const getRestaurantsData = async () => {
    setIsLoading(true)
    const prepData = {
      category_venue_id: filter,
      city_id: cityData?.id,
    }
    const res = await getRestaurants(prepData)
    console.log('res', res)
    setRestaurantsData(res)
    setIsLoading(false)
  }

  const getCategoriesData = async () => {
    setIsLoading(true)
    const res = await getCategories()
    const addAllCategory = [{ CategoryName: 'All categories', id: 0 }, ...res]
    setCategories(addAllCategory)
    setIsLoading(false)
  }

  const handleLocationPress = () => {
    navigate(SCREEN_NAMES.Cities)
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
    refreshing,
    onRefresh,
    handleLocationPress,
    isLoading,
    onCategoryChange,
    restaurantsData,
    setFilter,
  }
}

export default useRestaurants
