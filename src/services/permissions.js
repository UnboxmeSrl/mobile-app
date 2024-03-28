import { PermissionsAndroid } from 'react-native'

import { IS_IOS } from '@const/common'

export async function hasReadAndroidPermission() {
  if (IS_IOS) {
    return
  }
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  // console.log(hasPermission, 'hasPermission')
  if (hasPermission) {
    return true
  }
  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}
