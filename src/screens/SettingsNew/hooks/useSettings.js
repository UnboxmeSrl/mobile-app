import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {getBuildNumber, getVersion} from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {
  persistor,
  resetContentSlice,
  resetLogin,
  resetRestaurantSlice,
  setCity,
} from '../../../redux';
import {deleteUserAccount, showToastSuccess} from '../../../services';

const useSettings = () => {
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authSlice.loginData);
  const version = getVersion();
  const buildNumber = getBuildNumber();
  const dispatch = useDispatch();
  const versionName = `${version} (${buildNumber})`;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = async () => {
    try {
      setIsLoading(true);
      await persistor.purge();
      dispatch(resetRestaurantSlice());
      dispatch(resetContentSlice());
      // dispatch(resetServiceSlice())
      setIsLoading(false);
      //TODO: Change this when your navigation is completed
      navigation.reset({index: 0, routes: [{name: SCREEN_NAMES.SignUpNew}]});
      dispatch(resetLogin());
      dispatch(setCity({}));
      // store.dispatch({
      //   type: 'RESET_STATE',
      // })

      showToastSuccess("You've been logged out");
    } catch (error) {}
  };

  const handleLogout = useCallback(async () => {
    Alert.alert('Confirmation', 'Are you sure you want to log out?', [
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          logout();
        },
        text: 'Logout',
      },
    ]);
  }, [logout]);

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          onPress: () => {},
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: async () => {
            setIsDeleting(true);
            const prepUrl = `/${loginData?.id}`;
            const res = await deleteUserAccount(prepUrl);
            //TODO: Enable below if you need in future (satyam)
            // reset(MAIN_NAVIGATOR)
            dispatch(resetLogin());
            dispatch(setCity({}));
            await persistor.purge();
            showToastSuccess(res);
            setIsDeleting(false);
          },
          text: 'Delete',
        },
      ],
    );
  };

  return {
    versionName,
    isDeleting,
    isLoading,
    handleLogout,
    handleDeleteAccount,
  };
};

export default useSettings;
