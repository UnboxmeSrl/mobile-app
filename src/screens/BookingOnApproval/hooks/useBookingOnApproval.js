import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings, setRestaurantDetails, setServiceDetails } from '../../../redux/slices/restaurantSlice'
import { getBookings } from '../../../services'

const useBookingOnApproval = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const timeFrame = bookingDetails?._timeframes_turbo
  const approvalStageValue = bookingDetails?.Approved
    ? 'success'
    : bookingDetails?.Rejectedstatus
    ? 'reject'
    : 'pending'
  const [approvalStage, setApprovalStage] = useState(approvalStageValue)
  const dispatch = useDispatch()

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ServiceDetails)
  }

  const handleGoToSchedulePress = async () => {
    // dispatch(setRestaurantDetails({}))
    // dispatch(setServiceDetails({}))

    const params = `/${loginData?.id}`
    const res = await getBookings(params)
    dispatch(setBookings(res))
    navigate(SCREEN_NAMES.Schedule)
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
    approvalStage,
    bookingDetails,
    currentDate,
    currentMonth,
    currentWeekDay,
    handleBackPress,
    handleGoToSchedulePress,
    timeFrame,
  }
}

export default useBookingOnApproval
