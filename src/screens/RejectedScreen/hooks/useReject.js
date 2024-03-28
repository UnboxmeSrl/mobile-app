import { useDispatch } from 'react-redux'

import { STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'

import { resetLogin } from '../../../redux/slices'

const useReject = () => {
  const dispatch = useDispatch()

  const handleGuestPress = () => {
    dispatch(resetLogin())
    navigate(STACK_NAMES.BottomStack)
  }

  return {
    handleGuestPress,
  }
}

export default useReject
