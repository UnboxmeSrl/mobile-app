import { useState } from 'react'
import { navigate } from '@services'
import { SCREEN_NAMES } from '../../../../constants/navigation'

const useSignInWithEmail = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLoginPress = (ref) => {
    navigate(SCREEN_NAMES.PersonalDetailsScreen)
    ref?.current?.close()
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLoginPress,
  }
}

export default useSignInWithEmail
