import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useCreatePassword = () => {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const handleCreatePasswordPress = (ref) => {
    dispatch(setAuthData({ password }))
    navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)
    ref?.current?.close()
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [password, confirmPassword])

  return {
    isBtnDisabled,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleCreatePasswordPress,
  }
}

export default useCreatePassword
