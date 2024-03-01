import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { getInterestTopics, navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthInterestTopics = () => {
  const [interestTopicsList, setInterestTopicsList] = useState()
  const [selectedInterests, setSelectedInterests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

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

  const handleNextPress = () => {
    dispatch(setAuthData({ userInterests: selectedInterests }))
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
    handleNextPress,
  }
}

export default useAuthInterestTopics
