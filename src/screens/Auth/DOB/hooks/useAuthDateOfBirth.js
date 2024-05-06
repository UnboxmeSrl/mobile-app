import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {navigate} from '../../../../services';

const useAuthDateOfBirth = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(
    userDetails?.birthDate ? new Date(userDetails?.birthDate) : null,
  );

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthGenderScreen);
  };

  const handleNextPress = () => {
    // const prepDate = `${selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate()}-${
    //   selectedDate.getMonth() + 1 < 10 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
    // }-${selectedDate.getFullYear()}`
    dispatch(setAuthData({birthDate: selectedDate.toISOString()}));
    dispatch(setSignUpProcessStage(4));
    navigate(SCREEN_NAMES.AuthNationalityScreen);
  };

  useEffect(() => {
    if (selectedDate) {
      setIsBtnDisabled(false);
    }
  }, [selectedDate]);

  return {
    isBtnDisabled,
    isDatePickerOpen,
    setIsDatePickerOpen,
    // date,
    selectedDate,
    setSelectedDate,
    handleBackPress,
    handleNextPress,
  };
};

export default useAuthDateOfBirth;
