import { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setLoginData } from '../../../../redux/slices/authSlice'
import { setBookings } from '../../../../redux/slices/restaurantSlice'
import { userLogin } from '../../../../services'
import { getBookings } from '../../../../services/RestaurantService'
import { setTempAuthData } from '../../../../redux/slices/tempAuth'

const useSignInWithEmail = (isFromBookRedirected) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const dispatch = useDispatch()

  const handleLoginPress = async (ref) => {
    // navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)
    try {
      setLoading(true)
      const prepData = { email, password }
      const res = await userLogin(prepData)
      setLoading(false)
      if (res.UserStatus === 'approved') {
        OneSignal.setExternalUserId(res?.id?.toString())
        dispatch(setLoginData(res))
        const params = `/${res?.id}`
        const bookingRes = await getBookings(params)
        dispatch(setBookings(bookingRes))
        if (serviceDetails?.id && isFromBookRedirected) {
          navigate(SCREEN_NAMES.ServiceDetails)
        } else {
          if (res.firstVisit === false) {
            navigate(SCREEN_NAMES.FirstWelcomeScreen)
          } else {
            navigate(SCREEN_NAMES.Cities)
          }
        }
        ref?.current?.close()
      } else if (res.UserStatus === 'rejected') {
        navigate(SCREEN_NAMES.RejectedScreen)
      }
    } catch (e) {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLoginPress,
  }
}

export default useSignInWithEmail
