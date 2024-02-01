import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { getServiceCategories, getServices } from '../../../services/LocationsService'

const useServiceDetails = () => {
  const categoriesIds = useSelector(selectCategoryById)
  const restaurantDetails = useNavigationParam('restaurantDetails')
  const [services, setServices] = useState()
  const [serviceCategories, setServiceCategories] = useState([])
  const [filter, setFilter] = useState(0)

  const getServicesData = async () => {
    const prepData = {
      category_id: filter,
      restaurant_id: restaurantDetails?.id,
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

  const onCategoryChange = (serviceCategoryId) => {
    console.log('Category change', serviceCategoryId)
    setFilter(serviceCategoryId)
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Restaurants)
  }

  const handleBookPress = () => {
    navigate(SCREEN_NAMES.BookingDetails)
  }

  useEffect(() => {
    getServiceCategoriesData()
  }, [])

  useEffect(() => {
    getServicesData()
  }, [filter])

  return {
    categoriesIds,
    filter,
    handleBackPress,
    handleBookPress,
    onCategoryChange,
    restaurantDetails,
    serviceCategories,
    services,
  }
}

export default useServiceDetails
