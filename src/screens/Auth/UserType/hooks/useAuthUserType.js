import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../../constants';
import {setAuthData, setSignUpProcessStage} from '../../../../redux';
import {navigate} from '../../../../services';

const useAuthUserType = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [selectedUserType, setSelectedUserType] = useState(
    userDetails?.userType ?? {},
  );
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
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
  ];
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthAgencyScreen);
  };

  const handleNextPress = () => {
    dispatch(setAuthData({userType: selectedUserType}));
    dispatch(setSignUpProcessStage(8));
    navigate(SCREEN_NAMES.AuthInterestTopicsScreen);
  };

  useEffect(() => {
    if (selectedUserType?.name) {
      setIsBtnDisabled(false);
    }
  }, [selectedUserType]);

  return {
    isBtnDisabled,
    userTypeList,
    selectedUserType,
    setSelectedUserType,
    handleBackPress,
    handleNextPress,
  };
};

export default useAuthUserType;
