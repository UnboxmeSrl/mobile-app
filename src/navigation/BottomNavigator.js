import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { CouponsScreen } from '@screens/Coupons'
import { PrizesScreen } from '@screens/Prizes'
import { ProfileScreen } from '@screens/Profile'

import { TabBarIcon } from '@components/TabBarIcon'
import { SCREEN_NAMES } from '@const/navigation'

import { IMAGES } from '../assets/images'

import HomeStack from './HomeStack'
import ScheduleStack from './ScheduleStack'
import ProfileStack from './ProfileStack'
import { COLORS } from '../constants'

export default createBottomTabNavigator(
  {
    [SCREEN_NAMES.Home]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
              <TabBarIcon focused={focused} icon={IMAGES.home} />
            </View>
          )
        },
      },
      screen: HomeStack,
    },
    [SCREEN_NAMES.Schedule]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
              <TabBarIcon focused={focused} icon={IMAGES.calender} />
            </View>
          )
        },
      },
      screen: ScheduleStack,
    },
    // [SCREEN_NAMES.Prizes]: {
    //   navigationOptions: {
    //     tabBarIcon: ({ focused }) => {
    //       return (
    //         <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
    //           <TabBarIcon focused={focused} icon={IMAGES.bell} />
    //         </View>
    //       )
    //     },
    //   },
    //   screen: PrizesScreen,
    // },
    [SCREEN_NAMES.Profile]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
              <TabBarIcon focused={focused} icon={IMAGES.user} />
            </View>
          )
        },
      },
      screen: ProfileStack,
    },
  },
  {
    initialRouteName: SCREEN_NAMES.Home,
    // tabBarComponent: (props) => (
    //   <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    // ),

    tabBarOptions: {
      activeTintColor: COLORS.newPrimary,
      inactiveTintColor: COLORS.white,
      style: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 0,
        height: 56,
      },
    },
  }
)

const styles = StyleSheet.create({
  activeTabStyle: {
    alignItems: 'center',
    borderTopColor: COLORS.newPrimary,
    borderTopWidth: 3,
    flex: 1,
    justifyContent: 'center',
    width: 73,
  },
  inActiveTabStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    width: 73,
  },
})
