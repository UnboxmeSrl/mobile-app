import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData, setIsApplied, setLoginData } from '../../../../redux/slices'
import { navigate, reset, userSignUp } from '@services'
import { MAIN_NAVIGATOR } from '@const/navigation'
import { showToastError } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'

const useAuthSocialNetwork = () => {
  const [tiktokUserName, setTiktokUserName] = useState()
  const [instaUserName, setInstaUserName] = useState()
  const tiktokSheetRef = useRef()
  const instaSheetRef = useRef()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const userDetails = useSelector((state) => state.authSlice.authData)
  const formData = new FormData()

  const handleOnTikTokPress = () => {
    tiktokSheetRef?.current?.open()
  }

  const handleOnInstaPress = () => {
    instaSheetRef?.current?.open()
  }

  const handleNextPress = async () => {
    dispatch(setAuthData({ tiktokUserName, instaUserName }))

    const isBothUserType = userDetails?.userType?.data ? true : false

    formData.append('email', userDetails?.email)
    formData.append('password', userDetails?.password)
    formData.append('name', userDetails?.name)
    formData.append('surname', userDetails?.surname)
    formData.append('NickName', userDetails?.nickName)
    formData.append('Phonenumber', userDetails?.phoneNumber)
    formData.append('gender_list_id', userDetails?.gender)
    formData.append('Birthday', userDetails?.birthDate)
    formData.append('nationality', userDetails?.nationality)
    formData.append('City', userDetails?.city)
    formData.append('Agency', userDetails?.agencyData?.hasAgency)
    formData.append('Freelance', userDetails?.agencyData?.freelance)
    // formData.append('Profile_pic', userDetails?.profilePictures?.[0])
    formData.append('Tiktok_account', userDetails?.tiktokUserName)
    formData.append('TikTok', userDetails?.tiktokUserName ? 'true' : 'false')
    formData.append('IG_account', userDetails?.instaUserName)
    formData.append('IG', userDetails?.instaUserName ? 'true' : 'false')
    formData.append('telegram_id', 0)
    isBothUserType
      ? userDetails?.userType?.data?.map((item) => formData.append('usertype_id[]', item))
      : formData.append('usertype_id[]', userDetails?.userType?.id)

    userDetails?.userInterests?.map((item) => formData.append('user_interest_topics_turbo_id[]', item?.id))

    //  formData.append('money_give', parseFloat(add))
    //  formData.append('money_request', parseFloat(ask))
    //  if (selectedSneakers?.length > 0) {
    //    selectedSneakers?.map((item) => formData.append('id_closet_to[]', item?.id))
    //  }
    //  if (myOfferedList?.length > 0) {
    //    myOfferedList?.map((item) => formData.append('id_closet_from[]', item?.id))
    //  }

    // console.log('🟩 Form Data', JSON.stringify(formData))
    const res = await userSignUp(formData)
    console.log('🚀 ~ handleNextPress ~ res:', res.data)

    if (res?.status === 200 || res?.id) {
      console.log('🟩 Success Data', JSON.stringify(res))
      dispatch(setLoginData(res))
      // reset(MAIN_NAVIGATOR)
      dispatch(setIsApplied(true))
      navigate(SCREEN_NAMES.AppliedScreen)
    } else {
      showToastError(res?.data)
    }
  }

  // navigate(SCREEN_NAMES.AuthInterestTopicsScreen)

  useEffect(() => {
    if (tiktokUserName && instaUserName) {
      setIsBtnDisabled(false)
    }
  }, [tiktokUserName, instaUserName])

  return {
    isBtnDisabled,
    tiktokUserName,
    setTiktokUserName,
    tiktokSheetRef,
    instaUserName,
    setInstaUserName,
    instaSheetRef,
    handleOnTikTokPress,
    handleOnInstaPress,
    handleNextPress,
  }
}

export default useAuthSocialNetwork
