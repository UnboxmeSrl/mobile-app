import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { setCanceledBookings } from '../../../redux/slices/restaurantSlice'
import { getAllCanceledBookings, navigate } from '../../../services'

const useArchive = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const canceledBookings = useSelector((state) => state.restaurantSlice.canceledBookings)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    getAllCanceledBookingsData()
    setRefreshing(false)
  }

  const getAllCanceledBookingsData = async () => {
    setIsLoading(true)
    const params = `/${loginData?.id}`
    const res = await getAllCanceledBookings(params)
    if (res?.length > 0) {
      dispatch(setCanceledBookings(res))
    }
    setIsLoading(false)
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  useEffect(() => {
    if (loginData?.id) {
      getAllCanceledBookingsData()
    }
  }, [])

  return {
    isLoading,
    refreshing,
    onRefresh,
    canceledBookings,
    handleBackPress,
  }
}

export default useArchive
