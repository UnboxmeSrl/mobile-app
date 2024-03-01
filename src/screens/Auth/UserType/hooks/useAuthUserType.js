import { useEffect, useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../../../redux/slices'

const useAuthUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const userTypeList = [
    {
      id: 7,
      name: 'Model',
    },
    {
      id: 8,
      name: 'Influencer',
    },
    {
      id: 3,
      name: 'Both',
      data: [7, 8],
    },
  ]

  const handleNextPress = () => {
    dispatch(setAuthData({ userType: selectedUserType }))
    navigate(SCREEN_NAMES.AuthInterestTopicsScreen)
  }

  useEffect(() => {
    if (selectedUserType?.name) {
      setIsBtnDisabled(false)
    }
  }, [selectedUserType])

  return {
    isBtnDisabled,
    userTypeList,
    selectedUserType,
    setSelectedUserType,
    handleNextPress,
  }
}

export default useAuthUserType
