import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthAgency = () => {
  const [selectedValue, setSelectedValue] = useState(0)
  const [agencyName, setAgencyName] = useState()

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthUserTypeScreen)
  }

  return {
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleNextPress,
  }
}

export default useAuthAgency
