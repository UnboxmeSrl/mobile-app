import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useYourScheduleDetails = () => {
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
  const timeFrame = bookingDetails?._timeframes_turbo

  const handleBackPress = () => {
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

  return { approvalStage, bookingDetails, currentDate, currentMonth, currentWeekDay, handleBackPress, timeFrame }
}

export default useYourScheduleDetails
