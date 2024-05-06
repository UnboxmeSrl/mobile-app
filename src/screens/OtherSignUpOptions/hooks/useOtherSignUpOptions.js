import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {MAIN_NAVIGATOR, MODAL_NAMES} from '../../../constants';
import {navigate} from '../../../services';

const useOtherSignUpOptions = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const createPasswordRef = useRef();

  const navigateToEmailModal = () => {
    ref?.current?.open();
    // navigate(MODAL_NAMES.SignUpEmail)
  };

  const closeSignUpSheet = () => {
    ref?.current?.close();
    openCreatePasswordSheet();
  };

  const openCreatePasswordSheet = () => {
    ref?.current?.close();
    createPasswordRef?.current?.open();
  };

  const onSuccess = () => {
    navigation.reset({index: 0, routes: [{name: MAIN_NAVIGATOR}]});
  };

  return {
    ref,
    createPasswordRef,
    closeSignUpSheet,
    navigateToEmailModal,
    onSuccess,
    navigation,
  };
};

export default useOtherSignUpOptions;
