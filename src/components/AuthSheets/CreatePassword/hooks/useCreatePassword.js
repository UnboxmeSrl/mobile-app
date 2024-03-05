import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate, showToastError } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'
import { REGEX } from '../../../../constants'

const useCreatePassword = () => {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [error, setError] = useState({})

  const handleCreatePasswordPress = (ref) => {
    if (!REGEX.passwordRegExp.test(password)) {
      const errorObj = {
        message: 'Password must contain at least one character & must be minimum 8 characters long. ',
      }
      setError(errorObj)
    } else if (password !== confirmPassword) {
      const errorObj = {
        message: 'Password & confirm password must be same.',
      }
      setError(errorObj)
    } else {
      dispatch(setAuthData({ password }))
      navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)
      setError({})
      ref?.current?.close()
    }
  }

  // useEffect(() => {
  //   if (error?.message) {
  //     setIsBtnDisabled(false)
  //   } else {
  //     setIsBtnDisabled(true)
  //   }
  // }, [confirmPassword])

  return {
    isBtnDisabled,
    password,
    setPassword,
    confirmPassword,
    error,
    setConfirmPassword,
    handleCreatePasswordPress,
  }
}

export default useCreatePassword
