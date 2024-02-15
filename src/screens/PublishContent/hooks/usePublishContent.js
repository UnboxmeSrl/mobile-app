import { useNavigationParam } from 'react-navigation-hooks'
import { SCREEN_NAMES } from '../../../constants/navigation'
import { getBookingForContentList, navigate, updateContentUrl } from '../../../services'
import { checkActionName } from '../../../utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContentList } from '../../../redux/slices'
import Toast from 'react-native-toast-message'

const usePublishContent = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const approvalStage = 'Pending'
  const contentDetails = useNavigationParam('contentDetails')
  const [link, setLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSendToReview, setIsSendToReview] = useState(false)
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] = useState(false)
  const [updatedContentDetails, setUpdatedContentDetails] = useState()
  let actionName = contentDetails?._actions_turbo?.Action_Name ?? 0
  if (contentDetails?.diary_action_turbo_id) {
    actionName = contentDetails?._diary_action_turbo?.action
  }
  const icon = checkActionName(actionName)
  const bookingDate = new Date(contentDetails?.BookingDay)
  const month = bookingDate.toLocaleString('default', { month: 'long' })
  const timeFrame = contentDetails?._timeframes ?? contentDetails?._timeframes_turbo
  const dispatch = useDispatch()

  const handleBackPress = () => {
    navigate({
      params: {
        selectedTab: 2,
      },
      routeName: SCREEN_NAMES.YourScheduleScreen,
    })
  }

  const handleEditPress = () => {
    navigate({
      params: {
        actionName: actionName,
        bookingDetails: contentDetails,
      },
      routeName: SCREEN_NAMES.ContentScreen,
    })
  }

  const handleContentModalOpenClose = () => {
    setIsContentStatusModalVisible(!isContentStatusModalVisible)
  }

  const handleSendToReviewBtnPress = async () => {
    setIsSendToReview(true)
    if (actionName !== 'Story' && link === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter the content link.',
      })
      setIsSendToReview(false)
      return
    }
    const params = `/${contentDetails?.id}`
    const prepData = {
      content_url: link,
    }
    const res = await updateContentUrl(params, prepData)
    setUpdatedContentDetails(res)
    setIsSendToReview(false)
  }

  const handlePositiveBtnPress = async () => {
    setIsLoading(true)
    const params = `/${loginData?.id}`
    const res = await getBookingForContentList(params)
    dispatch(setContentList(res))
    setIsLoading(false)

    if (res?.length > 0) {
      navigate({
        params: {
          selectedTab: 2,
        },
        routeName: SCREEN_NAMES.YourScheduleScreen,
      })
    }
  }

  const handleContentBriefPress = () => {
    navigate({
      params: {
        bookingDetails: contentDetails,
      },
      routeName: SCREEN_NAMES.ContentBriefScreen,
    })
  }

  useEffect(() => {
    if (!isContentStatusModalVisible && updatedContentDetails?.id) {
      handleContentModalOpenClose()
    }
  }, [updatedContentDetails])

  return {
    link,
    setLink,
    contentDetails,
    updatedContentDetails,
    actionName,
    icon,
    bookingDate,
    month,
    timeFrame,
    approvalStage,
    isLoading,
    isSendToReview,
    isContentStatusModalVisible,
    handleContentModalOpenClose,
    handleSendToReviewBtnPress,
    handlePositiveBtnPress,
    handleContentBriefPress,
    handleEditPress,
    handleBackPress,
  }
}

export default usePublishContent
