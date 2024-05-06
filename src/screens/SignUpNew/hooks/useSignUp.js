import {useEffect} from 'react';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import {navigate} from '../../../services';
import {checkSignUpProgress} from '../../../utils';
import {useSelector} from 'react-redux';

const useSignUp = () => {
  const isSignUpProcessStarted = useSelector(
    state => state.authSlice.isSignUpProcessStarted,
  );
  const signUpProcessStage = useSelector(
    state => state.authSlice.signUpProcessStage,
  );
  const handleSignInPress = () => {
    navigate(SCREEN_NAMES.SignIn);
  };

  const handleCreateAnAccountPress = () => {
    navigate(SCREEN_NAMES.OtherSignUp);
  };

  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack);
  };

  useEffect(() => {
    if (isSignUpProcessStarted) {
      checkSignUpProgress(signUpProcessStage);
    }
  }, []);

  return {
    handleCreateAnAccountPress,
    handleGuestPress,
    handleSignInPress,
  };
};

export default useSignUp;
