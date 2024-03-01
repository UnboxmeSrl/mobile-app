import { useState, useEffect } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'
import { setAuthData } from '../../../../redux/slices'
import { useDispatch } from 'react-redux'

const useAuthDateOfBirth = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState()
  const dispatch = useDispatch()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const handleNextPress = () => {
    const prepDate = `${selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate()}/${
      selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`
    dispatch(setAuthData({ birthDate: prepDate }))
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
    handleNextPress,
  }
}

export default useAuthDateOfBirth
