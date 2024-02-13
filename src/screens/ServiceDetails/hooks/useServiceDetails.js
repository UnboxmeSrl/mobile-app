import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { getServiceCategories, getServices } from '../../../services/LocationsService'
import { getDiaryActions } from '../../../services'

const useServiceDetails = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const categoriesIds = useSelector(selectCategoryById)
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const restaurantDetails = useSelector((state) => state.restaurantSlice.restaurantDetails)

  const [services, setServices] = useState()
  const [serviceCategories, setServiceCategories] = useState([])
  const [diaryItems, setDiaryItems] = useState([])
  const [filter, setFilter] = useState(0)

  const getServicesData = async () => {
    const prepData = {
      category_id: filter,
      restaurant_id: serviceDetails?.id,
    }
    const res = await getServices(prepData)
    console.log('res', res)
    setServices(res)
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

  const getDiaryActionsData = async () => {
    const res = await getDiaryActions()
    setDiaryItems(res)
  }

  const onCategoryChange = (serviceCategoryId) => {
    console.log('Category change', serviceCategoryId)
    setFilter(serviceCategoryId)
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.RestaurantDetails)
  }

  const handleBookPress = () => {
    if (loginData?.id) {
      navigate(SCREEN_NAMES.BookingDetails)
    } else {
      navigate(SCREEN_NAMES.SignIn)
    }
  }

  useEffect(() => {
    getServiceCategoriesData()
    getDiaryActionsData()
  }, [])

  useEffect(() => {
    getServicesData()
  }, [filter])

  return {
    diaryItems,
    categoriesIds,
    filter,
    handleBackPress,
    handleBookPress,
    onCategoryChange,
    serviceCategories,
    serviceDetails,
    services,
  }
}

export default useServiceDetails
