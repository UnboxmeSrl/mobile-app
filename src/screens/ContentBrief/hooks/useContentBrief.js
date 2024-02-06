import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'

const useContentBrief = () => {
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ContentScreen)
  }

  const handleOpenCouponPress = () => {
    navigate(SCREEN_NAMES.NewCouponScreen)
  }

  return {
    handleBackPress,
    handleOpenCouponPress,
  }
}

export default useContentBrief
