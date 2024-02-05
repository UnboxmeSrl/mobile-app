import { useState } from 'react'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useYourSchedule = () => {
  const [selectedTab, setSelectedTab] = useState(1)

  const handleCardPress = () => {
    // navigate(SCREEN_NAMES.YourScheduleDetailsScreen)
    navigate(SCREEN_NAMES.ContentScreen)
  }
  return { handleCardPress, selectedTab, setSelectedTab }
}

export default useYourSchedule
