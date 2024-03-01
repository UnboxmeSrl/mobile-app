import { useState } from 'react'
import { navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthPersonalDetails = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState()
  const [country, setCountry] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const onSelect = (country) => {
    setCountry(country)
  }

  const handleNextPress = () => {
    const phonWithCountryCode = `+${country?.callingCode?.[0]}${phoneNumber}`
    dispatch(setAuthData({ name, surname, nickName, phoneNumber: phonWithCountryCode }))
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
