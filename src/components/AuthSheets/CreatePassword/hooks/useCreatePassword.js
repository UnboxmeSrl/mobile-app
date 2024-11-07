import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {REGEX, SCREEN_NAMES} from '../../../../constants';
import {
  setAuthData,
  setIsSignUpProcessStarted,
  setSignUpProcessStage,
} from '../../../../redux';
import {getOtp, navigate} from '../../../../services';

const useCreatePassword = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [error, setError] = useState({});
  const validateEmail = async () => {
    if (email && REGEX.emailRegExp.test(email)) {
      const data = {
        email,
      };
      setError({});
      dispatch(setAuthData({email}));
      const res = await getOtp(data);
      // console.log('getOtp Response', res);
      if (res?.success) {
        return true;
      } else {
        const errorObj = res;
        setError(errorObj);
        return false;
      }
    } else {
      const errorObj = {
        message: 'Please enter valid email address.',
      };
      setError(errorObj);
      return false;
    }
  };
  const handleCreatePasswordPress = async () => {
    if (!REGEX.passwordRegExp.test(password)) {
      const errorObj = {
        message:
          'Password must contain at least one character & must be minimum 8 characters long. ',
      };
      setError(errorObj);
      return false;
    } else if (password !== confirmPassword) {
      const errorObj = {
        message: 'Password & confirm password must be same.',
      };
      setError(errorObj);
      return false;
    } else {
      const emailRes = await validateEmail();
      if (!emailRes) {
        return false;
      }
      dispatch(setAuthData({email, password}));
      dispatch(setIsSignUpProcessStarted(true));
      dispatch(setSignUpProcessStage(1));
      navigate(SCREEN_NAMES.AuthPersonalDetailsScreen);
      setError({});
      return true;
    }
  };

  // useEffect(() => {
  //   if (error?.message) {
  //     setIsBtnDisabled(true);
  //   } else {
  //     setIsBtnDisabled(false);
  //   }
  // }, [error?.message, confirmPassword]);

  return {
    isBtnDisabled,
    password,
    setPassword,
    confirmPassword,
    error,
    email,
    setEmail,
    setConfirmPassword,
    handleCreatePasswordPress,
  };
};

export default useCreatePassword;
