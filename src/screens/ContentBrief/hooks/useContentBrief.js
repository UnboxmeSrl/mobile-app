import { useNavigationParam } from 'react-navigation-hooks'

import { navigate } from '@services'

import { IMAGES } from '../../../assets/images'
import { SCREEN_NAMES } from '../../../constants/navigation'

const useContentBrief = () => {
  const bookingDetails = useNavigationParam('bookingDetails')
  const isReel = bookingDetails?.reel === '1'
  console.log('isReel', isReel, bookingDetails)
  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  const actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0
  let icon = ''
  if (actionName) {
    switch (actionName) {
      case 'Reel':
        icon = IMAGES.reel
        break
      case 'TikTok':
        icon = IMAGES.tiktok
        break
      case 'Story':
        icon = IMAGES.instagramStory
        break
      case 'Maps & Story':
        icon = IMAGES.googleMaps
        break
      case 'Diary Instagram':
        icon = IMAGES.diary
        break
    }
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
  }
}

export default useContentBrief
