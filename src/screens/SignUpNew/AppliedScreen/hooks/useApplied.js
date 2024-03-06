import { STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'

const useApplied = () => {
  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack)
  }

  return {
    handleGuestPress,
  }
}

export default useApplied
