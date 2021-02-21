/* Navigation utils used OUTSIDE <Screen />  */
import { useMemo } from 'react'
import { useNavigationState } from 'react-navigation-hooks'
import { NavigationActions } from '@react-navigation/core'
import { propOr } from 'ramda'

let navigator

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

export function navigate(routeName, params, action) {
  navigator.dispatch(
    typeof routeName === 'string'
      ? NavigationActions.navigate({
        action,
        params,
        routeName
      })
      : NavigationActions.navigate(routeName)
  )
}

export function dispatch(action) {
  navigator.dispatch(action)
}

export const getCurrentRoute = (nav) => {
  if (!nav || !nav.routes) {
    return null
  }
  const route = nav.routes[nav.index]

  if (route.routes) {
    return getCurrentRoute(route)
  }
  return route
}

const getCurrentRouteName = (nav, nestingLevel) => {
  if (!nav || !nav.routes) {
    return null
  }
  const route = nav.routes[nav.index]

  if (route.routes && nestingLevel > 0) {
    return getCurrentRouteName(route, nestingLevel - 1)
  }
  return route.routeName
}

export const useCurrentRouteName = (nestingLevel = Infinity) => {
  const navState = useNavigationState()

  return useMemo(() => getCurrentRouteName(navState, nestingLevel), [
    navState,
    nestingLevel
  ])
}

export const getStackRouterRoot = (nav) => {
  if (nav?.state?.key === 'StackRouterRoot') {
    return nav
  } else if (nav && nav.dangerouslyGetParent) {
    return getStackRouterRoot(nav.dangerouslyGetParent())
  } else {
    return nav
  }
}

export const getCurrentRootRouteName = (nav) => {
  const parentNav = getStackRouterRoot(nav)
  const state = propOr({}, 'state', parentNav)
  const routes = propOr([], 'routes', state)
  const index = propOr(0, 'index', state)

  return routes[index]?.routeName
}
