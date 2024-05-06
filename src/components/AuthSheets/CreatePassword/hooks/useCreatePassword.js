import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {REGEX, SCREEN_NAMES} from '../../../../constants';
import {
  setAuthData,
  setIsSignUpProcessStarted,
  setSignUpProcessStage,
} from '../../../../redux';
import {navigate} from '../../../../services';

const useCreatePassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [error, setError] = useState({});

  const handleCreatePasswordPress = ref => {
    if (!REGEX.passwordRegExp.test(password)) {
      const errorObj = {
        message:
          'Password must contain at least one character & must be minimum 8 characters long. ',
      };
      setError(errorObj);
    } else if (password !== confirmPassword) {
      const errorObj = {
        message: 'Password & confirm password must be same.',
      };
      setError(errorObj);
    } else {
      dispatch(setAuthData({password}));
      dispatch(setIsSignUpProcessStarted(true));
      dispatch(setSignUpProcessStage(1));
      navigate(SCREEN_NAMES.AuthPersonalDetailsScreen);
      setError({});
      ref?.current?.close();
    }
  };

  // useEffect(() => {
  //   if (error?.message) {
  //     setIsBtnDisabled(false)
  //   } else {
  //     setIsBtnDisabled(true)
  //   }
  // }, [confirmPassword])

  return {
    isBtnDisabled,
    password,
    setPassword,
    confirmPassword,
    error,
    setConfirmPassword,
    handleCreatePasswordPress,
  };
};

export default useCreatePassword;
