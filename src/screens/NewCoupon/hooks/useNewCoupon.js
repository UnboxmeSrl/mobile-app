import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useNewCoupon = () => {
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ContentBriefScreen)
  }

  const handleGoToContentPress = () => {}

  return {
    handleBackPress,
    handleGoToContentPress,
  }
}

export default useNewCoupon
