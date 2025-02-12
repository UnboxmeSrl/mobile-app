/* Navigation utils used OUTSIDE <Screen />  */
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName, params, action) {
  routeName === 'back'
    ? navigationRef.goBack()
    : typeof routeName === 'string'
    ? navigationRef.navigate(routeName, params)
    : navigationRef.navigate(routeName);
}

export function reset(routeName) {
  StackActions.reset({
    actions: [navigationRef.navigate(routeName)],
    index: 0,
  });
}

export const getCurrentRoute = nav => {
  if (!nav || !nav.routes) {
    return null;
  }
  const route = nav.routes[nav.index];

  if (route.routes) {
    return getCurrentRoute(route);
  }
  return route;
};

const getCurrentRouteName = (nav, nestingLevel) => {
  if (!nav || !nav.routes) {
    return null;
  }
  const route = nav.routes[nav.index];

  if (route.routes && nestingLevel > 0) {
    return getCurrentRouteName(route, nestingLevel - 1);
  }
  return route.routeName;
};

export const getStackRouterRoot = nav => {
  if (nav?.state?.key === 'StackRouterRoot') {
    return nav;
  } else if (nav && nav.dangerouslyGetParent) {
    return getStackRouterRoot(nav.dangerouslyGetParent());
  } else {
    return nav;
  }
};
