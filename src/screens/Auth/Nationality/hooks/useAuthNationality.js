import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthNationality = () => {
  const [country, setCountry] = useState()

  const onSelect = (country) => {
    console.log('country', country)
    setCountry(country)
  }

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthCityScreen)
  }
  return {
    country,
    onSelect,
    handleNextPress,
  }
}

export default useAuthNationality
