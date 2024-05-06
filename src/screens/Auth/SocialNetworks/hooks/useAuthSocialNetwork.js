import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../../constants';
import {navigate, showToastError, userSignUp} from '../../../../services';
import {resetAuthData, setAuthData, setLoginData} from '../../../../redux';

const useAuthSocialNetwork = () => {
  const userDetails = useSelector(state => state.authSlice.authData);
  const [tiktokUserName, setTiktokUserName] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [isLoading, setIsLoading] = useState();
  const tiktokSheetRef = useRef();
  const instaSheetRef = useRef();
  const dispatch = useDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

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
    setIsLoading(true);
    setIsBtnDisabled(true);
    dispatch(setAuthData({instaUserName, tiktokUserName}));

    // User Type (Model, Influencer, Both)
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
        uri: 'file:///data/user/0/com.claris.app/cache/rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
      });
    }

    formData.append('Tiktok_account', userDetails?.tiktokUserName || '');
    formData.append('TikTok', userDetails?.tiktokUserName ? 'true' : 'false');
    formData.append('IG_account', userDetails?.instaUserName || '');
    formData.append('IG', userDetails?.instaUserName ? 'true' : 'false');
    formData.append('telegram_id', 0);
    isBothUserType
      ? userDetails?.userType?.data?.map(item =>
          formData.append('usertype_id[]', item),
        )
      : formData.append('usertype_id[]', userDetails?.userType?.id);

    userDetails?.userInterests?.map(item =>
      formData.append('user_interest_topics_turbo_id[]', item?.id),
    );

    //  formData.append('money_give', parseFloat(add))
    //  formData.append('money_request', parseFloat(ask))
    //  if (selectedSneakers?.length > 0) {
    //    selectedSneakers?.map((item) => formData.append('id_closet_to[]', item?.id))
    //  }
    //  if (myOfferedList?.length > 0) {
    //    myOfferedList?.map((item) => formData.append('id_closet_from[]', item?.id))
    //  }

    // console.log('🟩 Form Data', JSON.stringify(formData))
    const res = await userSignUp(formData);
    setIsBtnDisabled(false);
    // console.log('🚀 ~ handleNextPress ~ res:', res.data)
    if (res?.id) {
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
  };

  useEffect(() => {
    if (tiktokUserName.trim().length > 0 || instaUserName.trim().length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [tiktokUserName, instaUserName]);
  // navigate(SCREEN_NAMES.AuthInterestTopicsScreen)

  return {
    isLoading,
    handleBackPress,
    handleOnInstaPress,
    handleNextPress,
    instaSheetRef,
    handleOnTikTokPress,
    instaUserName,
    isBtnDisabled,
    setInstaUserName,
    setTiktokUserName,
    tiktokSheetRef,
    tiktokUserName,
  };
};

export default useAuthSocialNetwork;
