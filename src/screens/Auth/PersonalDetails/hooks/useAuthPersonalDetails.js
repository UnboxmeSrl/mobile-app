import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {navigate} from '../../../../services';

const useAuthPersonalDetails = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [name, setName] = useState(userDetails?.name ?? '');
  const [surname, setSurname] = useState(userDetails?.surname ?? '');
  const [nickName, setNickName] = useState(userDetails?.nickName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(
    userDetails?.phoneNumber ?? '',
  );
  const [isFocused, setIsFocused] = useState();
  const [country, setCountry] = useState(userDetails?.country ?? {});
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const onSelect = country => {
    console.log('country selected', country);
    setCountry(country);
  };

  const handleNextPress = () => {
    // const phonWithCountryCode = `+${country?.callingCode?.[0]}${phoneNumber}`

    dispatch(
      setAuthData({
        name: name.trim(),
        surname: surname.trim(),
        nickName: nickName.trim(),
        country: country,
        phoneNumber: phoneNumber.trim(),
      }),
    );
    dispatch(setSignUpProcessStage(2));
    navigate(SCREEN_NAMES.AuthGenderScreen);
  };

  useEffect(() => {
    if (name && surname && nickName && phoneNumber && country?.name) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [name, surname, nickName, phoneNumber, country]);

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
  };
};

export default useAuthPersonalDetails;
