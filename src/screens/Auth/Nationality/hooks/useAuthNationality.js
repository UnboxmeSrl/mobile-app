import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {navigate} from '../../../../services';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {useNavigation} from '@react-navigation/native';

const useAuthNationality = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [country, setCountry] = useState(userDetails?.nationality ?? {});
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const navigation = useNavigation();

  const onSelect = country => {
    setCountry(country);
  };

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthDateOfBirthScreen);
  };

  const handleNextPress = () => {
    dispatch(setAuthData({nationality: country}));
    dispatch(setSignUpProcessStage(5));
    navigate(SCREEN_NAMES.AuthCityScreen);
  };

  useEffect(() => {
    if (country?.name) {
      setIsBtnDisabled(false);
    }
  }, [country]);

  return {
    isBtnDisabled,
    country,
    onSelect,
    handleBackPress,
    handleNextPress,
  };
};

export default useAuthNationality;
