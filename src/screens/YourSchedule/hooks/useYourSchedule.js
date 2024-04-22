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
  const [isLoading, setIsLoading] = useState(false)
  const bookings = useSelector((state) => state.restaurantSlice.bookings)
  const contentList = useSelector((state) => state.contentSlice.contentList)
  const isFromBookingDetails = useNavigationParam('isFromBookingDetails')
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()

  const onBookingRefresh = () => {
    setRefreshing(true)
    if (loginData?.id) {
      getBookingsData()
    }
    setRefreshing(false)
  }

  const onContentRefresh = () => {
    setRefreshing(true)
    if (loginData?.id) {
      getBookingForContentListData()
    }
    setRefreshing(false)
  }

  const handleCardPress = (item, approvalStatus, actionName, actionNumId) => {
    console.log(item, approvalStatus, actionName, actionNumId)
    if (approvalStatus === 'Pending') {
      if ((actionNumId === 6 || actionNumId === 3) && !item?._diary_action_turbo?.id) {
        navigate({
          params: {
            actionName: actionName,
            actionNumId: actionNumId,
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
      }
    } else if (approvalStatus === 'Accepted') {
      if ((actionNumId === 6 || actionNumId === 3) && !item?._diary_action_turbo?.id) {
        navigate({
          params: {
            actionName: actionName,
            actionNumId: actionNumId,
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.ContentScreen,
        })
      } else {
        navigate({
          params: {
            bookingDetails: item,
          },
          routeName: SCREEN_NAMES.YourScheduleDetailsScreen,
        })
      }
    }
  }

  const getBookingsData = async () => {
    setIsLoading(true)
    const params = `/${loginData?.id}`
    const res = await getBookings(params)
    dispatch(setBookings(res))
    setIsLoading(false)
  }

  const getBookingForContentListData = async () => {
    setIsLoading(true)
    const params = `/${loginData?.id}`
    const res = await getBookingForContentList(params)
    dispatch(setContentList(res))
    setIsLoading(false)
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
    if (isContentStatusModalVisible === false && updatedContentDetails?.id) {
      handleContentModalOpenClose()
    }
  }, [updatedContentDetails])

  useEffect(() => {
    if (loginData?.id && !isFromBookingDetails) {
      getBookingsData()
      getBookingForContentListData()
    }
  }, [selectedTab])

  return {
    bookings,
    contentList,
    updatedContentDetails,
    isLoading,
    isContentStatusModalVisible,
    refreshing,
    onBookingRefresh,
    onContentRefresh,
    handleContentModalOpenClose,
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
    selectedTab,
    setSelectedTab,
  }
}

export default useYourSchedule
