import { navigate } from '@services'
import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { setContentList, setServices } from '../../../redux/slices'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookingForContentList, getBookings } from '../../../services'

const useBookingOnApproval = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    const params = `/${loginData?.id}`
    const res = await getBookings(params)
    dispatch(setBookings(res))

    const newParams = `/${loginData?.id}`
    const contentListRes = await getBookingForContentList(newParams)
    dispatch(setContentList(contentListRes))
    setIsLoading(false)
    dispatch(setServices([]))
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
    isLoading,
    currentDate,
    currentMonth,
    currentWeekDay,
    handleBackPress,
    handleGoToSchedulePress,
    timeFrame,
  }
}

export default useBookingOnApproval
