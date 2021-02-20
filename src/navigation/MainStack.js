import { createStackNavigator } from 'react-navigation-stack'
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator'
import { prop, length, slice, last } from 'ramda'
import { makeStack, STACK_SUFFIX } from 'src/services/routing'
import BottomNavigator from 'src/navigation/BottomNavigator'
import { MODALS } from 'src/navigation/modals'
import pushScreens from 'src/navigation/pushScreens'
import { DARK } from 'src/constants/navigation'
import {
  getRadius,
  cardOverlay,
  getCardStyle,
  getTopOffset,
  ModalSlideFromBottomIOS,
  cardStyleInterpolator,
  gestureResponseDistance,
  rootScreensNavigationOptions
} from './utils'
import { IS_IOS } from '../constants/common'
import { COLORS } from '@const'
import { ERouterStacks } from '@types'

let insertedKey = 0

// This is topmost navigator contain only native navigator and modal screens. Can be Native for IOS but must be JS for android
const createMainNavigator = IS_IOS
  ? createNativeStackNavigator
  : createStackNavigator

const nativeStackPushRoutesFactory = (mainRouteName, mainRouteConfig) => {
  const navigator = createNativeStackNavigator(
    { ...pushScreens, [mainRouteName]: mainRouteConfig },
    {
      initialRouteName: ERouterStacks.BottomStack,
      headerMode: 'none',
      defaultNavigationOptions: ({ theme }) => ({
        cardShadowEnabled: false,
        cardStyle: {
          backgroundColor: theme === 'dark' ? COLORS.background : COLORS.white
        },
        stackAnimation: 'slide_from_right'
      })
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
            routeName: action.routeName,
            key: `inserted-${insertedKey}`
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
      screen: nativeStackPushRoutesFactory(curr, routeConfigMap[curr]),
      path: ''
    }
    return prev
  }, {})

const wrappedModals = Object.keys(MODALS).reduce(
  (prev, curr) => ({
    [curr]: {
      screen: MODALS[curr],
      navigationOptions: {
        cardOverlay,
        cardStyleInterpolator,
        gestureResponseDistance,
        cardOverlayEnabled: !IS_IOS,
        cardStyle: getCardStyle(curr),
        cornerRadius: getRadius(curr),
        topOffset: IS_IOS && getTopOffset(curr),
        gestureEnabled: true
      },
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
                screen: BottomNavigator,
                path: '',

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
      headerMode: 'none',
      mode: 'modal',
      defaultNavigationOptions: {
        customStack: true,
        ...rootScreensNavigationOptions,
        ...ModalSlideFromBottomIOS
      }
    }
  )
)

export default RootStack
