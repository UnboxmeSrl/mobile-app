import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '../../../redux';
import {navigate} from '../../../services';
import {SCREEN_NAMES} from '../../../constants';

const useProfile = () => {
  const user = useSelector(state => state.authSlice.loginData);
  const isInstaAccount = user?.IG_account?.length > 0;
  const isTiktokAccount = user?.Tiktok_account?.length > 0;
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigateToSettings = () => {
    navigate(SCREEN_NAMES.SettingsNew);
  };

  const navigateToEditProfile = () => {
    navigate(SCREEN_NAMES.EditProfile);
  };

  // const handleGetProfileData = useCallback(async () => {
  //   if (user?.id) {
  //     const res = await getProfile(user?.id)
  //     disapatch(setproFileData(res.data))
  //   }
  // }, [disapatch])
  // // console.log('user', user?.Profile_pic)
  // useEffect(() => {
  //   handleGetProfileData()
  // }, [handleGetProfileData])

  return {
    user,
    isInstaAccount,
    isTiktokAccount,
    isAuthenticated,
    navigateToSettings,
    navigateToEditProfile,
  };
};
export default useProfile;
