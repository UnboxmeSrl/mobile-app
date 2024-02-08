import { useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import { navigate } from '@services'

import { IMAGES } from '../../../assets/images'
import { SCREEN_NAMES } from '../../../constants/navigation'

const useNewCoupon = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const isReel = bookingDetails?.reel === '1'
  const bookingDate = new Date(bookingDetails?.BookingDay)
  const month = bookingDate.toLocaleString('default', { month: 'long' })
  const timeFrame = bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo

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

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  const handleGoToContentPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  return {
    actionName,
    bookingDate,
    bookingDetails,
    handleBackPress,
    handleGoToContentPress,
    icon,
    isReel,
    loginData,
    month,
    timeFrame,
  }
}

export default useNewCoupon
