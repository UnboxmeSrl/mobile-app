import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { getAllCanceledBookings, navigate } from '../../../services'
import { useDispatch, useSelector } from 'react-redux'
import { setCanceledBookings } from '../../../redux/slices/restaurantSlice'

const useArchive = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const canceledBookings = useSelector((state) => state.restaurantSlice.canceledBookings)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

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
    getAllCanceledBookingsData()
  }, [])

  return {
    isLoading,
    canceledBookings,
    handleBackPress,
  }
}

export default useArchive
