import { useState } from 'react'
import { SCREEN_NAMES } from '../../../../constants/navigation'
import { navigate } from '../../../../services'

const useAuthDateOfBirth = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState()

  const handleNextPress = () => {
    navigate(SCREEN_NAMES.AuthNationalityScreen)
  }

  return {
    isDatePickerOpen,
    setIsDatePickerOpen,
    date,
    selectedDate,
    setSelectedDate,
    handleNextPress,
  }
}

export default useAuthDateOfBirth
