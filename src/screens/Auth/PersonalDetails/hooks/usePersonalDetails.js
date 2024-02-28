import { useState } from 'react'

const usePersonalDetails = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nickName, setNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState()

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
  }
}

export default usePersonalDetails
