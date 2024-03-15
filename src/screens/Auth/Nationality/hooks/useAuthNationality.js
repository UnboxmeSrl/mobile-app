import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'
import { useNavigation } from 'react-navigation-hooks'

const useAuthNationality = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [country, setCountry] = useState(userDetails?.nationality ?? {})
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const navigation = useNavigation()

  const onSelect = (country) => {
    console.log('country', country)
    setCountry(country)
  }

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthDateOfBirthScreen)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ nationality: country }))
    dispatch(setSignUpProcessStage(5))
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
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthNationality
