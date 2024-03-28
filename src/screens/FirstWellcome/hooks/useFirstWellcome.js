import { STACK_NAMES } from '@const/navigation'
import { navigate } from '@services'
import { setIsFirstTimeLogin, updateUserCount } from '../../../redux/slices'
import { useDispatch } from 'react-redux'

const useFirstWellcome = () => {
  const dispatch = useDispatch()
  const handleGuestPress = () => {
    // navigate(STACK_NAMES.BottomStack)
    console.log('press')
    dispatch(updateUserCount(2))
  }

  return {
    handleGuestPress,
  }
}

export default useFirstWellcome
