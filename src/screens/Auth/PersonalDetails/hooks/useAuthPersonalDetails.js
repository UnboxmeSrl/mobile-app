import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {getGenderList, navigate} from '../../../../services';

const useAuthPersonalDetails = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [name, setName] = useState(userDetails?.name ?? '');
  const [surname, setSurname] = useState(userDetails?.surname ?? '');
  const [nickName, setNickName] = useState(userDetails?.nickName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(
    userDetails?.phoneNumber ?? '',
  );
  const [genderList, setGenderList] = useState([]);
  const [city, setCity] = useState(userDetails?.city ?? '');
  const [selectedGender, setSelectedGender] = useState(
    userDetails?.gender ?? {},
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    userDetails?.birthDate ? new Date(userDetails?.birthDate) : null,
  );
  const [isFocused, setIsFocused] = useState();
  const [nationality, setNationality] = useState(
    userDetails?.nationality ?? {},
  );
  const [country, setCountry] = useState(userDetails?.country ?? {});
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const onSelect = country => {
    setCountry(country);
  };
  // console.log('selectedGender', selectedGender);
  const getGenderListData = async () => {
    const res = await getGenderList();
    setGenderList(res);
  };
  useEffect(() => {
    getGenderListData();
  }, []);
  const onSelectNationality = country => {
    setNationality(country);
    setCountry(country);
  };
  const handleNextPress = () => {
    dispatch(
      setAuthData({
        name: name.trim(),
        surname: surname.trim(),
        nickName: nickName.trim(),
        country: country,
        phoneNumber: phoneNumber.trim(),
        birthDate: selectedDate.toISOString(),
        city: city.trim(),
        nationality,
        gender: selectedGender,
      }),
    );
    dispatch(setSignUpProcessStage(2));
    navigate(SCREEN_NAMES.AuthProfilePictureScreen);
  };

  useEffect(() => {
    if (
      name &&
      surname &&
      nickName &&
      phoneNumber &&
      country?.name &&
      city &&
      selectedDate &&
      nationality?.name &&
      selectedGender?.id
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [
    name,
    surname,
    nickName,
    phoneNumber,
    country,
    city,
    selectedDate,
    nationality,
    selectedGender,
  ]);

  return {
    isBtnDisabled,
    name,
    setName,
    surname,
    setSurname,
    nickName,
    setNickName,
    phoneNumber,
    setPhoneNumber,
    isFocused,
    setIsFocused,
    country,
    onSelect,
    handleNextPress,
    setIsDatePickerOpen,
    isDatePickerOpen,
    selectedDate,
    setSelectedDate,
    setCity,
    city,
    onSelectNationality,
    nationality,
    genderList,
    selectedGender,
    setSelectedGender,
  };
};

export default useAuthPersonalDetails;
