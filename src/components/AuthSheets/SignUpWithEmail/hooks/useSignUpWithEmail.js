import { useState } from 'react'

const useSignUpWithEmail = () => {
  const [email, setEmail] = useState()
  const [isSendPress, setIsSendPress] = useState(false)

  return {
    email,
    setEmail,
    isSendPress,
  }
}

export default useSignUpWithEmail
