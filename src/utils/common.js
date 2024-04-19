import { Platform } from 'react-native'
import { IMAGES } from '../assets/images'
import DeviceInfo from 'react-native-device-info'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { verticalScale } from 'react-native-size-matters'

export const checkActionName = (actionName) => {
  if (actionName) {
    switch (actionName) {
      case 'Reel':
        return IMAGES.reelsAddNew
      case 'Tiktok':
        return IMAGES.tiktokAddNew
      case 'Story':
        return IMAGES.storyAddNew
      case 'Maps & Story':
        return IMAGES.googleMaps
      case 'Diary Instagram':
        return IMAGES.diary
      case 'Diary Tiktok':
        return IMAGES.diary
    }
  }
}

export const checkAction = (actionNumId, actions) => {
  let result, filterRes

  if (actionNumId) {
    filterRes = actions?.filter((a) => a?.action_num_id === 4 || a?.action_num_id === 5)
    switch (actionNumId) {
      case 1:
        result = {
          action_id: 1,
          action_name: 'Story',
          action_icon: IMAGES.storyAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        }
        return result
      case 2:
        result = {
          action_id: 2,
          action_name: 'Maps & Story',
          action_icon: IMAGES.googleMaps,
          // action_icon: filterRes?.Action_icon?.url,
        }
        return result
      case 3:
        result = {
          action_id: 3,
          action_name: 'Diary Instagram',
          action_icon: IMAGES.diary,
          // action_icon: filterRes?.Action_icon?.url,
        }
        return result
      case 4:
        result = {
          action_id: 4,
          action_name: 'Reel',
          action_icon: IMAGES.reelsAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        }
        return result
      case 5:
        result = {
          action_id: 5,
          action_name: 'TikTok',
          action_icon: IMAGES.tiktokAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        }
        return result
      case 6:
        result = {
          action_id: 6,
          action_name: 'Full Dedicated',
          action_icon: IMAGES.fullDedicated,
          duo_actions: filterRes,
        }
        return result
    }
  }
}

export const checkContentStatus = (statusName) => {
  let title = '',
    description = '',
    statusIcon = ''

  switch (statusName) {
    case 'Approved':
      statusIcon = IMAGES.approvalSuccess
      title = 'Your content has been approved!'
      description = 'Congratulations your content created at Pizzami has been approved!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Rejected':
      statusIcon = IMAGES.approvalReject
      title = 'Your content has been rejected!'
      description = 'You lost some Exp, recover it by sending the content on review'
      return {
        title,
        description,
        statusIcon,
      }
    case 'To publish':
      statusIcon = IMAGES.approvalPending
      title = 'Your content need to be published!'
      description = 'Your content needs to be published!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Under Review':
      statusIcon = IMAGES.approvalUnderReview
      title = 'Your content in under review!'
      description = 'Your content is under review. We are checking it, you will be notified once approved!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Missed Deadline':
      statusIcon = IMAGES.approvalMissed
      title = 'You have missed the deadline!'
      description =
        'You have missed the Deadline and lost some Exp points. Publish now to not comprise your stats and to not get the account frozen'

      return {
        title,
        description,
        statusIcon,
      }
  }
}

export const hasNotch = !DeviceInfo.hasNotch()
export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const commonStyle = {
  containerPaddingTop: {
    paddingTop: getStatusBarHeight() + (isIos && hasNotch && verticalScale(15)),
  },
}
