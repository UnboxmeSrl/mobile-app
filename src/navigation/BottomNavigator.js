import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { CouponsScreen } from '@screens/Coupons'
import { PrizesScreen } from '@screens/Prizes'
import { ProfileScreen } from '@screens/Profile'

import { TabBarIcon } from '@components/TabBarIcon'
import { COLORS } from '@const'
import { SCREEN_NAMES } from '@const/navigation'

import { IMAGES } from '../assets/images'

import HomeStack from './HomeStack'

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
    [SCREEN_NAMES.Coupons]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
              <TabBarIcon focused={focused} icon={IMAGES.calender} />
            </View>
          )
        },
      },
      screen: CouponsScreen,
    },
    [SCREEN_NAMES.Prizes]: {
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <View style={focused ? styles.activeTabStyle : styles.inActiveTabStyle}>
              <TabBarIcon focused={focused} icon={IMAGES.bell} />
            </View>
          )
        },
      },
      screen: PrizesScreen,
    },
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
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: SCREEN_NAMES.Home,
    // tabBarComponent: (props) => (
    //   <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    // ),

    tabBarOptions: {
      activeTintColor: COLORS.lightTaupe,
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
    borderTopColor: COLORS.lightTaupe,
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
