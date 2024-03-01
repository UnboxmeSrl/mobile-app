import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthCity = () => {
  const [city, setCity] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const handleNextPress = () => {
    dispatch(setAuthData({ city: city }))
    navigate(SCREEN_NAMES.AuthAgencyScreen)
  }

  useEffect(() => {
    if (city) {
      setIsBtnDisabled(false)
    }
  }, [city])

  return {
    isBtnDisabled,
    city,
    setCity,
    handleNextPress,
  }
}

export default useAuthCity
