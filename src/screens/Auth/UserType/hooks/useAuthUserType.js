import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState()
  const userTypeList = [
    {
      id: 1,
      name: 'Model',
    },
    {
      id: 2,
      name: 'Influencer',
    },
    {
      id: 3,
      name: 'Both',
    },
  ]

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthInterestTopicsScreen)
  }

  return {
    userTypeList,
    selectedUserType,
    setSelectedUserType,
    handleNextPress,
  }
}

export default useAuthUserType
