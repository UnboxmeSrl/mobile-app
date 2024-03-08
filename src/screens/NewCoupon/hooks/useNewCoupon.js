import { navigate } from '@services'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { setRestaurantDetails } from '../../../redux/slices/restaurantSlice'
import { checkAction, checkActionName } from '../../../utils'

const useNewCoupon = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const dispatch = useDispatch()
  const isReel = bookingDetails?.reel === '1'
  const bookingDate = new Date(bookingDetails?.BookingDay)
  const month = bookingDate.toLocaleString('default', { month: 'long' })
  const timeFrame = bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo

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
