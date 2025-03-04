import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../../constants';
import {
  navigate,
  showToastError,
  updateInfluencerType,
  userSignUp,
} from '../../../../services';
import {
  resetAuthData,
  selectAuthData,
  setAuthData,
  setLoginData,
} from '../../../../redux';
import {OneSignal} from 'react-native-onesignal';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const useAuthSocialNetwork = () => {
  const userDetails = useSelector(selectAuthData);
  const user = useSelector(state => state.authSlice.loginData);
  let [tiktokUserName, setTiktokUserName] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [isLoading, setIsLoading] = useState();
  const tiktokSheetRef = useRef();
  const instaSheetRef = useRef();
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [inFluencerTypeError, setInFluencerTypeError] = useState('');

  const [selectedInFluencer_type, setSelectedInFluencer_type] = useState({});
  const influencer_type = [
    {id: 0, name: 'tiktok'},
    {id: 1, name: 'instagram'},
    {id: 2, name: 'both'},
  ];

  const formData = new FormData();
  const navigation = useNavigation();

  const handleOnTikTokPress = () => {
    tiktokSheetRef?.current?.open();
  };

  const handleOnInstaPress = () => {
    instaSheetRef?.current?.open();
  };

  const handleBackPress = () => {
    navigation.replace(SCREEN_NAMES.AuthCodeFromFriendScreen);
  };

  const handleNextPress = async () => {
    // dispatch(setAuthData({instaUserName, tiktokUserName}));
    // User Type (Model, Influencer, Both)
    if (selectedInFluencer_type?.name) {
      setIsLoading(false);
      setIsBtnDisabled(true);
      const isBothUserType = !!userDetails?.userType?.data;

      // Phone Number
      const phonWithCountryCode = `+${userDetails?.country?.callingCode?.[0]}${userDetails?.phoneNumber}`;

      // Gender
      const genderId = userDetails?.gender?.id;

      // DOB (Birth Date)
      const selectedDate = new Date(userDetails?.birthDate);
      const birthDate = `${
        selectedDate.getDate() < 10
          ? `0${selectedDate.getDate()}`
          : selectedDate.getDate()
      }-${
        selectedDate.getMonth() + 1 < 10
          ? `0${selectedDate.getMonth() + 1}`
          : selectedDate.getMonth() + 1
      }-${selectedDate.getFullYear()}`;

      // Nationality
      const nationality = userDetails?.nationality?.name;
      const countryCode = userDetails?.nationality?.cca2;

      formData.append('email', userDetails?.email);
      formData.append('password', userDetails?.password);
      formData.append('os', Platform.OS);
      formData.append('os_version', DeviceInfo.getSystemVersion());
      formData.append('app_version', DeviceInfo.getVersion());
      formData.append('version_code', DeviceInfo.getBuildNumber());
      formData.append('device_brand_name', DeviceInfo.getBrand());
      formData.append('device_model_name', DeviceInfo.getModel());
      formData.append('name', userDetails?.name);
      formData.append('surname', userDetails?.surname);
      formData.append('NickName', userDetails?.nickName);
      formData.append('Phonenumber', phonWithCountryCode);
      formData.append('gender_list_id', genderId);
      formData.append('Birthday', birthDate);
      formData.append('nationality', nationality);
      formData.append('countryCode', countryCode);
      formData.append('City', userDetails?.city);
      formData.append('Agency', userDetails?.agencyData?.hasAgency);
      formData.append('Freelance', userDetails?.agencyData?.freelance);
      formData.append('promocode', userDetails?.codeFromFriend);
      formData.append('userType_id', '8');
      const profilePicData = userDetails?.profilePictures?.[0];
      if (profilePicData && profilePicData?.uri) {
        formData.append('profileImage', {
          name: profilePicData.fileName,
          type: profilePicData.type,
          uri: profilePicData.uri,
        });
      } else {
        formData.append('profileImage', {
          name: 'rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
          type: 'image/jpeg',
          uri: 'file:///data/user/0/com.clarisapp.influencerapp/cache/rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
        });
      }

      formData.append('Tiktok_account', userDetails?.tiktokUserName ?? '');
      formData.append('TikTok', userDetails?.tiktokUserName ? 'true' : 'false');
      formData.append('IG_account', userDetails?.instaUserName ?? '');
      formData.append('IG', userDetails?.instaUserName ? 'true' : 'false');
      formData.append('social_strength', selectedInFluencer_type?.name);
      formData.append('telegram_id', 0);
      isBothUserType
        ? userDetails?.userType?.data?.map(item =>
            formData.append('usertype_id[]', item),
          )
        : formData.append('usertype_id[]', userDetails?.userType?.id);

      userDetails?.userInterests?.map(item =>
        formData.append('user_interest_topics_turbo_id[]', item?.id),
      );

      // console.log('🟩 Form Data', JSON.stringify(formData));
      const res = await userSignUp(formData);
      console.log('🟩 Success Data', res);
      setIsBtnDisabled(false);
      // console.log('🚀 ~ handleNextPress ~ res:', res.data)
      if (res?.id) {
        // OneSignal.setExternalUserId(res?.id?.toString());
        OneSignal.login(res?.id?.toString());
        console.log('🟩 Success Data', JSON.stringify(res));
        dispatch(resetAuthData());
        // dispatch(setproFileData(res.data))
        dispatch(setLoginData(res));
        // reset(MAIN_NAVIGATOR)
        // dispatch(setIsApplied(true))
        setIsLoading(false);
        navigate(SCREEN_NAMES.AppliedScreen);
      } else {
        showToastError(res);
      }
    } else {
      setInFluencerTypeError('you need to select any one option to proceed');
    }
  };
  // const handleInfluencerTypeChange = async item => {
  //   console.log(
  //     'item_handleInfluencerTypeChange',
  //     item,
  //     JSON.stringify(userDetails),
  //   );
  //   return;
  //   const res = await updateInfluencerType(user?.id, {
  //     social_strength: item.name,
  //   });
  //   if (res.success === true) {
  //     console.log('checkSuccessCase');
  //     setSelectedInFluencer_type(item);
  //   }
  // };

  useEffect(() => {
    console.log(
      'tiktokUserName_useEffect',
      tiktokUserName,
      userDetails?.tiktokUserName,
      // isBtnDisabled
      // instaUserName,
    );
    // if (!inFluencerTypeError) {
    if (
      (tiktokUserName?.trim().length > 0 &&
        userDetails?.tiktokUserName === tiktokUserName) ||
      (instaUserName?.trim().length > 0 &&
        userDetails?.instaUserName === instaUserName)
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
    // }
  }, [
    tiktokUserName,
    instaUserName,
    userDetails?.tiktokUserName,
    userDetails?.instaUserName,
    // inFluencerTypeError,
  ]);

  return {
    isLoading,
    dispatch,
    handleBackPress,
    handleOnInstaPress,
    handleNextPress,
    instaSheetRef,
    handleOnTikTokPress,
    instaUserName,
    influencer_type,
    selectedInFluencer_type,
    setSelectedInFluencer_type,
    inFluencerTypeError,
    setInFluencerTypeError,
    isBtnDisabled,
    setIsBtnDisabled,
    setInstaUserName,
    setTiktokUserName,
    tiktokSheetRef,
    tiktokUserName,
  };
};

export default useAuthSocialNetwork;
