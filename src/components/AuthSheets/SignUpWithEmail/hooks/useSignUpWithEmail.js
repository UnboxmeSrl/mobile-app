import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices/authSlice'

const useSignUpWithEmail = (closeSignUpSheet) => {
  const [email, setEmail] = useState()
  const [isSendPress, setIsSendPress] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const dispatch = useDispatch()
  const createPasswordRef = useRef()

  const handleSignUpPress = () => {
    if (email) {
      dispatch(setAuthData({ email }))
      setIsSendPress(true)
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
    isBtnDisabled,
    isSendPress,
    createPasswordRef,
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
  }
}

export default useSignUpWithEmail
