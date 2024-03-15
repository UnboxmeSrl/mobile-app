import { STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'

const useReject = () => {
  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack)
  }

  return {
    handleGuestPress,
  }
}

export default useReject
