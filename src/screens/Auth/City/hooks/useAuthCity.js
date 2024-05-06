import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {navigate} from '../../../../services';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {useNavigation} from '@react-navigation/native';

const useAuthCity = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [city, setCity] = useState(userDetails?.city ?? '');
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthNationalityScreen);
  };

  const handleNextPress = () => {
    dispatch(setAuthData({city: city}));
    dispatch(setSignUpProcessStage(6));
    navigate(SCREEN_NAMES.AuthAgencyScreen);
  };

  useEffect(() => {
    if (city) {
      setIsBtnDisabled(false);
    }
  }, [city]);

  return {
    isBtnDisabled,
    city,
    setCity,
    handleBackPress,
    handleNextPress,
  };
};

export default useAuthCity;
