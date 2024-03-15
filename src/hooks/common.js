import { useCallback, useMemo } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SCREEN_NAMES } from '@const/navigation'
import { selectIsAuthenticated } from '../redux/slices/authSlice'
// import { selectIsAuthenticated } from '@redux/modules/auth'

export const useAuthenticatedAction = (action) => {
  const { navigate } = useNavigation()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return useCallback(
    (data) =>
      isAuthenticated
        ? action(data)
        : navigate({
            routeName: SCREEN_NAMES.SignUp,
          }),
    [isAuthenticated, action, navigate]
  )
}

export const useAction = (action, deps = []) => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch])
}
