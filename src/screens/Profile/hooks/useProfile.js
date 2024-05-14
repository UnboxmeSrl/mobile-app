import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {
  selectExperienceLevels,
  selectIsAuthenticated,
  setLoginData,
} from '../../../redux';
import {
  getUserApprovalStatus,
  navigate,
  showToastError,
} from '../../../services';
import {Linking, Share} from 'react-native';

const useProfile = () => {
  const user = useSelector(state => state.authSlice.loginData);
  const isInstaAccount = user?.IG_account?.length > 0;
  const isTiktokAccount = user?.Tiktok_account?.length > 0;
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isFocused = useIsFocused();
  const xp = user?.xp;
  const [level, setLevel] = useState(1);
  const experienceLevels = useSelector(selectExperienceLevels);
  const dispatch = useDispatch();

  const navigateToSettings = () => {
    navigate(SCREEN_NAMES.SettingsNew);
  };

  const navigateToEditProfile = () => {
    navigate(SCREEN_NAMES.EditProfile);
  };

  const handleOpenLink = (schema, url) => {
    Linking.openURL(schema).catch(() => {
      Linking.openURL(url);
    });
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

  const handleSharePromoCode = async () => {
    try {
      const result = await Share.share({
        message: `Here a personal invitation for Claris App, an app for free collaborations with local venues. PROMO CODE: ${user?.promocode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      showToastError(error);
    }
  };
  const getProfileData = async () => {
    if (user?.id) {
      const userId = `/${user?.id}`;
      const res = await getUserApprovalStatus(userId);
      // console.log('res: ' + JSON.stringify(res));
      if (res?.id) {
        dispatch(setLoginData(res));
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      getProfileData();
      let calculatedLevel = experienceLevels?.findIndex(
        lvl => xp <= lvl?.experience_point,
      );
      if (calculatedLevel !== -1) {
        setLevel(experienceLevels[calculatedLevel]?.level);
      }
    }
  }, [isFocused]);

  return {
    user,
    level,
    isInstaAccount,
    isTiktokAccount,
    isAuthenticated,
    handleOpenLink,
    navigateToSettings,
    navigateToEditProfile,
    handleSharePromoCode,
  };
};
export default useProfile;
