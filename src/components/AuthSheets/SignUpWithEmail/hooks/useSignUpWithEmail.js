import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices/authSlice'
import { REGEX } from '../../../../constants'

const useSignUpWithEmail = (closeSignUpSheet) => {
  const [email, setEmail] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [isSendPress, setIsSendPress] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const dispatch = useDispatch()
  const createPasswordRef = useRef()
  const [error, setError] = useState({})

  const handleSignUpPress = () => {
    if (email && REGEX.emailRegExp.test(email)) {
      setError({})
      dispatch(setAuthData({ email }))
      setIsSendPress(true)
    } else {
      const errorObj = {
        message: 'Please enter valid email address.',
      }
      setError(errorObj)
    }
  }

  const handleSignUpPressAfterCodeSend = () => {
    closeSignUpSheet()
  }

  useEffect(() => {
    if (email?.length > 0) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [email])

  return {
    email,
    setEmail,
    error,
    verificationCode,
    setVerificationCode,
    isBtnDisabled,
    isSendPress,
    createPasswordRef,
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
  }
}

export default useSignUpWithEmail
