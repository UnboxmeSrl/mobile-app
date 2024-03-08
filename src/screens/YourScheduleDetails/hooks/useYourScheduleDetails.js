import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { checkAction, checkActionName } from '../../../utils'
import { cancelBooking, getAllCanceledBookings, getBookings } from '../../../services'
import { Alert } from 'react-native'
import { setBookings, setCanceledBookings } from '../../../redux/slices/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'

const useYourScheduleDetails = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const approvalStageValue = bookingDetails?.Approved
    ? 'success'
    : bookingDetails?.Rejectedstatus
    ? 'reject'
    : 'pending'
  const [approvalStage, setApprovalStage] = useState(approvalStageValue)
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeFrame = bookingDetails?._timeframes_turbo

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0
  let icon = checkAction(actionNumId)?.action_icon
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action_for_others
    if (actionNumId === 3) {
      actionName = bookingDetails?._diary_action_turbo?.action
    }
    icon = checkActionName(actionName)
  }

  const dispatch = useDispatch()

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  const handleContentBriefPress = () => {
    navigate({
      params: {
        bookingDetails: bookingDetails,
      },
      routeName: SCREEN_NAMES.ContentBriefScreen,
    })
  }

  const handleOpenCouponPress = () => {
    navigate({
      params: {
        bookingDetails: bookingDetails,
      },
      routeName: SCREEN_NAMES.NewCouponScreen,
    })
  }

  const handleAlertVisible = () => {
    setIsAlertVisible(!isAlertVisible)
  }

  const handlePositiveBtnPress = async () => {
    setIsDeleting(true)
    const params = `/${bookingDetails?.id}`
    const res = await cancelBooking(params)
    if (res?.id) {
      const params = `/${loginData?.id}`
      const bookingRes = await getBookings(params)
      if (bookingRes?.length > 0) {
        dispatch(setBookings(bookingRes))
      }

      const canceledBookingRes = await getAllCanceledBookings(params)
      if (canceledBookingRes?.length > 0) {
        dispatch(setCanceledBookings(canceledBookingRes))
      }

      setIsDeleting(false)
      setIsAlertVisible(false)
      navigate(SCREEN_NAMES.ArchiveScreen)
    } else {
      Alert.alert('Something went wrong')
    }
  }

  useEffect(() => {
    const myDate = new Date(bookingDetails?.BookingDay)
    const month = myDate.toLocaleString('default', { month: 'long' })
    setCurrentMonth(month)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    setCurrentWeekDay(weekDay)
    setCurrentDate(myDate.getDate())
  }, [])

  return {
    actionName,
    approvalStage,
    bookingDetails,
    currentDate,
    currentMonth,
    currentWeekDay,
    isAlertVisible,
    isDeleting,
    handleAlertVisible,
    handleBackPress,
    handleOpenCouponPress,
    handleContentBriefPress,
    handlePositiveBtnPress,
    icon,
    timeFrame,
  }
}

export default useYourScheduleDetails
