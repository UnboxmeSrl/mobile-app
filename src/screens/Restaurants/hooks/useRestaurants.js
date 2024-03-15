import { selectAwardPrizeCategory } from '@redux/modules/app'
import { navigate } from '@services'
import { useEffect, useState } from 'react'
import { useIsFocused, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
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
  const isFocused = useIsFocused()

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
    setRestaurantsData(res)
    setIsLoading(false)
  }

  const getCategoriesData = async () => {
    setIsLoading(true)
    const res = await getCategories()
    console.log('res cat', res)
    const addAllCategory = [{ CategoryName: 'All categories', id: 0 }, ...res?.data]
    setCategories(addAllCategory)
    setIsLoading(false)
  }

  const handleLocationPress = () => {
    navigate(SCREEN_NAMES.Cities)
  }

  const onCategoryChange = (CategoryId) => {
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
