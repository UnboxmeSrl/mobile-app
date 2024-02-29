import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthCity = () => {
  const [city, setCity] = useState()

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthAgencyScreen)
  }

  return {
    city,
    setCity,
    handleNextPress,
  }
}

export default useAuthCity
