import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AwardsScreen } from '@screens/Awards'
import { HomeScreen } from '@screens/Home'
import { SettingsScreen } from '@screens/Settings'

import { SCREEN_NAMES } from '@const/navigation'

export default createBottomTabNavigator(
  {
    [SCREEN_NAMES.Home]: {
      screen: HomeScreen,
    },
    [SCREEN_NAMES.Awards]: {
      screen: AwardsScreen,
    },
    [SCREEN_NAMES.Settings]: {
      screen: SettingsScreen,
    }
  },
  {

    initialRouteName: SCREEN_NAMES.Home,
  }
)
