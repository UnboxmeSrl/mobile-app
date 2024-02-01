import { useEffect, useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useBookingDetails = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState('')

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

  useEffect(() => {
    const myDate = new Date(selectedDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
    console.log('month: ' + month)
    setCurrentMonth(month)
  }, [selectedDate])

  useEffect(() => {
    const myDate = new Date(startDate)
    const month = myDate.toLocaleString('default', { month: 'long' })
    console.log('month: ' + month)
    setCurrentMonth(month)
  }, [startDate])

  const isDateAvailable = (date) => {
    // Replace this with your logic to check if the date is available for booking
    // For example, you can check against a list of booked dates or availability data
    return true // Return true for available, false for unavailable
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Restaurants)
  }

  return {
    currentMonth,
    endDate,
    handleBackPress,
    isDateAvailable,
    selectedDate,
    setSelectedDate,
    showNextWeek,
    showPreviousWeek,
    startDate,
  }
}

export default useBookingDetails
