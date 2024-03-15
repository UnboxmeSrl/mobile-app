import { useEffect, useRef, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { checkPermission, openCamera, openGallery } from '../../../../utils'
import { PERMISSIONS } from 'react-native-permissions'
import { Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'
import { useNavigation } from 'react-navigation-hooks'

const useAuthProfilePicture = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [profilePicData, setProfilePicData] = useState(userDetails?.profilePictures ?? [(1, 2, 3, 4)])
  const profilePicUploadRef = useRef()
  const isIos = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const formData = new FormData()
  const androidVersion = Platform.Version
  const [pictureIndex, setPictureIndex] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const navigation = useNavigation()

  const handleProfilePicture = async (index) => {
    setPictureIndex(index)
    profilePicUploadRef.current.open()
  }

  const handlePermission = async (permission) => {
    const res = await checkPermission(permission)
    return res
  }

  const handleCameraPress = async () => {
    const permission = isIos ? PERMISSIONS.IOS.CAMERA : isAndroid && PERMISSIONS.ANDROID.CAMERA
    const isGranted = await handlePermission(permission)
    if (isGranted) {
      const res = await openCamera()
      console.log('test', res?.assets[0])
      if (res?.assets?.length > 0) setProfilePicData(res?.assets[0])
    }
    profilePicUploadRef.current.close()
  }

  const handleGalleryPress = async (pictureIndex = 0) => {
    const permission = isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : isAndroid &&
        (androidVersion > 32 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    const isGranted = await handlePermission(permission)
    if (isGranted) {
      const res = await openGallery({ selectionLimit: 1 })
      console.log('test', pictureIndex, res?.assets[0])
      if (res?.assets?.length > 0) {
        const updatedData = [...profilePicData]
        updatedData[pictureIndex] = res?.assets[0]
        setProfilePicData([...updatedData])
      }
    }
    // profilePicUploadRef.current.close()
  }

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthInterestTopicsScreen)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ profilePictures: profilePicData }))
    dispatch(setSignUpProcessStage(10))
    navigate(SCREEN_NAMES.AuthCodeFromFriendScreen)
  }

  useEffect(() => {
    if (profilePicData?.[0]?.uri) {
      setIsBtnDisabled(false)
    }
  }, [profilePicData])

  return {
    isBtnDisabled,
    profilePicData,
    profilePicUploadRef,
    handleProfilePicture,
    handleCameraPress,
    handleGalleryPress,
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthProfilePicture
