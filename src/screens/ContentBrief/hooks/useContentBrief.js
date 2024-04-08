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
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url
    actionName = bookingDetails?._diary_action_turbo?.action_for_others
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action
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
    actionNumId,
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
