import { useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useYourScheduleDetails = () => {
  const [approvalStage, setApprovalStage] = useState('success')

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  return { approvalStage, handleBackPress }
}

export default useYourScheduleDetails
