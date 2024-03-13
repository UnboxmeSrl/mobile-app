import { useState, useEffect } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { setAuthData, setSignUpProcessStage } from '../../../../redux/slices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'

const useAuthDateOfBirth = () => {
  const userDetails = useSelector((state) => state.authSlice.authData)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date(userDetails?.birthDate) ?? '')

  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthGenderScreen)
  }

  const handleNextPress = () => {
    // const prepDate = `${selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate()}-${
    //   selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
    // }-${selectedDate.getFullYear()}`
    dispatch(setAuthData({ birthDate: selectedDate }))
    dispatch(setSignUpProcessStage(4))
    navigate(SCREEN_NAMES.AuthNationalityScreen)
  }

  useEffect(() => {
    if (selectedDate) {
      setIsBtnDisabled(false)
    }
  }, [selectedDate])

  return {
    isBtnDisabled,
    isDatePickerOpen,
    setIsDatePickerOpen,
    date,
    selectedDate,
    setSelectedDate,
    handleBackPress,
    handleNextPress,
  }
}

export default useAuthDateOfBirth
