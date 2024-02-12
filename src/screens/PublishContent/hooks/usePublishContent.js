import { SCREEN_NAMES } from '../../../constants/navigation'
import { navigate } from '../../../services'

const usePublishContent = () => {
  const approvalStage = 'Pending'
  const handleBackPress = () => {
    navigate({
      params: {
        selectedTab: 2,
      },
      routeName: SCREEN_NAMES.YourScheduleScreen,
    })
  }

  return {
    approvalStage,
    handleBackPress,
  }
}

export default usePublishContent
