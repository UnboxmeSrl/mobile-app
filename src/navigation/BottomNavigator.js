import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, SCREEN_NAMES, STACK_NAMES} from '../constants';
import {verticalScale} from 'react-native-size-matters';
import {TabBarIcon} from '../components';
import {IMAGES} from '../assets';
import {hasNotch} from '../utils';
import HomeStack from './HomeStack';
import ScheduleStack from './ScheduleStack';
import ProfileStack from './ProfileStack';
import AppMap from '../components/AppMap';
import {useChatClient} from '../hooks';
import {ChatRoom} from '../screens/ChatRoom';

const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {clientIsReady} = useChatClient();
  console.log('Client is ready', clientIsReady);
  return (
    <BottomTabs.Navigator
      initialRouteName={SCREEN_NAMES.Home}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.newPrimary,
        tabBarInactiveTintColor: COLORS.white,
        tabBarAllowFontScaling: false,
        style: styles.globalTabBarStyle,
      }}>
      <BottomTabs.Screen
        name={SCREEN_NAMES.Home}
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused ? styles.activeTabStyle : styles.inActiveTabStyle
                }>
                <TabBarIcon focused={focused} icon={IMAGES.home} />
              </View>
            );
          },
        }}
      />
      {/* <BottomTabs.Screen
        name={SCREEN_NAMES.MapScreen}
        component={AppMap}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused ? styles.activeTabStyle : styles.inActiveTabStyle
                }>
                <TabBarIcon focused={focused} icon={IMAGES.location} />
              </View>
            );
          },
        }}
      /> */}
      <BottomTabs.Screen
        name={SCREEN_NAMES.ChatRoom}
        component={ChatRoom}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused ? styles.activeTabStyle : styles.inActiveTabStyle
                }>
                <TabBarIcon focused={focused} icon={IMAGES.chat} />
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name={SCREEN_NAMES.Schedule}
        component={ScheduleStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused ? styles.activeTabStyle : styles.inActiveTabStyle
                }>
                <TabBarIcon focused={focused} icon={IMAGES.calender} />
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name={STACK_NAMES.ProfileStack}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={
                  focused ? styles.activeTabStyle : styles.inActiveTabStyle
                }>
                <TabBarIcon focused={focused} icon={IMAGES.user} />
              </View>
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  globalTabBarStyle: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 0,
    height: 56,
    marginBottom: hasNotch ? verticalScale(10) : 0,
  },
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
});
