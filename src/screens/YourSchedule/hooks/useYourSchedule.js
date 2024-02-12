import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookings } from '../../../services'
import { useNavigationParam } from 'react-navigation-hooks'

const useYourSchedule = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const selectedTabFromRoute = useNavigationParam('selectedTab')
  const [selectedTab, setSelectedTab] = useState(selectedTabFromRoute ?? 1)
  const bookings = useSelector((state) => state.restaurantSlice.bookings)
  const [contentApprovalStatus, setContentApprovalStatus] = useState('Missed Deadline')

  const dispatch = useDispatch()

  const handleCardPress = (item, approvalStatus, actionName) => {
    if (approvalStatus === 'Pending') {
      if (actionName === 'Diary Instagram' && item?.reel === '') {
        navigate({
          params: {
            actionName: actionName,
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.ContentScreen,
        })
      } else if (actionName) {
        navigate({
          params: {
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.YourScheduleDetailsScreen,
        })
      } else {
        navigate({
          params: {
            actionName: actionName,
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

  const handleArchivePress = () => {
    navigate(SCREEN_NAMES.ArchiveScreen)
  }

  const handleContentCardPress = () => {
    navigate(SCREEN_NAMES.PublishContentScreen)
  }

  useEffect(() => {
    if (loginData?.id) {
      getBookingsData()
    }
  }, [])

  return {
    contentApprovalStatus,
    bookings,
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
    selectedTab,
    setSelectedTab,
  }
}

export default useYourSchedule
