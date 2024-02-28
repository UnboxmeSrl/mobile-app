import { useRef, useEffect } from 'react'
import { Dimensions } from 'react-native'

const useSignUpWithEmail = () => {
  const height = Dimensions.get('window').height
  return {
    height,
  }
}

export default useSignUpWithEmail
