import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuthData, resetLogin, setAuthData, setIsApplied, setLoginData } from '../../../../redux/slices'
import { navigate, reset, userSignUp } from '@services'
import { MAIN_NAVIGATOR } from '@const/navigation'
import { showToastError } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { useNavigation } from 'react-navigation-hooks'

const useAuthSocialNetwork = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [tiktokUserName, setTiktokUserName] = useState()
  const [instaUserName, setInstaUserName] = useState()
  const tiktokSheetRef = useRef()
  const instaSheetRef = useRef()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)

  const formData = new FormData()
  const navigation = useNavigation()

  const handleOnTikTokPress = () => {
    tiktokSheetRef?.current?.open()
  }

  const handleOnInstaPress = () => {
    instaSheetRef?.current?.open()
  }

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthCodeFromFriendScreen)
  }

  const handleNextPress = async () => {
    dispatch(setAuthData({ tiktokUserName, instaUserName }))

    // User Type (Model, Influencer, Both)
    const isBothUserType = userDetails?.userType?.data ? true : false

    // Phone Number
    const phonWithCountryCode = `+${userDetails?.country?.callingCode?.[0]}${userDetails?.phoneNumber}`

    // Gender
    const genderId = userDetails?.gender?.id

    // DOB (Birth Date)
    const selectedDate = new Date(userDetails?.birthDate)
    const birthDate = `${selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate()}-${
      selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
    }-${selectedDate.getFullYear()}`

    // Nationality
    const nationality = userDetails?.nationality?.name

    formData.append('email', userDetails?.email)
    formData.append('password', userDetails?.password)
    formData.append('name', userDetails?.name)
    formData.append('surname', userDetails?.surname)
    formData.append('NickName', userDetails?.nickName)
    formData.append('Phonenumber', phonWithCountryCode)
    formData.append('gender_list_id', genderId)
    formData.append('Birthday', birthDate)
    formData.append('nationality', nationality)
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
    // console.log('🚀 ~ handleNextPress ~ res:', res.data)

    if (res?.status === 200 || res?.id) {
      console.log('🟩 Success Data', JSON.stringify(res))
      dispatch(resetAuthData({}))
      dispatch(resetLogin())
      // reset(MAIN_NAVIGATOR)
      // dispatch(setIsApplied(true))
      navigate(SCREEN_NAMES.AppliedScreen)
    } else {
      showToastError(res?.data)
    }
  }

  // navigate(SCREEN_NAMES.AuthInterestTopicsScreen)


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
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthSocialNetwork
