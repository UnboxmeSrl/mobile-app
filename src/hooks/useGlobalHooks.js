import { useFetchData } from '@hooks/useFetchData'
import { useListenToOrderChanges } from '@hooks/useListenToOrderChanges'
import { useListenToTransactionChanges } from '@hooks/useListenToTransactionChanges'

import { useAuth } from './useAuth'

export const useGlobalHooks = () => {
  useAuth()
  useFetchData()
  useListenToOrderChanges()
  useListenToTransactionChanges()

  return null
}
