import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { CouponsScreen } from '@screens/Coupons'
import { HomeScreen } from '@screens/Home'
import { PrizesScreen } from '@screens/Prizes'
import { ProfileScreen } from '@screens/Profile'

import { TabBarIcon } from '@components/TabBarIcon'
import { COLORS } from '@const'
import { SCREEN_NAMES } from '@const/navigation'

export default createBottomTabNavigator(
  {
    [SCREEN_NAMES.Home]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => <TabBarIcon activeIcon={'home'} focused={focused} icon={'home-outline'} />,
      },
      screen: HomeScreen,
    },
    [SCREEN_NAMES.Coupons]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => <TabBarIcon activeIcon={'pricetag'} focused={focused} icon={'pricetag-outline'} />,
      },
      screen: CouponsScreen,
    },
    [SCREEN_NAMES.Prizes]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => <TabBarIcon activeIcon={'trophy'} focused={focused} icon={'trophy-outline'} />,
      },
      screen: PrizesScreen,
    },
    [SCREEN_NAMES.Profile]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => <TabBarIcon activeIcon={'person'} focused={focused} icon={'person-outline'} />,
      },
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: SCREEN_NAMES.Home,
    // tabBarComponent: (props) => (
    //   <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    // ),
    tabBarOptions: {
      activeTintColor: COLORS.secondary,
      inactiveTintColor: COLORS.veryLight04,
      style: {
        backgroundColor: COLORS.black,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 0,
        height: 56,
      },
    },
  }
)
