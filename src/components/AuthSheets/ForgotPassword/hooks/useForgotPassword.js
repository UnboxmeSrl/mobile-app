import { useState } from 'react'

const useForgotPassword = () => {
  const [email, setEmail] = useState()
  const [isSendPress, setIsSendPress] = useState(false)

  return {
    email,
    setEmail,
    isSendPress,
  }
}

export default useForgotPassword
