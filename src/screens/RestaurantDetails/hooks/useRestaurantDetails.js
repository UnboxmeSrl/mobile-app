import { navigate } from '@services'
import { useEffect, useState } from 'react'
import { useIsFocused, useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { getServiceCategories, getServices } from '../../../services/LocationsService'
import { Linking } from 'react-native'

const useRestaurantDetails = () => {
  const categoriesIds = useSelector(selectCategoryById)
  const restaurantDetails = useSelector((state) => state.restaurantSlice.restaurantDetails)
  const [services, setServices] = useState([])
  const cityData = useNavigationParam('cityData')
  const [isLoading, setIsLoading] = useState(false)
  const [serviceCategories, setServiceCategories] = useState([])
  const [filter, setFilter] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const getServicesData = async () => {
    setIsLoading(true)
    const prepData = {
      category_id: filter,
      restaurant_id: restaurantDetails?.id,
    }
    const res = await getServices(prepData)
    console.log('res', res)
    setServices(res)
    setIsLoading(false)
  }

  const getServiceCategoriesData = async () => {
    const res = await getServiceCategories()
    const filteredCatNames = res?.map((cat) => {
      const tmp = {
        ...cat,
        CategoryName: cat?.Category_type,
      }
      return tmp
    })
    const addAllCategory = [{ CategoryName: 'All categories', id: 0 }, ...filteredCatNames]
    setServiceCategories(addAllCategory)
  }

  const onCategoryChange = (serviceCategoryId) => {
    console.log('Category change', serviceCategoryId)
    setFilter(serviceCategoryId)
  }

  const handleBackPress = () => {
    if (cityData?.id) {
      navigate({
        params: {
          cityData: cityData,
        },
        routeName: SCREEN_NAMES.Restaurants,
      })
    } else {
      navigate(SCREEN_NAMES.Restaurants)
    }
  }

  const handleRedirection = (targetUrl) => {
    if (targetUrl) {
      Linking.openURL(targetUrl)
    }
  }

  useEffect(() => {
    getServiceCategoriesData()
  }, [])

  useEffect(() => {
    console.log('Length', services?.length)
    if (isFocused) {
      console.log('testiiiii')
      getServicesData()
    }
  }, [isFocused, filter])

  return {
    isLoading,
    categoriesIds,
    filter,
    isImageLoading,
    setIsImageLoading,
    handleBackPress,
    onCategoryChange,
    restaurantDetails,
    serviceCategories,
    services,
    handleRedirection,
  }
}

export default useRestaurantDetails
