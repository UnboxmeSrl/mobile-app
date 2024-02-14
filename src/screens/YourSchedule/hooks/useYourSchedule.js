import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookingForContentList, getBookings } from '../../../services'
import { useNavigationParam } from 'react-navigation-hooks'
import { setContentList } from '../../../redux/slices'

const useYourSchedule = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const selectedTabFromRoute = useNavigationParam('selectedTab')
  const [selectedTab, setSelectedTab] = useState(selectedTabFromRoute ?? 1)
  const [updatedContentDetails, setUpdatedContentDetails] = useState()
  const bookings = useSelector((state) => state.restaurantSlice.bookings)
  const contentList = useSelector((state) => state.contentSlice.contentList)
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] = useState(false)

  const dispatch = useDispatch()

  const handleCardPress = (item, approvalStatus, actionName) => {
    if (approvalStatus === 'Pending') {
      if (actionName === 'Diary Instagram' && item?.diary_action_turbo_id === 0) {
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

  const getBookingForContentListData = async () => {
    const params = `/${loginData?.id}`
    const res = await getBookingForContentList(params)
    dispatch(setContentList(res))
  }

  const handleArchivePress = () => {
    navigate(SCREEN_NAMES.ArchiveScreen)
  }

  const handleContentModalOpenClose = () => {
    setIsContentStatusModalVisible(!isContentStatusModalVisible)
  }

  const handleContentCardPress = (item) => {
    if (item?.content_status_turbo_id > 0) {
      setUpdatedContentDetails(item)
      handleContentModalOpenClose()
    } else {
      navigate({
        params: {
          contentDetails: item,
        },
        routeName: SCREEN_NAMES.PublishContentScreen,
      })
    }
  }

  useEffect(() => {
    console.log('object created', isContentStatusModalVisible, updatedContentDetails)
    if (isContentStatusModalVisible === false && updatedContentDetails?.id) {
      handleContentModalOpenClose()
    }
  }, [updatedContentDetails])

  useEffect(() => {
    if (loginData?.id) {
      getBookingsData()
      getBookingForContentListData()
    }
  }, [])

  return {
    bookings,
    contentList,
    updatedContentDetails,
    isContentStatusModalVisible,
    handleContentModalOpenClose,
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
    selectedTab,
    setSelectedTab,
  }
}

export default useYourSchedule
