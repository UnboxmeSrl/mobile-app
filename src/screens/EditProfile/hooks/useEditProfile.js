import Clipboard from '@react-native-clipboard/clipboard';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
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

  const preIntrest = useMemo(() => {
    const data = user?.user_interest_topics_turbo_id?.reduce(
      (acc, item) => ({...acc, [item?.id]: {...item, isChecked: true}}),
      {},
    );
    return data;
  }, [user?.user_interest_topics_turbo_id]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      biography: user?.bio ?? '',
      fullName: user?.name ?? '',
      id: user?.id,
      instagramLink: user.IG_account ?? '',
      mapsAccount: '',
      nationality: user?.nationality ?? 'Anguilla',
      tiktokLink: user?.Tiktok_account ?? '',
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
        setProfilePicData(res?.assets[0]);
      }
    }
    // profilePicUploadRef.current.close()
  };

  const handlePaste = async param => {
    const text = await Clipboard.getString();
    setValue(param, text);
  };

  const onSubmit = useCallback(
    async data => {
      // setLoading(true)
      const topicIds = Object.values({
        ...preIntrest,
        ...selectedIntrest,
      })?.filter(item => item.isChecked);
      console.log('formData', topicIds);

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
            uri: 'file:///data/user/0/com.claris.app/cache/rn_image_picker_lib_temp_44f5f42d-b4e7-4108-930d-498cbc3eab14.jpg',
          },
        );
      }

      formData.append('IG_account', data?.instagramLink);
      formData.append('Tiktok_account', data?.tiktokLink);
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
    [dispatch, profilePicData, selectedIntrest, user, preIntrest, country],
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
    onSubmit,
    onSelect,
    handleIntrest,
    handlePaste,
    handleGalleryPress,
    handlePermission,
    getInterestTopics,
  };
};

export default useEditProfile;
