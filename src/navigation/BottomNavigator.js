import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AwardsScreen } from '@screens/Awards'
import { HomeScreen } from '@screens/Home'
import { SettingsScreen } from '@screens/Settings'

import { ERouterScreens } from '@types'

export default createBottomTabNavigator(
  {
    [ERouterScreens.Home]: {
      screen: HomeScreen,
    },
    [ERouterScreens.Awards]: {
      screen: AwardsScreen,
    },
    [ERouterScreens.Settings]: {
      screen: SettingsScreen,
    }
  },
  {

    initialRouteName: ERouterScreens.Home,
  }
)
