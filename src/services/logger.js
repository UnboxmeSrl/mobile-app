import firebase from '@react-native-firebase/app'
import functions from '@react-native-firebase/functions';
import { v1 } from 'uuid'

const FUNCTION_NAME = 'logger'
const ERROR = 'error'
const INFO = 'info'

// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }
const sessionId = v1()

const handleLog = ({message, data = {}, level}) => {
  const { error: errorObject } = data
  const user = firebase?.auth()?.currentUser?.toJSON()
  const error = errorObject ? { errorMessage: errorObject?.message, trace: errorObject?.stack} : undefined

  if (level === INFO) {
    console.log(message, data)
  } else if (level === ERROR) {
    console.error(message, data)
  }

  const payload = {
    ...data,
    sessionId,
    user,
    error
  }

  functions()
    .httpsCallable(FUNCTION_NAME)({level, message, payload})
    .catch(e => {
      console.error(e)
    })
}

const info = (message, data) => handleLog({ data, level: INFO, message})
const error = (message, data) => handleLog({ data, level: ERROR, message})

export const logger = { error, info }

