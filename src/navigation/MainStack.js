import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator'
import { createStackNavigator } from 'react-navigation-stack'
import { last,length, prop, slice } from 'ramda'
import { DARK } from 'src/constants/navigation'
import BottomNavigator from 'src/navigation/BottomNavigator'
import { MODALS } from 'src/navigation/modals'
import pushScreens from 'src/navigation/pushScreens'
import { makeStack, STACK_SUFFIX } from 'src/services/routing'

import { COLORS } from '@const'
import { ERouterStacks } from '@types'

import { IS_IOS } from '../constants/common'

import {
  cardOverlay,
  cardStyleInterpolator,
  gestureResponseDistance,
  getCardStyle,
  getRadius,
  getTopOffset,
  ModalSlideFromBottomIOS,
  rootScreensNavigationOptions
} from './utils'

let insertedKey = 0

// This is topmost navigator contain only native navigator and modal screens. Can be Native for IOS but must be JS for android
const createMainNavigator = IS_IOS
  ? createNativeStackNavigator
  : createStackNavigator

const nativeStackPushRoutesFactory = (mainRouteName, mainRouteConfig) => {
  const navigator = createNativeStackNavigator(
    { ...pushScreens, [mainRouteName]: mainRouteConfig },
    {
      defaultNavigationOptions: ({ theme }) => ({
        cardShadowEnabled: false,
        cardStyle: {
          backgroundColor: theme === 'dark' ? COLORS.background : COLORS.white
        },
        stackAnimation: 'slide_from_right'
      }),
      headerMode: 'none',
      initialRouteName: ERouterStacks.BottomStack
    }
  )

  const router = prop('router', navigator)
  const oldGetStateForAction = prop('getStateForAction', router)

  router.getStateForAction = (action, state) => {
    if (action.type === 'Custom/INSERT_ONE_BELOW') {
      const nextLastIndexInStack = length(state.routes)
      const lastScreen = last(state.routes)
      const otherScreens = slice(0, length(state.routes) - 1, state.routes)

      const newState = {
        ...state,
        index: nextLastIndexInStack,
        isTransitioning: true,
        routes: [
          ...otherScreens,
          {
            key: `inserted-${insertedKey}`,
            routeName: action.routeName
          },
          lastScreen
        ]
      }

      insertedKey += 1

      return newState
    }

    return oldGetStateForAction(action, state)
  }

  return navigator
}

const wrapIntoPushStackNavigators = (routeConfigMap) =>
  Object.keys(routeConfigMap).reduce((prev, curr) => {
    prev[curr + STACK_SUFFIX] = {
      path: '',
      screen: nativeStackPushRoutesFactory(curr, routeConfigMap[curr])
    }
    return prev
  }, {})

const wrappedModals = Object.keys(MODALS).reduce(
  (prev, curr) => ({
    [curr]: {
      navigationOptions: {
        cardOverlay,
        cardOverlayEnabled: !IS_IOS,
        cardStyle: getCardStyle(curr),
        cardStyleInterpolator,
        cornerRadius: getRadius(curr),
        gestureEnabled: true,
        gestureResponseDistance,
        topOffset: IS_IOS && getTopOffset(curr)
      },
      screen: MODALS[curr],
      ...(typeof MODALS[curr] === 'object' ? MODALS[curr] : {})
    },
    ...prev
  }),
  {}
)

console.log(wrappedModals)

const RootStack = makeStack(
  createMainNavigator(
    {
      mainNavigator: {
        path: '',
        screen: createNativeStackNavigator(
          {
            ...wrapIntoPushStackNavigators({
              [ERouterStacks.BottomStack]: {
                path: '',
                screen: BottomNavigator,

              },
            }),
          },
          {
            headerMode: 'none'
          }
        )
      },
      ...wrappedModals
    },
    {
      defaultNavigationOptions: {
        customStack: true,
        ...rootScreensNavigationOptions,
        ...ModalSlideFromBottomIOS
      },
      headerMode: 'none',
      mode: 'modal'
    }
  )
)

export default RootStack
