import { getBuildNumber, getUniqueId, getVersion } from 'react-native-device-info'

export const appBuildNumber = getBuildNumber()
export const appVersion = getVersion()
export const deviceId = getUniqueId()
