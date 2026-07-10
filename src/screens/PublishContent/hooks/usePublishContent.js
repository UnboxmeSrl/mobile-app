import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {PERMISSIONS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {selectContentByID, setContentList} from '../../../redux';
import {
  getBookingForContentList,
  getVenueDealBookingActions,
  getVenueDealBookings,
  navigate,
  showToastError,
  submitVenueDealActionContent,
  updateContentUrl,
} from '../../../services';
import {
  checkAction,
  checkActionName,
  checkPermission,
  deadlineDaysCount,
  getActionIconSource,
  isAndroid,
  isIos,
  mapVenueDealBookingActionsToContentList,
  openCamera,
  openGallery,
  platformVersion,
} from '../../../utils';

const usePublishContent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.authSlice.authData);
  const loginData = useSelector(state => state.authSlice.loginData);
  const contentUploadRef = useRef();
  const approvalStage = 'Pending';
  const contentDetailsId = route.params?.contentDetails?.id;
  console.log('contentDetailsId', contentDetailsId);
  const contentDetails = useSelector(selectContentByID(contentDetailsId));
  const [link, setLink] = useState('');
  const [contentPhotos, setContentPhotos] = useState([1, 2, 3]);
  const [picturesForValidation, setPicturesForValidation] = useState([]);
  const [pictureIndex, setPictureIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendToReview, setIsSendToReview] = useState(false);
  const isEvent = contentDetails?._restaurant_turbo?.is_event;
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] =
    useState(false);
  const [updatedContentDetails, setUpdatedContentDetails] = useState();

  let actionNumId = contentDetails?._actions_turbo?.action_num_id ?? 0;
  let icon =
    getActionIconSource(contentDetails?._actions_turbo) ||
    checkAction(actionNumId)?.action_icon;
  let actionName = contentDetails?._actions_turbo?.Action_Name ?? 0;
  if (contentDetails?.diary_action_turbo_id) {
    actionName = contentDetails?._diary_action_turbo?.action_for_others;
    if (actionNumId === 3) {
      actionName = contentDetails?._diary_action_turbo?.action;
    }
    icon = checkActionName(actionName);
  } else if (contentDetails?.isVenueDealBookingAction) {
    icon = getActionIconSource(contentDetails?._actions_turbo);
  }
  const bookingDate = new Date(contentDetails?.BookingDay);
  const month = bookingDate.toLocaleString('en-US', {month: 'long'});
  const timeFrame =
    contentDetails?._timeframes ?? contentDetails?._timeframes_turbo;
  const dispatch = useDispatch();

  // For deadline days of content publish from (current date) to (booking date + deadline days)
  const deadlineDays = deadlineDaysCount(
    contentDetails?.BookingDay,
    contentDetails?._actions_turbo?.Days_deadline,
  );

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigate(SCREEN_NAMES.YourScheduleScreen, {
      selectedTab: 2,
    });
  };

  const handleEditPress = () => {
    navigate(SCREEN_NAMES.ContentScreen, {
      actionName: actionName,
      actionNumId: actionNumId,
      bookingDetails: contentDetails,
    });
  };

  const handleContentModalOpenClose = () => {
    setIsContentStatusModalVisible(!isContentStatusModalVisible);
  };

  const handleSendToReviewBtnPress = async () => {
    setIsSendToReview(true);
    const isVenueDealBookingAction = contentDetails?.isVenueDealBookingAction;
    const shouldRequireVenuePictures = !isVenueDealBookingAction;
    if (actionName !== 'Story' && link === '') {
      const error = {
        message: 'Please enter the content link',
      };
      showToastError(error);
      setIsSendToReview(false);
      return;
    } else if (
      shouldRequireVenuePictures &&
      picturesForValidation?.length < 3
    ) {
      const error = {
        message: 'Please upload 3 pictures of venue',
      };
      showToastError(error);
      setIsSendToReview(false);
      return;
    }

    if (isVenueDealBookingAction) {
      const userActionId =
        contentDetails?.venue_deal_booking_action_id ||
        contentDetails?.rawVenueDealBookingAction?.id;
      const userTurboId =
        loginData?.id ||
        contentDetails?.user_turbo_id ||
        contentDetails?.rawVenueDealBooking?.user_turbo_id;

      if (!userTurboId || !userActionId) {
        showToastError({message: 'Missing venue deal action details'});
        setIsSendToReview(false);
        return;
      }

      const res = await submitVenueDealActionContent(userActionId, {
        user_turbo_id: userTurboId,
        user_action_id: userActionId,
        content: link,
      });

      if (res) {
        setUpdatedContentDetails({
          ...contentDetails,
          ...res,
          content_url: link,
          content_status_turbo_id: 1,
          _content_status_turbo: {
            ...(contentDetails?._content_status_turbo || {}),
            name: 'Under Review',
          },
        });
      }

      setIsSendToReview(false);
      return;
    }

    const params = `/${contentDetails?.id}`;
    const formData = new FormData();
    formData.append('content_url', link);
    if (shouldRequireVenuePictures) {
      contentPhotos.forEach(item => {
        if (item?.fileName) {
          formData.append('vanue_images[]', {
            name: item.fileName,
            type: item.type,
            uri: item.uri,
          });
        }
      });
    }
    const res = await updateContentUrl(params, formData);
    if (res?.id) {
      setUpdatedContentDetails(res);
    }
    setIsSendToReview(false);
  };

  const handlePositiveBtnPress = async () => {
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const [res, venueDealActionsRes, venueDealBookingsRes] = await Promise.all([
      getBookingForContentList(params),
      getVenueDealBookingActions(loginData?.id),
      getVenueDealBookings(loginData?.id),
    ]);
    const legacyContentList = Array.isArray(res) ? res : [];
    const venueDealContentList = mapVenueDealBookingActionsToContentList(
      venueDealActionsRes,
      venueDealBookingsRes,
    );
    const contentList = [...legacyContentList, ...venueDealContentList];
    dispatch(setContentList(contentList));
    setIsLoading(false);

    if (contentList?.length > 0) {
      navigate(SCREEN_NAMES.YourScheduleScreen, {
        selectedTab: 2,
      });
    }
  };

  const handleContentBriefPress = () => {
    navigate(SCREEN_NAMES.ContentBriefScreen, {
      bookingDetails: contentDetails,
    });
  };

  const handlePermission = async permission => {
    const res = await checkPermission(permission);
    return res;
  };

  const handleContentUpload = async index => {
    // if (!contentDetails?.isCheckedIn) {
    //   showToastError({message: "You didn't Checked in to Upload Content "});
    // } else {
    setPictureIndex(index);
    contentUploadRef.current.open();
    // }
  };

  const handleCameraPress = async () => {
    const permission = isIos
      ? PERMISSIONS.IOS.CAMERA
      : isAndroid && PERMISSIONS.ANDROID.CAMERA;
    const isGranted = await handlePermission(permission);
    if (isGranted) {
      const res = await openCamera();
      // console.log('test', res?.assets[0]);
      if (res?.assets?.length > 0) {
        const updatedData = [...contentPhotos];
        updatedData[pictureIndex] = res?.assets[0];
        setContentPhotos([...updatedData]);
        setPicturesForValidation([...picturesForValidation, res?.assets[0]]);
      }
    }
    contentUploadRef.current.close();
  };

  const handleGalleryPress = async () => {
    const permission = isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : isAndroid &&
        (platformVersion > 32
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    const isGranted = await handlePermission(permission);
    if (isGranted) {
      const res = await openGallery({selectionLimit: 1});
      // console.log('IMAGE Results: ' + JSON.stringify(res));
      // console.log('test', pictureIndex, res?.assets[0]);
      if (res?.assets?.length > 0) {
        const updatedData = [...contentPhotos];
        updatedData[pictureIndex] = res?.assets[0];
        setContentPhotos([...updatedData]);
        setPicturesForValidation([...picturesForValidation, res?.assets[0]]);
      }
    }
    contentUploadRef.current.close();
  };

  useEffect(() => {
    if (!isContentStatusModalVisible && updatedContentDetails?.id) {
      handleContentModalOpenClose();
    }
    // Preserve the existing modal reopen behavior tied only to updated details.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedContentDetails]);

  return {
    link,
    setLink,
    deadlineDays,
    contentPhotos,
    contentDetails,
    contentUploadRef,
    updatedContentDetails,
    actionNumId,
    actionName,
    icon,
    isEvent,
    bookingDate,
    month,
    timeFrame,
    approvalStage,
    isLoading,
    isSendToReview,
    isContentStatusModalVisible,
    handleContentModalOpenClose,
    handleSendToReviewBtnPress,
    handlePositiveBtnPress,
    handleContentBriefPress,
    handleContentUpload,
    handleCameraPress,
    handleGalleryPress,
    handleEditPress,
    handleBackPress,
  };
};

export default usePublishContent;
