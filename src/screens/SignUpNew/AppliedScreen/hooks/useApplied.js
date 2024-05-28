import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES, STACK_NAMES} from '../../../../constants';
import {updateLoginData} from '../../../../redux';
import {getUserApprovalStatus, navigate} from '../../../../services';
import {Linking} from 'react-native';

const useApplied = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.authSlice.loginData);

  const handleGuestPress = () => {
    navigate(STACK_NAMES.BottomStack);
  };

  const getUserApprovalStatusData = useCallback(async () => {
    const userId = `/${loginData?.id}`;
    const res = await getUserApprovalStatus(userId);
    dispatch(updateLoginData(res));
  }, [dispatch, loginData?.id]);

  const handleFollowPress = () => {
    Linking.openURL('https://www.instagram.com/claris.app/');
  };

  const handleTutorialPress = () => {
    navigation.navigate(SCREEN_NAMES.TutorialsScreen);
  };

  useEffect(() => {
    if (
      loginData &&
      (loginData?.UserStatus === '' || loginData?.UserStatus === 'onapproval')
    ) {
      const timeout = setTimeout(() => {
        getUserApprovalStatusData();
        // will call after every 10 Seconds
      }, 10000);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    } else if (loginData?.UserStatus === 'approved') {
      navigation.replace(SCREEN_NAMES.LoginOnboarding);
    }
  }, [loginData]);

  return {
    handleGuestPress,
    handleFollowPress,
    handleTutorialPress,
  };
};

export default useApplied;
