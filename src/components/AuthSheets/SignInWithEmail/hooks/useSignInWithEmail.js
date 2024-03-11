import { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setIsFirstTimeLogin, setLoginData } from '../../../../redux/slices/authSlice'
import { setBookings } from '../../../../redux/slices/restaurantSlice'
import { userLogin } from '../../../../services'
import { getBookings } from '../../../../services/RestaurantService'

const useSignInWithEmail = (isFromBookRedirected) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const isFirstTimeLogin = useSelector((state) => state.authSlice.isFirstTimeLogin)
  const dispatch = useDispatch()

  const handleLoginPress = async (ref) => {
    // navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)

    try {
      setLoading(true)
      const prepData = { email, password }
      const res = await userLogin(prepData)
      console.log('res', res)
      setLoading(false)
      if (res?.id) {
        OneSignal.setExternalUserId(res?.id?.toString())
        dispatch(setLoginData(res))
        const params = `/${res?.id}`
        const bookingRes = await getBookings(params)
        dispatch(setBookings(bookingRes))

        console.log('isFirstTimeLogin', isFirstTimeLogin)
        if (isFirstTimeLogin) {
          dispatch(setIsFirstTimeLogin(false))
          navigate(SCREEN_NAMES.LoginOnboarding)
        } else if (serviceDetails?.id && isFromBookRedirected) {
          navigate(SCREEN_NAMES.ServiceDetails)
        } else {
          navigate(SCREEN_NAMES.Cities)
        }
        ref?.current?.close()
      } else {
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
