import {useRef, useState} from 'react';
import {forgotPassword} from '../../../../services';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../../constants';

const useEmailSent = () => {
  // const emailSentRef = useRef();
  const navigation = useNavigation();
  const handleGoBack = async emailSentRef => {
    emailSentRef.current.close();
    navigation.navigate(SCREEN_NAMES.SignUpNew);
  };

  return {
    handleGoBack,
  };
};

export default useEmailSent;
