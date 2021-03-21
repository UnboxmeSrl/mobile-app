import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { appBuildNumber, appVersion, deviceId } from '@const/device'
import { updateMe } from '@redux/modules/auth'
import { runningSessionId } from '@services'

export const useUpdateUserMetadata = () => {
  const dispatch = useDispatch()

  return useCallback(() => {
    dispatch(updateMe({ appBuildNumber, appVersion, deviceId, runningSessionId }))
  }, [dispatch])
}
