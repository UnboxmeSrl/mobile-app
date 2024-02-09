import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { checkActionName } from '../../../utils'
import { setRestaurantDetails } from '../../../redux/slices/restaurantSlice'

const useNewCoupon = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const dispatch = useDispatch()
  const isReel = bookingDetails?.reel === '1'
  const bookingDate = new Date(bookingDetails?.BookingDay)
  const month = bookingDate.toLocaleString('default', { month: 'long' })
  const timeFrame = bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo

  const actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0
  const icon = checkActionName(actionName)

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.YourScheduleScreen)
  }

  const handleContentBriefPress = () => {
    navigate({
      params: {
        bookingDetails: bookingDetails,
      },
      routeName: SCREEN_NAMES.ContentBriefScreen,
    })
  }

  const handleRestaurantRedirect = (item) => {
    dispatch(setRestaurantDetails(item))
    const cityData = item?._cities

    navigate({
      params: {
        cityData: cityData,
      },
      routeName: SCREEN_NAMES.RestaurantDetails,
    })
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
    handleContentBriefPress,
    handleRestaurantRedirect,
    icon,
    isReel,
    loginData,
    month,
    timeFrame,
  }
}

export default useNewCoupon
