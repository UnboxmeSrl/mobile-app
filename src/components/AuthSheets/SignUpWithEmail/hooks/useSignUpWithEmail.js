import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices/authSlice'
import { REGEX } from '../../../../constants'
import { getOtp, verifyOtp } from '../../../../services/SignUp'

const useSignUpWithEmail = (closeSignUpSheet) => {
  const [email, setEmail] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [isSendPress, setIsSendPress] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const dispatch = useDispatch()
  const createPasswordRef = useRef()
  const [error, setError] = useState({})

  const handleSignUpPress = async () => {
    if (email && REGEX.emailRegExp.test(email)) {
      const data = {
        email,
      }
      setError({})
      dispatch(setAuthData({ email }))
      const res = await getOtp(data)
      console.log('getOtp Response', res)
      if (res.success) {
        setIsSendPress(true)
      }
    } else {
      const errorObj = {
        message: 'Please enter valid email address.',
      }
      setError(errorObj)
    }
  }

  const handleSignUpPressAfterCodeSend = async () => {
    const body = {
      code: verificationCode,
      // code: '1234',
    }
    const res = await verifyOtp(body)
    if (res.success) {
      closeSignUpSheet()
    }
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
