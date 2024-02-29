import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthInterestTopics = () => {
  const interestTopicsList = [
    {
      id: 1,
      name: 'Sport',
    },
    {
      id: 2,
      name: 'Music',
    },
    {
      id: 3,
      name: 'Design',
    },
    {
      id: 4,
      name: 'Travel',
    },
    {
      id: 5,
      name: 'Books',
    },
    {
      id: 6,
      name: 'Science',
    },
    {
      id: 7,
      name: 'Photography',
    },
    {
      id: 8,
      name: 'Gaming',
    },
    {
      id: 9,
      name: 'Digital Art',
    },
    {
      id: 10,
      name: 'Fitness',
    },
  ]
  const [selectedInterests, setSelectedInterests] = useState([])

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
    navigate(SCREEN_NAMES.AuthProfilePictureScreen)
  }

  return {
    selectedInterests,
    interestTopicsList,
    handleInterestSelect,
    handleNextPress,
  }
}

export default useAuthInterestTopics
