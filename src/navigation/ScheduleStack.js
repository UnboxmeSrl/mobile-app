import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { SCREEN_NAMES } from '../constants/navigation'
import { YourScheduleScreen } from '../screens/YourSchedule'
import { ArchiveScreen } from '../screens/Archive'

const ScheduleStack = createStackNavigator(
  {
    [SCREEN_NAMES.YourScheduleScreen]: YourScheduleScreen,
    [SCREEN_NAMES.ArchiveScreen]: ArchiveScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: SCREEN_NAMES.YourScheduleScreen,
  }
)
export default createAppContainer(ScheduleStack)
