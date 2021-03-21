import { identical, includes, map, not, path, pathOr, pipe } from 'ramda'
import { store } from 'src/redux/store'

import { STACK_NAMES } from '@const/navigation'

const createTruthMapUsingArrayOfKeys = pipe(
  map((item) => [item, true]),
  (entries) => new Map(entries)
)

const navigationActions = createTruthMapUsingArrayOfKeys([
  'Navigation/NAVIGATE',
  'Navigation/PUSH',
  'Navigation/REPLACE',
  'Navigation/JUMP_TO',
  'Navigation/RESET',
])

export const STACK_SUFFIX = '-stack'

export const routesWithNoAuthRequired = createTruthMapUsingArrayOfKeys([])

export const routesWhenNotLoggedIn = []

const registerContextByRoute = {}

const getRouteName = (action) => {
  const routeName = pathOr(action.routeName, ['action', 'routeName'], action)

  if (identical(routeName, STACK_NAMES.BottomStack)) {
    return path(['action', 'routeName', 'action', 'routeName'], action)
  }

  return routeName
}

const getStateForUnauthorizedAction = (action, navState, defaultGetStateForAction) => {
  const routeName = getRouteName(action)

  // return defaultGetStateForAction(
  //   {
  //     routeName: MODAL_NAMES.SIGN_IN,
  //     type: 'Navigation/NAVIGATE',
  //     params: { context: registerContextByRoute[routeName] }
  //   },
  //   navState
  // )
}

const getStateForModalAction = (action, navState, defaultGetStateForAction) => {
  const storeState = store.getState()
  const isAuthenticated = true // TODO

  if (
    !isAuthenticated ||
    // If the user is already logged in, we do not want to show certain modals
    not(includes(action.routeName, routesWhenNotLoggedIn))
  ) {
    return defaultGetStateForAction(action, navState)
  }

  return navState
}

export const makeStack = (Stack) => {
  const defaultGetStateForAction = Stack.router.getStateForAction

  Stack.router.getStateForAction = (navAction, navState) => {
    if (!navigationActions.has(navAction.type)) {
      return defaultGetStateForAction(navAction, navState)
    }

    const routeName = getRouteName(navAction)

    const isAuth = true
    const isUnauthorized = !isAuth && !routesWithNoAuthRequired.has(routeName)
    const isModal = false

    return defaultGetStateForAction(navAction, navState)
  }
  return Stack
}
