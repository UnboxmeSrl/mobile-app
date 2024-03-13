import { useState } from 'react'
import { navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'

const useAuthPersonalDetails = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [name, setName] = useState(userDetails?.name ?? '')
  const [surname, setSurname] = useState(userDetails?.surname ?? '')
  const [nickName, setNickName] = useState(userDetails?.nickName ?? '')
  const [phoneNumber, setPhoneNumber] = useState(userDetails?.phoneNumber ?? '')
  const [isFocused, setIsFocused] = useState()
  const [country, setCountry] = useState(userDetails?.country ?? {})
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const onSelect = (country) => {
    setCountry(country)
  }

  const handleNextPress = () => {
    // const phonWithCountryCode = `+${country?.callingCode?.[0]}${phoneNumber}`
    dispatch(setAuthData({ name, surname, nickName, country: country, phoneNumber: phoneNumber }))
    dispatch(setSignUpProcessStage(2))
    navigate(SCREEN_NAMES.AuthGenderScreen)
  }

  return {
    name,
    setName,
    surname,
    setSurname,
    nickName,
    setNickName,
    phoneNumber,
    setPhoneNumber,
    isFocused,
    setIsFocused,
    country,
    onSelect,
    handleNextPress,
  }
}

export default useAuthPersonalDetails
