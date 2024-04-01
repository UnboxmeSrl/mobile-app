import { navigate } from '@services'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { addRestaurantBooking, getTimeFrames, showToastError } from '../../../services'

const useBookingDetails = () => {
  const timeFrameData = useSelector((state) => state.restaurantSlice.timeFrameData)
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  // const [timeFrameData, setTimeFrameData] = useState([])

  const [weekDayWiseTimeSlots, setWeekDayWiseTimeSlots] = useState([])
  const [selectedTimeFame, setSelectedTimeFame] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isDatesLoading, setIsDatesLoading] = useState(true)
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
    // Replace this with logic to check if the date is available for booking
    return true // Return true for available, false for unavailable
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ServiceDetails)
  }

  const handleConfirmBtnPress = async () => {
    setIsLoading(true)
    const currentBookingDateTime = new Date(selectedDate)
    const bookingTimeStamp = currentBookingDateTime.valueOf()
    const formattedDate = `${currentBookingDateTime.getFullYear()}-${
      currentBookingDateTime.getMonth() + 1 < 10
        ? `0${currentBookingDateTime.getMonth() + 1}`
        : currentBookingDateTime.getMonth() + 1
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
      actions_turbo_id: serviceDetails?.actions_turbo_id,
      booking_status_id: 0,
      deal_scheme_id: 0,
      events_id: 0,
      offers_turbo_id: serviceDetails?.id,
      restaurant_id: restaurantDetails?.id,
      timeframes_id: selectedTimeFame?.id,
      user_turbo_id: loginData?.id,
    }

    const res = await addRestaurantBooking(prepData)
    if (res?.status === 200) {
      navigate({
        params: {
          bookingDetails: res?.data,
        },
        routeName: SCREEN_NAMES.BookingOnApprovalScreen,
      })
    } else {
      const error = {
        message: res?.data,
      }
      showToastError(error)
    }
    setIsLoading(false)
  }

  const handleRemoveBtnPress = () => {
    setSelectedTimeFame({})
  }

  const datesBlacklistFunc = (date) => {
    const myDate = new Date(date)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    // const filteredData = timeFrameData?.filter((t) => t._weekdaysturbo?.day === weekDay)
    const filteredData = timeFrameData?.filter((t) => {
      const filteredRes = t.weekdays?.filter((wt) => wt.day === weekDay)
      if (filteredRes.length > 0) return true
      else {
        return false
      }
    })

    if (filteredData.length === 0) {
      return true
    } else {
      return false
    }
  }

  const getTimeFrameData = async () => {
    const params = `/${restaurantDetails?.id}`
    const res = await getTimeFrames(params)
    console.log(
      'res timframe',
      res,
      res[0].DayOfWeek,
      res[0].weekdays.map((e) => e)
    )
    // console.log('res timframe', res[0]._weekdaysturbo?.day, res[0].weekdays)
    setTimeFrameData(res)
    const myDate = new Date(selectedDate)
    const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
    console.log('weekDay long', weekDay)
    setCurrentWeekDay(weekDay)

    console.log('timeFrameData:', timeFrameData)
    const updatedData = timeFrameData.map((item) => {
      const weekdays = item.weekdays
      const pauseDays = item.pause_days

      console.log('weekdays: ' + weekdays, 'pauseDays: ' + pauseDays)
      const filteredWeekdays = weekdays.filter((day) => !pauseDays.some((pauseDay) => pauseDay?.day === day?.day))
      return {
        ...item,
        weekdays: filteredWeekdays,
      }
    })
    console.log(
      'timeframe filtered data',
      filteredData
      // filteredData[0].weekdays.map((e) => e)
    )

    console.log('filteredTimeData2: ' + JSON.stringify(updatedData))
    const resu = updatedData?.map((t) => {
      const filteredRes = t.weekdays?.filter((wt) => wt?.day === weekDay)
      if (filteredRes.length > 0) {
        console.log('yes')
        setWeekDayWiseTimeSlots(updatedData)
      } else {
        setWeekDayWiseTimeSlots([])
      }
    })
    setWeekDayWiseTimeSlots(filteredData)
    setTimeout(() => {
      setIsDatesLoading(false)
    }, 2000)
  }

  useEffect(() => {
    getTimeFrameData()
  }, [])

  useEffect(() => {
    if (!isDatesLoading) {
      setSelectedTimeFame({})
      const myDate = new Date(selectedDate)
      const weekDay = myDate.toLocaleString('default', { weekday: 'long' })
      setCurrentWeekDay(weekDay)
      console.log('weekday', weekDay)
      const filteredData = timeFrameData?.filter((t) => {
        const filteredRes = t.weekdays?.filter((wt) => wt?.day === weekDay)
        if (filteredRes.length > 0) return true
        else {
          return false
        }
      })

      filteredData.forEach((item) => {
        const weekdays = item.weekdays
        const pauseDays = item.pause_days
        const filteredWeekdays = weekdays.filter((day) => !pauseDays.some((pauseDay) => pauseDay?.day === day?.day))
        item.weekdays = filteredWeekdays
      })
      console.log('Filtered Data', JSON.stringify(filteredData))
      setWeekDayWiseTimeSlots(filteredData)
    }
  }, [selectedDate])

  useEffect(() => {
    const myDate = new Date(selectedDate)
    console.log('selecxted dates ', selectedDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
    setCurrentMonth(month)
    setCurrentDate(myDate.getDate())
  }, [selectedDate])

  useEffect(() => {
    const myDate = new Date(startDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
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
    isLoading,
    isDateAvailable,
    isDatesLoading,
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
