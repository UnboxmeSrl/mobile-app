import { useEffect, useState } from 'react'
import OneSignal from 'react-native-onesignal'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setIsFirstTimeLogin, setLoginData } from '../../../../redux/slices/authSlice'
import { setBookings } from '../../../../redux/slices/restaurantSlice'
import { showToastError, userLogin } from '../../../../services'
import { getBookings } from '../../../../services/RestaurantService'
import { setTempAuthData } from '../../../../redux/slices/tempAuth'

const useSignInWithEmail = (isFromBookRedirected) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
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
      setLoading(false)
      if (res.UserStatus === 'approved') {
        OneSignal.setExternalUserId(res?.id?.toString())
        dispatch(setLoginData(res))
        const params = `/${res?.id}`
        const bookingRes = await getBookings(params)
        dispatch(setBookings(bookingRes))

        console.log('isFirstTimeLogin', isFirstTimeLogin)
        if (isFirstTimeLogin) {
          dispatch(setIsFirstTimeLogin(false))
          navigate({
            routeName: SCREEN_NAMES.LoginOnboarding,
            params: {
              isFromBookRedirected: isFromBookRedirected,
            },
          })
        } else if (serviceDetails?.id && isFromBookRedirected) {
          navigate(SCREEN_NAMES.ServiceDetails)
        } else {
          if (res.firstVisit === false) {
            navigate(SCREEN_NAMES.FirstWelcomeScreen)
          } else {
            navigate(SCREEN_NAMES.Cities)
          }
        }
        ref?.current?.close()
<<<<<<< HEAD
      } else if (res.UserStatus === 'rejected') {
        navigate(SCREEN_NAMES.RejectedScreen)
=======
      } else {
        const error = {
          message: 'Something went wrong',
        }
        showToastError(error)
        setIsError(true)
>>>>>>> ea5f8f6e137a3d3b7e795a5e433b7664b1f2d3b5
      }
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isError) {
      setIsError(false)
    }
  }, [email, password])

  return {
    email,
    setEmail,
    password,
    isError,
    loading,
    setPassword,
    handleLoginPress,
  }
}

export default useSignInWithEmail
