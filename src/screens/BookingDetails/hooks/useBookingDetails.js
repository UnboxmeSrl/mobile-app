import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { getTimeFrames } from '../../../services'

const useBookingDetails = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentWeekDay, setCurrentWeekDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [timeFrameData, setTimeFrameData] = useState([])
  const [weekDayWiseTimeSlots, setWeekDayWiseTimeSlots] = useState([])
  const [selectedTimeFame, setSelectedTimeFame] = useState()
  const serviceDetails = useNavigationParam('serviceDetails')
  const restaurantDetails = useNavigationParam('restaurantDetails')

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

  const handleConfirmBtnPress = () => {
    navigate(SCREEN_NAMES.BookingOnApprovalScreen)
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
