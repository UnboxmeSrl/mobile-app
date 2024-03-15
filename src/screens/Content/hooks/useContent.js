import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigationParam } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '@services'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { setBookings } from '../../../redux/slices/restaurantSlice'
import {
  getBookingForContentList,
  getBookings,
  getDiaryActions,
  updateAction,
  updateActionDiary,
} from '../../../services'
import { setContentList } from '../../../redux/slices'

const useContent = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const [selectedApp, setSelectedApp] = useState(0)
  const bookingDetails = useNavigationParam('bookingDetails')
  const actionName = useNavigationParam('actionName')
  const actionNumId = useNavigationParam('actionNumId')
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
      const newParams = `/${loginData?.id}`
      const contentListRes = await getBookingForContentList(newParams)
      dispatch(setContentList(contentListRes))
      navigate({
        params: {
          bookingDetails: res,
        },
        routeName: SCREEN_NAMES.ContentBriefScreen,
      })
    } else {
      Alert.alert('Something went wrong')
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
    actionNumId,
    handleBackPress,
    handleNextPress,
    selectedApp,
    setSelectedApp,
  }
}

export default useContent
