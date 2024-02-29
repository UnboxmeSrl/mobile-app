import { useEffect, useState } from 'react'
import { getGenderList, navigate } from '../../../../services'
import { SCREEN_NAMES } from '../../../../constants/navigation'

const useAuthGender = () => {
  const [genderList, setGenderList] = useState([])
  const [selectedGender, setSelectedGender] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const getGenderListData = async () => {
    const res = await getGenderList()
    setGenderList(res)
    setIsLoading(false)
  }

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthDateOfBirthScreen)
  }

  useEffect(() => {
    getGenderListData()
  }, [])

  return {
    isLoading,
    genderList,
    selectedGender,
    setSelectedGender,
    handleNextPress,
  }
}

export default useAuthGender
