import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { setAuthData } from '../../../../redux/slices'
import { useDispatch } from 'react-redux'

const useAuthAgency = () => {
  const [selectedValue, setSelectedValue] = useState(0)
  const [agencyName, setAgencyName] = useState('')
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const handleNextPress = () => {
    const prepData =
      selectedValue == 1 ? { hasAgency: 'No Agency', freelance: true } : { hasAgency: agencyName, freelance: false }
    dispatch(setAuthData({ agencyData: prepData }))
    navigate(SCREEN_NAMES.AuthUserTypeScreen)
  }

  useEffect(() => {
    if (selectedValue === 1 || (agencyName?.length > 0 && selectedValue === 2)) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [selectedValue, agencyName])

  return {
    isBtnDisabled,
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleNextPress,
  }
}

export default useAuthAgency
