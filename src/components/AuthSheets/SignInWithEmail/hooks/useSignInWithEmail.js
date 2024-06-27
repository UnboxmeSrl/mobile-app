import {useEffect, useRef, useState} from 'react';
// import OneSignal from 'react-native-onesignal'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES, STACK_NAMES} from '../../../../constants';
import {
  selectVisitCount,
  setBookings,
  setCity,
  setLoginData,
  setOnboardingData,
} from '../../../../redux';
import {getBookings, userLogin} from '../../../../services';
import {OneSignal} from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {mixpanel} from '../../../../App';
import analytics from '@react-native-firebase/analytics';

const useSignInWithEmail = isFromBookRedirected => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isFirstLogin = useSelector(selectVisitCount);
  const navigation = useNavigation();
  const serviceDetails = useSelector(
    state => state.restaurantSlice.serviceDetails,
  );
  const dispatch = useDispatch();
  const forgotPasswordRef = useRef();

  const handleLoginPress = async ref => {
    // navigation.navigate(SCREEN_NAMES.AuthPersonalDetailsScreen)
    try {
      setLoading(true);
      const prepData = {
        email,
        password,
        os: Platform.OS,
        os_version: DeviceInfo.getSystemVersion(),
        app_version: DeviceInfo.getVersion(),
        version_code: DeviceInfo.getBuildNumber(),
        device_brand_name: DeviceInfo.getBrand(),
        device_model_name: DeviceInfo.getModel(),
      };
      console.log('PRep Data:', prepData);
      const res = await userLogin(prepData);
      console.log(res, 'res');
      setLoading(false);
      dispatch(setCity({}));
      if (res?.UserStatus === 'approved') {
        console.log('Login res:', res);
        OneSignal.login(res?.id?.toString());
        dispatch(setLoginData(res));
        await mixpanel.identify(res?.id?.toString());
        mixpanel.getPeople().set('$name', res?.name);
        mixpanel.getPeople().set('$email', res?.email);

        await analytics().setUserId(res?.id.toString());
        await analytics().setUserProperties({
          name: res?.name,
          email: res?.email,
        });
        const params = `/${res?.id}`;
        const bookingRes = await getBookings(params);
        dispatch(setBookings(bookingRes));

        // console.log('isFirstTimeLogin', isFirstTimeLogin)
        if (isFirstLogin) {
          // dispatch(setIsFirstTimeLogin(false))
          navigation.replace(SCREEN_NAMES.LoginOnboarding);
        } else if (serviceDetails?.id && isFromBookRedirected) {
          navigation.replace(SCREEN_NAMES.ServiceDetails, {
            isFromBookRedirected: isFromBookRedirected,
          });
        } else {
          navigation.replace(STACK_NAMES.BottomStack);
        }
        ref?.current?.close();
      } else if (res?.UserStatus === '' || res?.UserStatus === 'onapproval') {
        dispatch(setOnboardingData(true));
        navigation.replace(SCREEN_NAMES.AppliedScreen);
        ref?.current?.close();
      } else if (res?.UserStatus === 'rejected') {
        dispatch(setOnboardingData(true));
        navigation.navigate(SCREEN_NAMES.RejectedScreen);
        ref?.current?.close();
      } else {
        setIsError(true);
      }
    } catch (err) {
      setLoading(false);
      setIsError(true);
    }
  };
  const navigateToForgotPasswordModal = bottomSheetRef => {
    // bottomSheetRef?.current?.close();
    forgotPasswordRef?.current?.open();
  };

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [email, password]);

  return {
    email,
    handleLoginPress,
    forgotPasswordRef,
    navigateToForgotPasswordModal,
    isError,
    loading,
    password,
    setEmail,
    setPassword,
  };
};

export default useSignInWithEmail;
