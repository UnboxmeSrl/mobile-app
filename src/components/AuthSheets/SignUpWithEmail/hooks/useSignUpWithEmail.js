import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { REGEX } from '../../../../constants'
import { setAuthData } from '../../../../redux/slices/authSlice'
import { getOtp, verifyOtp } from '../../../../services/SignUp'
import { showToastError } from '../../../../services'

const useSignUpWithEmail = (closeSignUpSheet) => {
  const [email, setEmail] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [isSendPress, setIsSendPress] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const dispatch = useDispatch()
  const createPasswordRef = useRef()
  const [error, setError] = useState({})

  useEffect(() => {
    setError((err) => {
      if (err?.message) return {}
      return err
    })
  }, [email])

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
      } else {
        const errorObj = res
        setError(errorObj)
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
      email,
      // code: '1234',
    }
    const res = await verifyOtp(body)
    if (res.success) {
      closeSignUpSheet()
    } else {
      showToastError(res)
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
    setIsSendPress,
    isBtnDisabled,
    isSendPress,
    createPasswordRef,
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
  }
}

export default useSignUpWithEmail
