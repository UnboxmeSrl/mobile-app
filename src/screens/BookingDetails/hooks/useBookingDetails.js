import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { addRestaurantBooking, getTimeFrames } from '../../../services'

const useBookingDetails = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [timeFrameData, setTimeFrameData] = useState([])
  const [weekDayWiseTimeSlots, setWeekDayWiseTimeSlots] = useState([])
  const [selectedTimeFame, setSelectedTimeFame] = useState()
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const restaurantDetails = useSelector((state) => state.restaurantSlice.restaurantDetails)

  const showNextWeek = () => {
    const newStartDate = new Date(startDate)
    newStartDate.setDate(startDate.getDate() + 7)
    const newEndDate = new Date(newStartDate)
    newEndDate.setDate(newEndDate.getDate() + 6)
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const showPreviousWeek = () => {
    const newStartDate = new Date(startDate)
    newStartDate.setDate(startDate.getDate() - 7)
    const newEndDate = new Date(newStartDate)
    newEndDate.setDate(newEndDate.getDate() + 6)
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const isDateAvailable = (date) => {
    // Replace this with your logic to check if the date is available for booking
    // For example, you can check against a list of booked dates or availability data
    return true // Return true for available, false for unavailable
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ServiceDetails)
  }

  const handleConfirmBtnPress = async () => {
    const currentBookingDateTime = new Date(selectedDate)
    const bookingTimeStamp = currentBookingDateTime.valueOf()
    const formattedDate = `${currentBookingDateTime.getFullYear()}-${
      currentBookingDateTime.getMonth() < 10
        ? `0${currentBookingDateTime.getMonth()}`
        : currentBookingDateTime.getMonth()
    }-${
      currentBookingDateTime.getDate() < 10 ? `0${currentBookingDateTime.getDate()}` : currentBookingDateTime.getDate()
    }`

    const prepData = {
      ApprovalStatus: false,
      Approved: serviceDetails?.Story,
      BookingDay: formattedDate,
      BookingTimestamp: bookingTimeStamp,
      BoxVisibility: 'true',
      CouponStatus: 'true',
      HourEnd: null,
      HourStart: '',
      Instagram_Status: '',
      Instructions: '',
      LinkAzione: '',
      MinuteEnd: '',
      MinuteStart: null,
      OfferVIsibility: false,
      Rejectedstatus: false,
      Submitbutton_: 'false',
      Title: '',
      action_status_turbo_id: 0,
      actions_turbo_id: 0,
      booking_status_id: 0,
      deal_scheme_id: 0,
      events_id: 0,
      offers_turbo_id: serviceDetails?.id,
      restaurant_id: restaurantDetails?.id,
      timeframes_id: selectedTimeFame?.id,
      user_turbo_id: loginData?.id,
    }

    console.log('prepData: ', prepData)
    const res = await addRestaurantBooking(prepData)
    if (res?.id) {
      navigate({
        params: {
          bookingDetails: res,
        },
        routeName: SCREEN_NAMES.BookingOnApprovalScreen,
      })
    } else {
      Alert.alert('something went wrong')
    }
  }

  const handleRemoveBtnPress = () => {
    setSelectedTimeFame({})
  }

  const getTimeFrameData = async () => {
    const params = `/${restaurantDetails?.id}`
    const res = await getTimeFrames(params)
    setTimeFrameData(res)
    const myDate = new Date(selectedDate)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    setCurrentWeekDay(weekDay)
    const filteredData = res?.filter((t) => t.DayOfWeek === weekDay)
    setWeekDayWiseTimeSlots(filteredData)
  }

  useEffect(() => {
    setSelectedTimeFame({})
    const myDate = new Date(selectedDate)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    console.log('weekDay: ' + weekDay)
    setCurrentWeekDay(weekDay)
    const filteredData = timeFrameData?.filter((t) => t.DayOfWeek === weekDay)
    console.log('filteredData: ' + JSON.stringify(filteredData))
    setWeekDayWiseTimeSlots(filteredData)
  }, [selectedDate])

  const datesBlacklistFunc = (date) => {
    const myDate = new Date(date)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    const filteredData = timeFrameData?.filter((t) => t.DayOfWeek === weekDay)
    if (filteredData.length === 0) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    getTimeFrameData()
  }, [])

  useEffect(() => {
    console.log('selected Date:', selectedDate)
    const myDate = new Date(selectedDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
    console.log('month: ' + month)
    setCurrentMonth(month)
    setCurrentDate(myDate.getDate())
  }, [selectedDate])

  useEffect(() => {
    const myDate = new Date(startDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
    console.log('month: ' + month)
    setCurrentMonth(month)
  }, [startDate])

  return {
    currentDate,
    currentMonth,
    currentWeekDay,
    datesBlacklistFunc,
    endDate,
    handleBackPress,
    handleConfirmBtnPress,
    handleRemoveBtnPress,
    isDateAvailable,
    selectedDate,
    selectedTimeFame,
    setSelectedDate,
    setSelectedTimeFame,
    showNextWeek,
    showPreviousWeek,
    startDate,
    weekDayWiseTimeSlots,
  }
}

export default useBookingDetails
