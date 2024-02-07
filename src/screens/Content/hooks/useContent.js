import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookings, updateBookingContent } from '../../../services'

const useContent = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [selectedApp, setSelectedApp] = useState(1)
  const bookingDetails = useNavigationParam('bookingDetails')
  const dispatch = useDispatch()

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  const handleNextPress = async () => {
    /* Here, 
            reel=1 for reel
            reel=2 for tiktok 
    */
    const params = `/${bookingDetails?.id}`
    const prepData = {
      reel: selectedApp,
    }
    const res = await updateBookingContent(params, prepData)
    console.log('result', res)
    if (res?.id) {
      const params = `/${loginData?.id}`
      const bookingRes = await getBookings(params)
      dispatch(setBookings(bookingRes))
      navigate({
        params: {
          bookingDetails: res,
        },
        routeName: SCREEN_NAMES.ContentBriefScreen,
      })
    } else {
      Alert.alert('Something went wrong')
    }
  }

  return { handleBackPress, handleNextPress, selectedApp, setSelectedApp }
}

export default useContent
