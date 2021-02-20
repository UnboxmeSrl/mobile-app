import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

export enum ERouterStacks {
  BottomStack = 'BottomStack',
  ModalStack = 'ModalStack',
  NativeStack = 'NativeStack'
}

export enum ERouterScreens {
  Awards = 'Awards',
  Home = 'Home',
  Login = 'Login',
  Settings = 'Settings'
}

export type TabScreenOptions = (data: {
  route: {
    name: string
  }
}) => BottomTabNavigationOptions

export type RouteName = ERouterScreens | ERouterStacks
