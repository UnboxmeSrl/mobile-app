import { useEffect, useState } from 'react'
import { getGenderList, navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { setAuthData } from '../../../../redux/slices'
import { useDispatch } from 'react-redux'

const useAuthGender = () => {
  const [genderList, setGenderList] = useState([])
  const [selectedGender, setSelectedGender] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const getGenderListData = async () => {
    const res = await getGenderList()
    setGenderList(res)
    setIsLoading(false)
  }

  const handleNextPress = () => {
    dispatch(setAuthData({ gender: selectedGender?.id }))
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
    handleNextPress,
  }
}

export default useAuthGender
