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
import {mixpanel} from '../../../App';
import analytics from '@react-native-firebase/analytics';
import {getFormattedDate, getFormattedTime} from '../../../utils';
import messaging from '@react-native-firebase/messaging';

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
    await saveUserDeviceInfo(prepData);
  };

  const userAnalysis = async () => {
    if (loginData?.id) {
      mixpanel.track('App Opened', {
        'User Id': loginData?.id,
        'App open date and time': new Date().toString(),
        'App open date': getFormattedDate(new Date()),
        'App open time': getFormattedTime(new Date()),
      });

      await analytics().logEvent('app_opened', {
        userId: loginData?.id,
        appOpenDateAndTime: new Date().toString(),
        appOpenDate: getFormattedDate(new Date()),
        appOpenTime: getFormattedTime(new Date()),
      });
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
          navigation.replace(SCREEN_NAMES.OnboardingNew);
        } else if (isAuthenticated && isApplied) {
          navigation.replace(SCREEN_NAMES.AppliedScreen);
        } else if (isAuthenticated && isFirstLogin && approvedUser) {
          navigation.replace(SCREEN_NAMES.LoginOnboarding);
        } else if (isAuthenticated && approvedUser) {
          navigation.replace(STACK_NAMES.BottomStack);
        } else if (rejectedUser && isAuthenticated) {
          navigation.replace(SCREEN_NAMES.RejectedScreen);
        } else if (isSignUpProcessStarted) {
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

  useEffect(() => {
    userAnalysis();
  }, []);

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

  // TODO: We already taking permission for notifications from one signal so below useEffect code is commented

  // useEffect(() => {
  //   // Request Push Notification permission from device.
  //   const requestPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   };
  //   if (!messaging.AuthorizationStatus.AUTHORIZED) {
  //     requestPermission();
  //   }
  // }, []);

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
