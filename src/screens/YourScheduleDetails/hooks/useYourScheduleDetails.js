import { useEffect, useState } from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { IMAGES } from '../../../assets/images'
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
  const actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0
  let icon = ''
  if (actionName) {
    switch (actionName) {
      case 'Reel':
        icon = IMAGES.reel
        break
      case 'TikTok':
        icon = IMAGES.tiktok
        break
      case 'Story':
        icon = IMAGES.instagramStory
        break
      case 'Maps & Story':
        icon = IMAGES.googleMaps
        break
      case 'Diary Instagram':
        icon = IMAGES.diary
        break
    }
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  const handleOpenCouponPress = () => {
    navigate({
      params: {
        bookingDetails: bookingDetails,
      },
      routeName: SCREEN_NAMES.NewCouponScreen,
    })
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
    handleBackPress,
    handleOpenCouponPress,
    icon,
    timeFrame,
  }
}

export default useYourScheduleDetails
