import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { checkActionName } from '../../../utils'

const useContentBrief = () => {
  const bookingDetails = useNavigationParam('bookingDetails')
  const isReel = bookingDetails?.reel === '1'
  console.log('isReel', isReel, bookingDetails)
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action
  }
  const icon = checkActionName(actionName)

  const handleOpenCouponPress = () => {
    navigate({
      params: {
        bookingDetails: bookingDetails,
      },
      routeName: SCREEN_NAMES.NewCouponScreen,
    })
  }

  return {
    actionName,
    bookingDetails,
    handleBackPress,
    handleOpenCouponPress,
    icon,
    isReel,
  }
}

export default useContentBrief
