import { useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useContent = () => {
  const [selectedApp, setSelectedApp] = useState(0)

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.ContentBriefScreen)
  }

  return { handleBackPress, handleNextPress, selectedApp, setSelectedApp }
}

export default useContent
