import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthNationality = () => {
  const [country, setCountry] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const onSelect = (country) => {
    console.log('country', country)
    setCountry(country)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ nationality: country?.name }))
    navigate(SCREEN_NAMES.AuthCityScreen)
  }

  useEffect(() => {
    if (country?.name) {
      setIsBtnDisabled(false)
    }
  }, [country])

  return {
    isBtnDisabled,
    country,
    onSelect,
    handleNextPress,
  }
}

export default useAuthNationality
