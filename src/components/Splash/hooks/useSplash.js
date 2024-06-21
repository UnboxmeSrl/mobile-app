import {useNavigation} from '@react-navigation/native';
import {createRef, useEffect, useState} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsApproved,
  selectIsAuthenticated,
  selectIsPending,
  selectIsRejected,
  selectOnBordingData,
  selectVisitCount,
  setExperienceLevels,
  setSocialActions,
  updateLoginData,
} from '../../../redux';
import {
  getAllActions,
  getExperienceLevels,
  getUserApprovalStatus,
  saveUserDeviceInfo,
} from '../../../services';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

const useSplash = () => {
  const delay = 500;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.authSlice.loginData);
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(true);
  const [isUserApprovalApiCalled, setIsUserApprovalApiCalled] = useState(false);
  // const fadeAnim = useRef(new Animated.Value(1)).current;
  const ref = createRef();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hideOnBoarding = useSelector(selectOnBordingData);
  const isApplied = useSelector(selectIsPending);
  const rejectedUser = useSelector(selectIsRejected);
  const approvedUser = useSelector(selectIsApproved);
  const isFirstLogin = useSelector(selectVisitCount);
  const isSignUpProcessStarted = useSelector(
    state => state.authSlice.isSignUpProcessStarted,
  );
  const signUpProcessStage = useSelector(
    state => state.authSlice.signUpProcessStage,
  );

  /* const authData = useSelector((state) => state.authSlice.authData) */
  console.log(
    'isAuthenticated',
    isAuthenticated,
    hideOnBoarding,
    isApplied,
    rejectedUser,
    approvedUser,
    isSignUpProcessStarted,
    signUpProcessStage,
  );

  console.log('isFirstVisit', isFirstLogin);

  const getUserApprovalStatusData = async () => {
    if (loginData?.id) {
      const userId = `/${loginData?.id}`;
      const res = await getUserApprovalStatus(userId);
      dispatch(updateLoginData(res));
      setTimeout(() => {
        setIsUserApprovalApiCalled(true);
      }, 1000);
    } else {
      setIsUserApprovalApiCalled(true);
    }
  };

  const getExperienceLevelsData = async () => {
    const res = await getExperienceLevels();
    if (res?.length > 0) {
      dispatch(setExperienceLevels(res));
    }
  };

  const getAllSocialActions = async () => {
    const res = await getAllActions();
    dispatch(setSocialActions(res));
  };

  const saveUserDeviceInfoData = async () => {
    const prepData = {
      user_turbo_id: loginData?.id,
      os: Platform.OS,
      os_version: DeviceInfo.getSystemVersion(),
      app_version: DeviceInfo.getVersion(),
      version_code: DeviceInfo.getBuildNumber(),
      device_brand_name: DeviceInfo.getBrand(),
      device_model_name: DeviceInfo.getModel(),
    };
    const res = await saveUserDeviceInfo(prepData);

    if (res?.id) {
      console.log('Data saved successfully');
    } else {
      console.log('Data not saved because some issue.');
    }
  };

  useEffect(() => {
    if (__DEV__) {
      return;
    } else if (loginData?.id) {
      saveUserDeviceInfoData();
    }
  }, []);

  useEffect(() => {
    getUserApprovalStatusData();
    getExperienceLevelsData();
  }, []);

  useEffect(() => {
    getAllSocialActions();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    if (isUserApprovalApiCalled) {
      setTimeout(() => {
        if (!hideOnBoarding) {
          console.log('hideOnBoarding');
          navigation.replace(SCREEN_NAMES.OnboardingNew);
        } else if (isAuthenticated && isApplied) {
          console.log('isApplied');
          navigation.replace(SCREEN_NAMES.AppliedScreen);
        } else if (isAuthenticated && isFirstLogin && approvedUser) {
          console.log('isFirstLogin');
          navigation.replace(SCREEN_NAMES.LoginOnboarding);
        } else if (isAuthenticated && approvedUser) {
          console.log('approvedUser');
          navigation.replace(STACK_NAMES.BottomStack);
        } else if (rejectedUser && isAuthenticated) {
          console.log('rejectedUser');
          navigation.replace(SCREEN_NAMES.RejectedScreen);
        } else if (isSignUpProcessStarted) {
          console.log('isSignUpProcessStarted');
          // checkSignUpProgress(signUpProcessStage);
          navigation.replace(SCREEN_NAMES.SignUpNew);
        } else {
          navigation.replace(SCREEN_NAMES.SignUpNew);
        }
      }, 100);
    }
  }, [
    isUserApprovalApiCalled,
    hideOnBoarding,
    isAuthenticated,
    isApplied,
    approvedUser,
    isSignUpProcessStarted,
    signUpProcessStage,
    isFirstLogin,
    rejectedUser,
  ]);

  useEffect(() => {
    setTimeout(() => {
      // SplashScreen.hide();
      ref?.current?.play(0, 120);
      setTimeout(() => {
        setFadeOut(true);
      }, delay);
    }, 0);
  }, [ref]);

  // useEffect(() => {
  //   if (fadeOut) {
  //     Animated.timing(fadeAnim, {
  //       duration: 500,
  //       toValue: 0,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       setShow(false);
  //     });
  //   }
  // }, [fadeOut, fadeAnim]);

  if (!show) {
    return null;
  }

  return {
    navigation,
    dispatch,
    loginData,
    show,
    setShow,
    isUserApprovalApiCalled,
    setIsUserApprovalApiCalled,
    ref,
    isAuthenticated,
    hideOnBoarding,
    isApplied,
    rejectedUser,
    approvedUser,
    isFirstLogin,
    isSignUpProcessStarted,
    signUpProcessStage,
  };
};

export default useSplash;
