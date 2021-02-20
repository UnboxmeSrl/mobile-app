import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ERouterScreens } from '@types'
import { HomeScreen } from '@screens/Home'
import { AwardsScreen } from '@screens/Awards'
import { SettingsScreen } from '@screens/Settings'

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
    defaultNavigationOptions: () => ({
      tabBarVisible: true
    })
  }
)
