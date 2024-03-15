import { STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'

const useFirstWellcome = () => {
  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack)
  }

  return {
    handleGuestPress,
  }
}

export default useFirstWellcome
