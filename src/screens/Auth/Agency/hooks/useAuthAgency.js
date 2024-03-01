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
    if (selectedValue !== 0) {
      if (selectedValue === 2) {
        if (agencyName?.length > 0) {
          console.log('test')
          setIsBtnDisabled(false)
        }
      } else {
        setIsBtnDisabled(false)
      }
    }
  }, [selectedValue])

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
