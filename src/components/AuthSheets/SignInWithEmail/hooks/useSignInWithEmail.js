import { useEffect, useState } from 'react'
import OneSignal from 'react-native-onesignal'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setIsFirstTimeLogin, setLoginData, setOnboardingData } from '../../../../redux/slices/authSlice'
import { setBookings } from '../../../../redux/slices/restaurantSlice'
import { setTempAuthData } from '../../../../redux/slices/tempAuth'
import { showToastError, userLogin } from '../../../../services'
import { getBookings } from '../../../../services/RestaurantService'

const useSignInWithEmail = (isFromBookRedirected) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { navigate } = useNavigation()
  const serviceDetails = useSelector((state) => state.restaurantSlice.serviceDetails)
  const dispatch = useDispatch()

  const handleLoginPress = async (ref) => {
    // navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)
    try {
      setLoading(true)
      const prepData = { email, password }
      const res = await userLogin(prepData)
      console.log(res, 'res')
      setLoading(false)
      if (res?.UserStatus === 'approved') {
        OneSignal.setExternalUserId(res?.id?.toString())
        dispatch(setLoginData(res))
        const params = `/${res?.id}`
        const bookingRes = await getBookings(params)
        dispatch(setBookings(bookingRes))

        // console.log('isFirstTimeLogin', isFirstTimeLogin)
        if (res.firstVisit === 1) {
          // dispatch(setIsFirstTimeLogin(false))
          navigate(SCREEN_NAMES.FirstWelcomeScreen)
        } else if (serviceDetails?.id && isFromBookRedirected) {
          navigate(SCREEN_NAMES.ServiceDetails)
        } else {
          navigate(SCREEN_NAMES.Cities)
        }

        ref?.current?.close()
      } else if (res.UserStatus === '' || res.UserStatus === 'onapproval') {
        dispatch(setOnboardingData(true))
        navigate(SCREEN_NAMES.AppliedScreen)
        ref?.current?.close()
      } else if (res.UserStatus === 'rejected') {
        dispatch(setOnboardingData(true))
        navigate(SCREEN_NAMES.RejectedScreen)
        ref?.current?.close()
      } else {
        setIsError(true)
      }
    } catch (err) {
      setLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    if (isError) {
      setIsError(false)
    }
  }, [email, password])

  return {
    email,
    handleLoginPress,
    isError,
    loading,
    password,
    setEmail,
    setPassword,
  }
}

export default useSignInWithEmail
