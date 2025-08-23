import Clipboard from '@react-native-clipboard/clipboard';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Platform} from 'react-native';
import {Image} from 'react-native-compressor';
import {PERMISSIONS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {
  formatInstagramUrl,
  formatInstaUrl,
  formatTiktokUrl,
} from '../../../navigation/constants';
import {updateLoginData} from '../../../redux';
import {
  getInterestTopics,
  showToastError,
  showToastSuccess,
  updateProfile,
} from '../../../services';
import {checkPermission, openGallery} from '../../../utils';

const useEditProfile = () => {
  const user = useSelector(state => state.authSlice.loginData);
  const dispatch = useDispatch();
  const [profilePicData, setProfilePicData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState({
    cca2: user?.countryCode,
    name: user?.nationality,
  });
  const [interests, setInterests] = useState([]);
  const [selectedIntrest, setSelectedIntrest] = useState({});
  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const androidVersion = Platform.Version;
  const defaultTiktokUrl = 'https://www.tiktok.com/@';
  const defaultInstagramUrl = 'https://www.instagram.com/';
  let [tiktokUserName, setTiktokUserName] = useState('');
  const {username: tiktokUserNameInput, link: tiktokUserNameLink} =
    formatTiktokUrl(user?.Tiktok_account);
  const {username: instaUserNameInput, link: instaUserNameLink} =
    formatInstagramUrl(user?.IG_account);
  // const [tiktokInputValue, setTiktokInputValue] = useState(defaultTiktokUrl);

  const preIntrest = useMemo(() => {
    const data = user?.user_interest_topics_turbo_id?.reduce(
      (acc, item) => ({...acc, [item?.id]: {...item, isChecked: true}}),
      {},
    );
    return data;
  }, [user?.user_interest_topics_turbo_id]);
  // const tiktokInputOnChange = useCallback((value, onChange) => {
  //   let {username, link} = formatTiktokUrl(value);
  //   // let withoutHttpValue = isInputValid ? link : value;
  //   // console.log(link, value, 'link');
  //   // return;
  //   onChange(username); // Update input value for TikTok
  //   setTiktokUserName(link);
  // }, []);
  const tiktokRef = useRef(null);
  const instaRef = useRef(null);

  const setDynamicInputTextSpacing = (ref, len) => {
    // run on next frame so RN has applied focus
    // requestAnimationFrame(() => {
    ref.current?.setNativeProps({selection: {start: len}});
    // });
  };
  // const tiktokInputRef = useRef(null);

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      biography: user?.bio ?? '',
      fullName: user?.name ?? '',
      id: user?.id,
      instagramLink: instaUserNameInput || '',
      mapsAccount: '',
      nationality: user?.nationality ?? 'Anguilla',
      tiktokLink: tiktokUserNameInput || '',
    },
  });

  const getInterestTopicsData = async () => {
    const res = await getInterestTopics();
    setInterests(res?.data);
  };

  const handlePermission = async permission => {
    const res = await checkPermission(permission);
    return res;
  };

  const handleGalleryPress = async () => {
    const permission = isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : isAndroid &&
        (androidVersion > 32
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    const isGranted = await handlePermission(permission);

    if (isGranted) {
      const res = await openGallery({selectionLimit: 1});

      if (res?.assets?.length > 0) {
        const file = res?.assets[0];
        Image.compress(file.uri).then(compressedURI => {
          const compressed = {...file, uri: compressedURI};
          setProfilePicData(compressed);
        });
      }
    }
  };

  const handlePaste = async param => {
    const text = await Clipboard.getString();
    setValue(param, text);
  };

  const onSubmit = useCallback(
    async data => {
      const {link: tiktokUserNameLinkNew} = formatTiktokUrl(data?.tiktokLink);
      const {link: instaUserNameLinkNew} = formatInstagramUrl(
        data?.instagramLink,
      );
      const topicIds = Object.values({
        ...preIntrest,
        ...selectedIntrest,
      })?.filter(item => item.isChecked);

      const formData = new FormData();
      formData.append('bio', data?.biography);
      formData.append('name', data?.fullName);
      formData.append('nationality', country?.name);
      formData.append('countryCode', country?.cca2);

      topicIds
        ?.filter(item => item?.id)
        .forEach(item => {
          formData.append('user_interest_topics_turbo_id[]', item.id);
        });

      if (profilePicData && profilePicData?.uri) {
        formData.append('profileImage', {
          name: profilePicData.fileName,
          type: profilePicData.type,
          uri: profilePicData.uri,
        });
      } else {
        formData.append(
          'profileImage',
          user?.Profile_pic?.url ?? {
            name: 'rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
            type: 'image/jpeg',
            uri: 'file:///data/user/0/com.clarisapp.influencerapp/cache/rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
          },
        );
      }
      // console.log(
      //   'instaUserNameLinkNew',
      //   instaUserNameLinkNew,
      //   tiktokUserNameLinkNew,
      // );
      formData.append('IG_account', instaUserNameLinkNew || '');
      formData.append('Tiktok_account', tiktokUserNameLinkNew || '');
      const resProfile = await updateProfile({formData, userID: user?.id});
      if (resProfile && resProfile?.success) {
        dispatch(updateLoginData(resProfile.data));
        showToastSuccess('Profile Update Success');
        setLoading(false);
      } else {
        showToastError({
          message: 'please Select Profile Picture',
        });
        setLoading(false);
      }
    },
    [
      preIntrest,
      selectedIntrest,
      country?.name,
      country?.cca2,
      profilePicData,
      user?.id,
      user?.Profile_pic?.url,
      dispatch,
    ],
  );

  const handleIntrest = useCallback(
    (param, isChecked) => {
      const interest = preIntrest[param.id];
      setSelectedIntrest(prev => {
        const prevData = {...prev};
        if (prevData[param.id] && interest?.isChecked === isChecked) {
          delete prevData[param.id];
        } else {
          prevData[param.id] = {...param, isChecked};
        }
        return prevData;
      });
    },
    [preIntrest],
  );

  const onSelect = country => {
    setCountry(prev => ({
      ...prev,
      cca2: country.cca2,
      name: country.name,
    }));
  };

  useEffect(() => {
    getInterestTopicsData();
  }, []);

  // useEffect(() => {
  //   const prevData = getValues();
  //   if (selectedInFluencer_type?.name?.includes('tiktok')) {
  //     reset({
  //       ...prevData,
  //       instagramLink: '',
  //       tiktokLink: user?.Tiktok_account,
  //     });
  //     console.log('check_tiktok_condition');
  //   } else if (selectedInFluencer_type?.name?.includes('instagram')) {
  //     reset({
  //       ...prevData,
  //       instagramLink: user?.IG_account,
  //       tiktokLink: '',
  //     });
  //     console.log('check_insta_condition');
  //   } else {
  //     console.log('check_Else_Condition');
  //     console.log('prevData', prevData);
  //     reset({
  //       ...prevData,
  //       instagramLink: user?.IG_account,
  //       tiktokLink: user?.Tiktok_account,
  //     });
  //   }
  // }, [
  //   getValues,
  //   reset,
  //   selectedInFluencer_type?.name,
  //   setValue,
  //   user?.IG_account,
  //   user?.Tiktok_account,
  // ]);

  return {
    country,
    loading,
    user,
    profilePicData,
    control,
    handleSubmit,
    setValue,
    errors,
    interests,
    preIntrest,
    selectedIntrest,
    tiktokUserName,
    onSubmit,
    onSelect,
    // tiktokInputValue,
    defaultTiktokUrl,
    defaultInstagramUrl,
    tiktokRef,
    instaRef,
    setTiktokUserName,
    setDynamicInputTextSpacing,
    handleIntrest,
    handlePaste,
    handleGalleryPress,
    handlePermission,
    getInterestTopics,
  };
};

export default useEditProfile;
