import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { checkAction, checkActionName } from '../../../utils'
import Clipboard from '@react-native-clipboard/clipboard'
import { showToastSuccess } from '../../../services'

const useContentBrief = () => {
  const bookingDetails = useNavigationParam('bookingDetails')
  const isReel = bookingDetails?.reel === '1'
  console.log('isReel', isReel, bookingDetails)
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0
  let icon = checkAction(actionNumId)?.action_icon
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action_for_others
    if (actionNumId === 3) {
      actionName = bookingDetails?._diary_action_turbo?.action
    }
    icon = checkActionName(actionName)
  }

  const handleTagCopyPress = (copyText) => {
    Clipboard.setString(copyText)
    showToastSuccess('Text copied successfully!')
  }

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
    handleTagCopyPress,
  }
}

export default useContentBrief
