import 'react-native-get-random-values'
import { v1 } from 'uuid'

import { appBuildNumber, appVersion, deviceId } from '@const/device'

const FUNCTION_NAME = 'logger'
const ERROR = 'error'
const INFO = 'info'

// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }
export const runningSessionId = v1()

const handleLog = ({ message, data = {}, level }) => {
  const { error: errorObject } = data
  const error = errorObject
    ? {
        code: errorObject?.code,
        errorMessage: errorObject?.message,
        trace: errorObject?.stack,
      }
    : undefined

  if (level === INFO) {
    console.log('message, data in INFO', message, data)
  } else if (level === ERROR) {
    console.error(message, data)
  }

  const payload = {
    appBuildNumber,
    appVersion,
    deviceId,
    error,
    runningSessionId,
    ...data,
  }
}

const info = (message, data) => handleLog({ data, level: INFO, message })
const error = (message, data) => handleLog({ data, level: ERROR, message })

export const logger = { error, info }
