import { useFetchData } from '@hooks/useFetchData'

import { useAuth } from './useAuth'

export const useGlobalHooks = () => {
  useAuth()
  useFetchData()

  return null
}
