import { useEffect, useState } from 'react'
import { getGenderList, navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'

const useAuthGender = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [genderList, setGenderList] = useState([])
  const [selectedGender, setSelectedGender] = useState(userDetails?.gender ?? {})
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const getGenderListData = async () => {
    const res = await getGenderList()
    setGenderList(res)
    setIsLoading(false)
  }

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthPersonalDetailsScreen)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ gender: selectedGender }))
    dispatch(setSignUpProcessStage(3))
    navigate(SCREEN_NAMES.AuthDateOfBirthScreen)
  }

  useEffect(() => {
    getGenderListData()
  }, [])

  useEffect(() => {
    if (selectedGender?.id) {
      setIsBtnDisabled(false)
    }
  }, [selectedGender])

  return {
    isLoading,
    isBtnDisabled,
    genderList,
    selectedGender,
    setSelectedGender,
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthGender
