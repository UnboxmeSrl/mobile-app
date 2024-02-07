import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookings } from '../../../services'

const useYourSchedule = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [selectedTab, setSelectedTab] = useState(1)
  const bookings = useSelector((state) => state.restaurantSlice.bookings)
  const dispatch = useDispatch()

  const handleCardPress = (item, approvalStatus) => {
    // navigate(SCREEN_NAMES.YourScheduleDetailsScreen)
    if (approvalStatus === 'Pending') {
      if (item?.reel) {
        navigate({
          params: {
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.YourScheduleDetailsScreen,
        })
      } else {
        navigate({
          params: {
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.ContentScreen,
        })
      }
    } else if (approvalStatus === 'Accepted') {
      navigate({
        params: {
          bookingDetails: item,
        },
        routeName: SCREEN_NAMES.YourScheduleDetailsScreen,
      })
    }
  }

  const getBookingsData = async () => {
    const params = `/${loginData?.id}`
    const res = await getBookings(params)
    dispatch(setBookings(res))
  }

  useEffect(() => {
    if (loginData?.id) {
      getBookingsData()
    }
  }, [])

  return { bookings, handleCardPress, selectedTab, setSelectedTab }
}

export default useYourSchedule
