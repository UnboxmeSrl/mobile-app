import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { checkAction, checkActionName } from '../../../utils'
import { cancelBooking, getAllCanceledBookings, getBookings } from '../../../services'
import { Alert } from 'react-native'
import { setBookings, setCanceledBookings } from '../../../redux/slices/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'

// import moment from 'moment'
// import 'moment-timezone'
// import { getTimeZone } from 'react-native-localize'

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
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url
    actionName = bookingDetails?._diary_action_turbo?.action_for_others
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action
  }

  const dispatch = useDispatch()

  // const serverData = {
  //   Start: '08',
  //   Minute_Start: '42',
  //   End: '22',
  //   Minute_End: '00',
  //   // Additional data from server...
  // }

  // // Function to convert server time to user's timezone
  // const convertTimeToUserTimezone = (serverData, serverTimezone, userTimezone) => {
  //   // Combine start and end times from the server data
  //   const startTime = `${serverData.Start}:${serverData.Minute_Start}`
  //   const endTime = `${serverData.End}:${serverData.Minute_End}`

  //   // Create moment objects for the starting and ending times
  //   // Assuming server times are in UTC
  //   const startMoment = moment.tz(startTime, 'HH:mm', serverTimezone)
  //   const endMoment = moment.tz(endTime, 'HH:mm', serverTimezone)

  //   // Convert the UTC times to the user's timezone
  //   const startUserTime = startMoment.tz(userTimezone)
  //   const endUserTime = endMoment.tz(userTimezone)

  //   return {
  //     startUserTime: startUserTime.format('HH:mm'), // Format the time as HH:mm
  //     endUserTime: endUserTime.format('HH:mm'), // Format the time as HH:mm
  //   }
  // }

  // // Define the server timezone (e.g., a timezone in Europe)
  // const serverTimezone = 'UTC' // Example timezone

  // // Get the user's timezone (you can retrieve this from device settings)
  // const userTimezone = getTimeZone() // Example timezone

  // // Convert the server times to the user's timezone
  // const userTimes = convertTimeToUserTimezone(serverData, serverTimezone, userTimezone)

  // console.log('User Start Time:', userTimes.startUserTime)
  // console.log('User End Time:', userTimes.endUserTime)

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
    const month = myDate.toLocaleString('en-US', { month: 'long' })
    setCurrentMonth(month)
    const weekDay = myDate.toLocaleString('en-US', { weekday: 'long' })
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
