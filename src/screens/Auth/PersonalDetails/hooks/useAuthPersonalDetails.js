import { useState } from 'react'
import { navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'

const useAuthPersonalDetails = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState()
  const [country, setCountry] = useState()

  const onSelect = (country) => {
    setCountry(country)
  }

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthNationalityScreen)
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
