import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {REGEX} from '../../../../constants';
import {setAuthData} from '../../../../redux';
import {
  getOtp,
  showToastError,
  showToastSuccess,
  verifyOtp,
} from '../../../../services';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

const useSignUpWithEmail = closeSignUpSheet => {
  const [email, setEmail] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [isSendPress, setIsSendPress] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const createPasswordRef = useRef();
  const [error, setError] = useState({});

  useEffect(() => {
    setError(err => {
      if (err?.message) return {};
      return err;
    });
  }, [email]);

  const handleSignUpPress = async () => {
    if (email && REGEX.emailRegExp.test(email)) {
      const data = {
        email,
      };
      setError({});
      dispatch(setAuthData({email}));
      const res = await getOtp(data);
      console.log('getOtp Response', res);
      if (res?.success) {
        setIsSendPress(true);
        showToastSuccess("We've sent you a verification code.");
        // Alert.alert("We've sent you a verification code.");
        // Toast.show({
        //   text1: "We've sent you a verification code.",
        //   type: 'error',
        // });
      } else {
        const errorObj = res;
        setError(errorObj);
      }
    } else {
      const errorObj = {
        message: 'Please enter valid email address.',
      };
      setError(errorObj);
    }
  };
  const handleReset = () => {
    setIsSendPress(false);
    setVerificationCode('');
    setEmail('');
  };
  const handleSignUpPressAfterCodeSend = async () => {
    const body = {
      code: verificationCode,
      email,
      // code: '1234',
    };
    const res = await verifyOtp(body);
    if (res.success) {
      closeSignUpSheet();
    } else {
      showToastError(res);
    }
  };

  useEffect(() => {
    if (email?.length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email]);

  return {
    email,
    setEmail,
    error,
    verificationCode,
    setVerificationCode,
    setIsSendPress,
    isBtnDisabled,
    isSendPress,
    createPasswordRef,
    handleSignUpPress,
    handleSignUpPressAfterCodeSend,
    handleReset,
  };
};

export default useSignUpWithEmail;
