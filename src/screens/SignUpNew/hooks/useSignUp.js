import { SCREEN_NAMES, STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'

const useSignUp = () => {
  const handleSignInPress = () => {
    navigate(SCREEN_NAMES.SignIn)
  }

  const handleCreateAnAccountPress = () => {
    navigate(SCREEN_NAMES.OtherSignUp)
  }

  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack)
  }

  return {
    handleSignInPress,
    handleCreateAnAccountPress,
    handleGuestPress,
  }
}

export default useSignUp
