import { useFetchData } from '@hooks/useFetchData'
import { useListenToOrderChanges } from '@hooks/useListenToOrderChanges'

import { useAuth } from './useAuth'

export const useGlobalHooks = () => {
  useAuth()
  useFetchData()
  useListenToOrderChanges()

  return null
}
