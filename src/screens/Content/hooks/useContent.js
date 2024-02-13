import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '@services'

import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import { getBookings, getDiaryActions, updateAction, updateActionDiary } from '../../../services'

const useContent = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [selectedApp, setSelectedApp] = useState(1)
  const bookingDetails = useNavigationParam('bookingDetails')
  const actionName = useNavigationParam('actionName')
  const [isLoading, setIsLoading] = useState(false)
  const [diaryItems, setDiaryItems] = useState([])
  const [isDataFetching, setIsDataFetching] = useState(false)

  const dispatch = useDispatch()

  const getDiaryActionsData = async () => {
    setIsDataFetching(true)
    const res = await getDiaryActions()
    setDiaryItems(res)
    setIsDataFetching(false)
  }

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule)
  }

  const handleNextPress = async () => {
    setIsLoading(true)
    if (actionName === 'Diary Instagram') {
      /* Here, 
            reel=1 for reel
            reel=2 for tiktok 
    */
      const params = `/${bookingDetails?.id}`
      const prepData = {
        diary_action_turbo_id: diaryItems?.[selectedApp]?.id,
      }
      const res = await updateActionDiary(params, prepData)
      console.log('update Diary Result: ', res)
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
    } else {
      const params = `/${bookingDetails?.id}`
      const actionId = bookingDetails?._offers_turbo?.actions?.[selectedApp - 1]?.actions_turbo_id
      const prepData = { actions_turbo_id: actionId, bookingsturbo_id: bookingDetails?.id }
      const res = await updateAction(params, prepData)
      console.log('Update Action Result', res)
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
    setIsLoading(false)
  }

  useEffect(() => {
    getDiaryActionsData()
  }, [])

  return {
    isLoading,
    isDataFetching,
    diaryItems,
    actionName,
    handleBackPress,
    handleNextPress,
    selectedApp,
    setSelectedApp,
  }
}

export default useContent
