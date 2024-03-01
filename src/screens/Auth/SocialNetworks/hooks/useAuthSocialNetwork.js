import { useRef, useState } from 'react'

const useAuthSocialNetwork = () => {
  const [tiktokUserName, setTiktokUserName] = useState()
  const [instaUserName, setInstaUserName] = useState()

  const tiktokSheetRef = useRef()
  const instaSheetRef = useRef()

  const handleOnTikTokPress = () => {
    tiktokSheetRef?.current?.open()
  }
  const handleOnInstaPress = () => {
    instaSheetRef?.current?.open()
  }

  return {
    tiktokUserName,
    setTiktokUserName,
    tiktokSheetRef,
    instaUserName,
    setInstaUserName,
    instaSheetRef,
    handleOnTikTokPress,
    handleOnInstaPress,
  }
}

export default useAuthSocialNetwork
