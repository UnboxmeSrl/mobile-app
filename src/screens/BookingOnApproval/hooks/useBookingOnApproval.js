import { useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useBookingOnApproval = () => {
  const [approvalStage, setApprovalStage] = useState('success')
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.BookingDetails)
  }

  const handleGoToSchedulePress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  return {
    approvalStage,
    handleBackPress,
    handleGoToSchedulePress,
  }
}

export default useBookingOnApproval
