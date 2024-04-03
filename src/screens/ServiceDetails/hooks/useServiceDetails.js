import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useIsFocused } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { selectCategoryById } from '../../../redux/modules/categories'
import { setTimeFrameData } from '../../../redux/slices'
import { getDiaryActions, getTimeFrames } from '../../../services'
import { getServiceCategories, getServiceDealsLeft, getServices } from '../../../services/LocationsService'

const useServiceDetails = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const categoriesIds = useSelector(selectCategoryById)
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const restaurantDetails = useSelector((state) => state.restaurantSlice.restaurantDetails)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [services, setServices] = useState()
  const [serviceCategories, setServiceCategories] = useState([])
  const [diaryItems, setDiaryItems] = useState([])
  const [filter, setFilter] = useState(0)
  const [dealsLeft, setDealsLeft] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isBookBtnPressed, setIsBookBtnPressed] = useState(false)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const getServicesData = async () => {
    const prepData = {
      category_id: filter,
      restaurant_id: serviceDetails?.id,
    }
    const res = await getServices(prepData)
    setServices(res)
  }

  const getServiceDealsLeftData = async () => {
    const prepData = {
      offers_turbo_id: serviceDetails?.id,
      restaurant_turbo_id: restaurantDetails?.id,
    }
    const res = await getServiceDealsLeft(prepData)
    let deals
    if (res?.status === 200) {
      deals = `${res?.deal_left} deal left`
    } else if (res?.status === 201) {
      deals = `No deal limit`
    }
    setDealsLeft(deals)
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

  const getDiaryActionsData = async () => {
    const res = await getDiaryActions()
    setDiaryItems(res)
  }

  const getTimeFrameData = async () => {
    const params = `/${restaurantDetails?.id}`
    const res = await getTimeFrames(params)
    dispatch(setTimeFrameData(res))
  }

  const onCategoryChange = (serviceCategoryId) => {
    console.log('Category change', serviceCategoryId)
    setFilter(serviceCategoryId)
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.RestaurantDetails)
  }

  const handleBookPress = () => {
    setIsBookBtnPressed(true)
    if (loginData?.id) {
      if (loginData?.UserStatus === 'approved') {
        setIsBookBtnPressed(false)
        navigate(SCREEN_NAMES.BookingDetails)
      } else {
        Toast.show({
          text1: 'Your Account is not yet approved',
          type: 'error',
        })
      }
    } else {
      setIsBookBtnPressed(false)
      navigate({
        params: {
          isFromBookRedirected: true,
        },
        routeName: SCREEN_NAMES.SignIn,
      })
    }
  }

  useEffect(() => {
    getServiceCategoriesData()
    getDiaryActionsData()
    getTimeFrameData()
  }, [])

  useEffect(() => {
    getServiceDealsLeftData()
  }, [isFocused])

  useEffect(() => {
    getServicesData()
  }, [filter])

  return {
    categoriesIds,
    dealsLeft,
    diaryItems,
    filter,
    handleBackPress,
    handleBookPress,
    isBookBtnPressed,
    isImageLoading,
    isLoading,
    onCategoryChange,
    serviceCategories,
    serviceDetails,
    services,
    setIsImageLoading,
  }
}

export default useServiceDetails
