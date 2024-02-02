import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { SCREEN_NAMES } from '../constants/navigation'
import { YourScheduleScreen } from '../screens/YourSchedule'

const ScheduleStack = createStackNavigator(
  {
    [SCREEN_NAMES.YourScheduleScreen]: YourScheduleScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: SCREEN_NAMES.YourScheduleScreen,
  }
)
export default createAppContainer(ScheduleStack)
