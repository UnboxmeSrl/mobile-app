import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { getInterestTopics, navigate } from '../../../../services'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'
import { useNavigation } from 'react-navigation-hooks'

const useAuthInterestTopics = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [interestTopicsList, setInterestTopicsList] = useState()
  const [selectedInterests, setSelectedInterests] = useState(userDetails?.userInterests ?? [])
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const navigation = useNavigation()

  const getInterestTopicsData = async () => {
    const res = await getInterestTopics()
    setInterestTopicsList(res)
    setIsLoading(false)
  }

  const handleInterestSelect = (selectedTopic) => {
    const filteredRes = selectedInterests?.filter((item) => item?.id === selectedTopic?.id)
    if (filteredRes.length > 0) {
      const listWithDeletedTopic = selectedInterests?.filter((item) => item?.id !== selectedTopic?.id)
      setSelectedInterests(listWithDeletedTopic)
    } else {
      setSelectedInterests([...selectedInterests, selectedTopic])
    }
  }

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthUserTypeScreen)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ userInterests: selectedInterests }))
    dispatch(setSignUpProcessStage(9))
    navigate(SCREEN_NAMES.AuthProfilePictureScreen)
  }

  useEffect(() => {
    getInterestTopicsData()
  }, [])

  useEffect(() => {
    if (selectedInterests?.length !== 0) {
      setIsBtnDisabled(false)
    }
  }, [selectedInterests])

  return {
    isBtnDisabled,
    isLoading,
    selectedInterests,
    interestTopicsList,
    handleInterestSelect,
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthInterestTopics
