import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../assets';
import {COLORS, SCREEN_NAMES, STACK_NAMES} from '../../constants';
import {
  selectIsApproved,
  selectIsAuthenticated,
  selectIsFirstVisit,
  selectIsPending,
  selectIsRejected,
  selectOnBordingData,
  setLoginData,
  setSocialActions,
  updateLoginData,
} from '../../redux';
import {getAllActions, getProfile, getUserApprovalStatus} from '../../services';
import {checkSignUpProgress} from '../../utils';

const delay = 500;

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.authSlice.loginData);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
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
  const firstVisit = useSelector(selectIsFirstVisit);
  const isSignUpProcessStarted = useSelector(
    state => state.authSlice.isSignUpProcessStarted,
  );
  const signUpProcessStage = useSelector(
    state => state.authSlice.signUpProcessStage,
  );

  /* const authData = useSelector((state) => state.authSlice.authData) */
  // console.log(
  //   'isAuthenticated',
  //   isAuthenticated,
  //   hideOnBoarding,
  //   isApplied,
  //   rejectedUser,
  //   approvedUser,
  //   firstVisit,
  //   isSignUpProcessStarted,
  //   signUpProcessStage
  // )

  const getUserApprovalStatusData = async () => {
    const userId = `/${loginData?.id}`;
    const res = await getUserApprovalStatus(userId);
    dispatch(updateLoginData(res));
    setTimeout(() => {
      setIsUserApprovalApiCalled(true);
    }, 1000);
  };

  const getAllSocialActions = async () => {
    const res = await getAllActions();
    dispatch(setSocialActions(res));
  };

  useEffect(() => {
    getUserApprovalStatusData();
  }, []);

  useEffect(() => {
    if (isUserApprovalApiCalled) {
      setTimeout(() => {
        if (!hideOnBoarding) {
          console.log('hideOnBoarding');
          navigation.replace(SCREEN_NAMES.OnboardingNew);
        } else if (isAuthenticated && isApplied) {
          console.log('isApplied');
          navigation.replace(SCREEN_NAMES.AppliedScreen);
        } else if (isAuthenticated && firstVisit && approvedUser) {
          console.log('firstVisit');
          navigation.replace(SCREEN_NAMES.FirstWelcomeScreen);
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
    firstVisit,
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

  useEffect(() => {
    getAllSocialActions();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <View style={styles.mainContainer}>
      <Image
        source={IMAGES.clarisLogo}
        resizeMode="contain"
        style={styles.clarisLogo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  clarisLogo: {
    height: verticalScale(200),
    width: scale(200),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blackRaw,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
