import { useEffect, useRef, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthCodeFromFriend = () => {
  const [codeLetter1, setCodeLetter1] = useState('')
  const [codeLetter2, setCodeLetter2] = useState('')
  const [codeLetter3, setCodeLetter3] = useState('')
  const [codeLetter4, setCodeLetter4] = useState('')
  const [codeLetter5, setCodeLetter5] = useState('')
  const [focusedTextInput, setFocusedTextInput] = useState('')
  const code1Ref = useRef()
  const code2Ref = useRef()
  const code3Ref = useRef()
  const code4Ref = useRef()
  const code5Ref = useRef()
  const dispatch = useDispatch()
  const [isError, setIsError] = useState(false)

  const handleNextPress = () => {
    const prepCode = codeLetter1 + codeLetter2 + codeLetter3 + codeLetter4 + codeLetter5
    dispatch(setAuthData({ codeFromFriend: prepCode }))
    navigate(SCREEN_NAMES.AuthSocialNetworkScreen)
  }

  const handleSkipPress = () => {
    navigate(SCREEN_NAMES.AuthSocialNetworkScreen)
  }

  useEffect(() => {
    code1Ref?.current?.focus()
  }, [])

  return {
    codeLetter1,
    code1Ref,
    setCodeLetter1,
    codeLetter2,
    code2Ref,
    setCodeLetter2,
    codeLetter3,
    code3Ref,
    setCodeLetter3,
    codeLetter4,
    code4Ref,
    setCodeLetter4,
    codeLetter5,
    code5Ref,
    setCodeLetter5,
    focusedTextInput,
    setFocusedTextInput,
    isError,
    handleSkipPress,
    handleNextPress,
  }
}

export default useAuthCodeFromFriend
