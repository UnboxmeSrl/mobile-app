import { navigate } from '@services'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { setRestaurantDetails } from '../../../redux/slices/restaurantSlice'
import { checkAction, checkActionName } from '../../../utils'
import { IMAGES } from '../../../assets/images'

const useNewCoupon = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const bookingDetails = useNavigationParam('bookingDetails')
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isReel = bookingDetails?.reel === '1'
  const bookingDate = new Date(bookingDetails?.BookingDay)
  const month = bookingDate.toLocaleString('en-US', { month: 'long' })
  const timeFrame = bookingDetails?._timeframes ?? bookingDetails?._timeframes_turbo

  let actionNumId = bookingDetails?._actions_turbo?.action_num_id ?? 0
  let icon = bookingDetails?._actions_turbo?.Action_icon?.url
  let actionName = bookingDetails?._actions_turbo?.Action_Name ?? 0

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url
    actionName = bookingDetails?._diary_action_turbo?.action_for_others
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action
  }

  let amenityDetails = {}

  if (actionNumId === 7) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Beauty} X Treatment`,
      amenityIcon: IMAGES.beauty,
      amenityDescription: 'at your choice',
    }
  } else if (actionNumId === 8) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Gym} X Pass`,
      amenityIcon: IMAGES.gym,
      amenityDescription: 'at your choice',
    }
  } else if (actionNumId === 9) {
    amenityDetails = {
      amenityName: `${bookingDetails?._actions_turbo?.Accomodation} x Days (${
        bookingDetails?._actions_turbo?.Accomodation - 1
      } nights)`,
      amenityIcon: IMAGES.resort,
      amenityDescription: 'at your choice',
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
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
    amenityDetails,
    actionNumId,
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
