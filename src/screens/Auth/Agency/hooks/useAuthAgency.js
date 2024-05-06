import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {navigate} from '../../../../services';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {useNavigation} from '@react-navigation/native';

const useAuthAgency = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [selectedValue, setSelectedValue] = useState(
    userDetails?.agencyData?.freelance ? 1 : 2,
  );
  const [agencyName, setAgencyName] = useState(
    userDetails?.agencyData?.hasAgency ?? '',
  );
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthCityScreen);
  };

  const handleNextPress = () => {
    const prepData =
      selectedValue == 1
        ? {hasAgency: '', freelance: true}
        : {hasAgency: agencyName, freelance: false};
    dispatch(setAuthData({agencyData: prepData}));
    dispatch(setSignUpProcessStage(7));
    navigate(SCREEN_NAMES.AuthUserTypeScreen);
  };

  useEffect(() => {
    if (
      selectedValue === 1 ||
      (agencyName?.length > 0 && selectedValue === 2)
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [selectedValue, agencyName]);

  return {
    isBtnDisabled,
    selectedValue,
    setSelectedValue,
    agencyName,
    setAgencyName,
    handleBackPress,
    handleNextPress,
  };
};

export default useAuthAgency;
