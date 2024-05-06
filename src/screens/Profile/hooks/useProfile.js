import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '../../../redux';
import {navigate} from '../../../services';
import {SCREEN_NAMES} from '../../../constants';

const useProfile = () => {
  const user = useSelector(state => state.authSlice.loginData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigateToSettings = () => {
    navigate(SCREEN_NAMES.SettingsNew);
  };

  const navigateToEditProfile = () => {
    navigate(SCREEN_NAMES.EditProfile);
  };

  return {
    user,
    isAuthenticated,
    navigateToSettings,
    navigateToEditProfile,
  };
};
export default useProfile;
