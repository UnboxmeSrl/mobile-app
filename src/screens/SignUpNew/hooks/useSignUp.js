import {useCallback, useEffect, useRef} from 'react';
import {MODAL_NAMES, SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import {navigate} from '../../../services';
import {checkSignUpProgress} from '../../../utils';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const useSignUp = () => {
  const isSignUpProcessStarted = useSelector(
    state => state.authSlice.isSignUpProcessStarted,
  );
  const signUpProcessStage = useSelector(
    state => state.authSlice.signUpProcessStage,
  );
  const route = useRoute();
  const {navigate} = useNavigation();
  const bottomSheetRef = useRef();
  const isFromBookRedirected = route.params?.isFromBookRedirected;

  const handleSignInPress = () => {
    navigate(SCREEN_NAMES.SignIn);
  };

  const handleCreateAnAccountPress = () => {
    navigate(SCREEN_NAMES.OtherSignUp);
  };

  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack);
  };

  const navigateToEmailModal = () => {
    bottomSheetRef?.current?.open();
    // ✅ ✅ ✅ ✅ Updated this but this code is for future reference
    // navigate({
    //   params: {
    //     isFromBookRedirected: isFromBookRedirected,
    //   },
    //   routeName: MODAL_NAMES.SignInEmail,
    // })
  };

  const navigateToWebview = useCallback(
    uri => {
      navigate(MODAL_NAMES.WebView, {uri});
    },
    [navigate],
  );
  const navigateToTerms = () =>
    navigateToWebview('https://www.joinclaris.com/terms-of-service/');
  const navigateToPrivacy = () =>
    navigateToWebview(' https://www.joinclaris.com/privacy-policy');

  useEffect(() => {
    if (isSignUpProcessStarted) {
      checkSignUpProgress(signUpProcessStage);
    }
  }, []);

  return {
    bottomSheetRef,
    isFromBookRedirected,
    navigateToWebview,
    navigateToEmailModal,
    handleCreateAnAccountPress,
    handleGuestPress,
    handleSignInPress,
  };
};

export default useSignUp;
