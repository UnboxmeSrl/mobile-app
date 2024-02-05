import { useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useContent = () => {
  const [selectedApp, setSelectedApp] = useState(0)

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  return { handleBackPress, selectedApp, setSelectedApp }
}

export default useContent
