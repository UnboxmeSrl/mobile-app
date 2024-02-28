import { useState } from 'react'

const useCreatePassword = () => {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  }
}

export default useCreatePassword
