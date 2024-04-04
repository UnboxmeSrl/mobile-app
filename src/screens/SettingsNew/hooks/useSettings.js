import { getBuildNumber, getVersion } from 'react-native-device-info'
import { deleteUserAccount, logger, reset, showToastSuccess } from '../../../services'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState } from 'react'
import { MAIN_NAVIGATOR } from '../../../constants/navigation'
import { persistor } from '../../../redux/store'
import { resetLogin } from '../../../redux/slices'
import { Alert } from 'react-native'

const useSettings = () => {
  const loginData = useSelector((state) => state.authSlice.loginData)
  const version = getVersion()
  const buildNumber = getBuildNumber()
  const dispatch = useDispatch()
  const versionName = `${version} (${buildNumber})`
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      reset(MAIN_NAVIGATOR)
      dispatch(resetLogin())
      await persistor.purge()
      showToastSuccess("You've been logged out")
      logger.info('Logout succeeded')
      setIsLoading(false)
    } catch (error) {
      logger.error('Logout error', { error })
    }
  }, [dispatch])

  const handleLogout = useCallback(async () => {
    Alert.alert('Confirmation', 'Are you sure you want to log out?', [
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          logout()
        },
        text: 'Logout',
      },
    ])
  }, [logout])

  const handleDeleteAccount = async () => {
    Alert.alert('Confirmation', 'Are you sure you want to delete your account?', [
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: async () => {
          setIsDeleting(true)
          const prepUrl = `/${loginData?.id}`
          const res = await deleteUserAccount(prepUrl)
          //TODO: Enable below if you need in future (satyam)
          // reset(MAIN_NAVIGATOR)
          dispatch(resetLogin())
          await persistor.purge()
          showToastSuccess(res)
          setIsDeleting(false)
        },
        text: 'Delete',
      },
    ])
  }

  return {
    versionName,
    isDeleting,
    isLoading,
    handleLogout,
    handleDeleteAccount,
  }
}

export default useSettings
