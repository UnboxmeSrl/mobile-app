import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Image as ImageCompressor} from 'react-native-compressor';
import {PERMISSIONS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants';
import {
  selectContentByID,
  setContentList,
  setSelectedChannel,
} from '../../../redux';
import {
  getBookingForContentList,
  getVenueDealBookingActions,
  getVenueDealBookings,
  navigate,
  showToastError,
  submitVenueDealActionContent,
  submitVenueDealActionPhotos,
  updateContentUrl,
} from '../../../services';
import {
  checkAction,
  checkActionName,
  checkPermission,
  deadlineDaysCount,
  getActionIconSource,
  getChatByBookingDetail,
  isAndroid,
  isIos,
  mapVenueDealBookingActionsToContentList,
  openCamera,
  openGallery,
  platformVersion,
} from '../../../utils';

const normalizePositiveInteger = value => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : undefined;
};

const compressContentPhoto = async photo => {
  if (!photo?.uri) {
    return photo;
  }

  try {
    const compressedUri = await ImageCompressor.compress(photo.uri, {
      compressionMethod: 'manual',
      maxHeight: 1600,
      maxWidth: 1600,
      output: 'jpg',
      quality: 0.8,
    });
    const originalName =
      photo?.fileName || photo.uri.split('/').pop() || 'venue-photo.jpg';
    const fileName = `${originalName.replace(/\.[^/.]+$/, '')}.jpg`;

    return {
      ...photo,
      fileName,
      type: 'image/jpeg',
      uri: compressedUri,
    };
  } catch (error) {
    console.log('Image compression error:', error);
    return photo;
  }
};

const createContentThumbnail = async (photo, index) => {
  const thumbnailUri = await ImageCompressor.compress(photo.uri, {
    compressionMethod: 'manual',
    maxHeight: 600,
    maxWidth: 600,
    output: 'jpg',
    quality: 0.3,
  });
  const originalName =
    photo?.fileName || photo.uri.split('/').pop() || `venue-photo-${index + 1}`;
  const baseName = originalName.replace(/\.[^/.]+$/, '');

  return {
    fileName: `${baseName}-thumbnail.jpg`,
    type: 'image/jpeg',
    uri: thumbnailUri,
  };
};

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
  const isVenueDealBookingAction = !!contentDetails?.isVenueDealBookingAction;
  const isVenueDealPicturesAction =
    isVenueDealBookingAction &&
    Number(contentDetails?._actions_turbo?.action_id) === 6;
  const shouldShowContentLinkInput = !isVenueDealPicturesAction;
  const shouldShowContentBrief = actionName !== 'Story';
  const shouldShowVenuePicturesUpload =
    !isVenueDealBookingAction || isVenueDealPicturesAction;
  const bookingDate = new Date(contentDetails?.BookingDay);
  const month = bookingDate.toLocaleString('en-US', {
    month: 'long',
    timezone: 'UTC',
  });
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

    navigation.navigate(STACK_NAMES.BottomStack, {
      screen: SCREEN_NAMES.Schedule,
      params: {
        screen: SCREEN_NAMES.YourScheduleScreen,
        params: {
          selectedTab: 2,
        },
      },
    });
  };

  const handleContentModalOpenClose = () => {
    setIsContentStatusModalVisible(!isContentStatusModalVisible);
  };

  const handleSendToReviewBtnPress = async () => {
    setIsSendToReview(true);
    const uploadedPicturesCount = contentPhotos.filter(
      item => item?.uri,
    ).length;
    const shouldRequireVenuePictures = shouldShowVenuePicturesUpload;
    if (shouldShowContentLinkInput && link === '') {
      const error = {
        message: 'Please enter the content link',
      };
      showToastError(error);
      setIsSendToReview(false);
      return;
    } else if (shouldRequireVenuePictures && uploadedPicturesCount < 3) {
      const error = {
        message: 'Please upload 3 pictures of venue',
      };
      showToastError(error);
      setIsSendToReview(false);
      return;
    }

    if (isVenueDealBookingAction) {
      let res;

      if (isVenueDealPicturesAction) {
        const userActionId = normalizePositiveInteger(
          contentDetails?.venue_deal_booking_action_id ??
            contentDetails?.rawVenueDealBookingAction?.id,
        );
        const bookingId = normalizePositiveInteger(
          contentDetails?.venue_deal_booking_id ??
            contentDetails?.rawVenueDealBookingAction?.venue_deal_bookings_id,
        );

        if (!userActionId || !bookingId) {
          showToastError({message: 'Missing venue deal photo details'});
          setIsSendToReview(false);
          return;
        }

        try {
          const thumbnails = await Promise.all(
            contentPhotos.map(createContentThumbnail),
          );
          const photosFormData = new FormData();
          photosFormData.append('booking_id', String(bookingId));

          contentPhotos.forEach((photo, index) => {
            const fallbackName =
              photo?.uri?.split('/').pop() || `venue-photo-${index + 1}.jpg`;
            photosFormData.append('photos[]', {
              name: photo?.fileName || fallbackName,
              type: photo?.type || 'image/jpeg',
              uri: photo?.uri,
            });
            photosFormData.append('thumbnails[]', {
              name: thumbnails[index].fileName,
              type: thumbnails[index].type,
              uri: thumbnails[index].uri,
            });
          });

          res = await submitVenueDealActionPhotos(userActionId, photosFormData);
        } catch (error) {
          console.log('Thumbnail creation error:', error);
          showToastError({message: 'Unable to prepare photo thumbnails'});
          setIsSendToReview(false);
          return;
        }
      } else {
        const userTurboId =
          loginData?.id ||
          contentDetails?.user_turbo_id ||
          contentDetails?.rawVenueDealBooking?.user_turbo_id;
        const userActionId =
          contentDetails?.venue_deal_booking_action_id ||
          contentDetails?.rawVenueDealBookingAction?.id;

        if (!userTurboId || !userActionId) {
          showToastError({message: 'Missing venue deal action details'});
          setIsSendToReview(false);
          return;
        }

        const actionContentPayload = {
          user_turbo_id: userTurboId,
          user_action_id: userActionId,
        };

        if (shouldShowContentLinkInput) {
          actionContentPayload.content = link;
        }

        res = await submitVenueDealActionContent(
          userActionId,
          actionContentPayload,
        );
      }

      if (res) {
        setUpdatedContentDetails({
          ...contentDetails,
          ...res,
          ...(shouldShowContentLinkInput && {content_url: link}),
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

    navigation.navigate(STACK_NAMES.BottomStack, {
      screen: SCREEN_NAMES.Schedule,
      params: {
        screen: SCREEN_NAMES.YourScheduleScreen,
        params: {
          selectedTab: 2,
        },
      },
    });
  };

  const handleSendMessagePress = async () => {
    const channel = await getChatByBookingDetail({
      bookingDetails: updatedContentDetails || contentDetails,
    });

    if (!channel) {
      showToastError({message: 'Chat is not available for this booking'});
      return;
    }

    dispatch(setSelectedChannel(channel));
    setIsContentStatusModalVisible(false);
    navigation.navigate(STACK_NAMES.BottomStack, {
      screen: SCREEN_NAMES.ChatRoom,
    });
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
        const compressedPhoto = await compressContentPhoto(res.assets[0]);
        const updatedData = [...contentPhotos];
        updatedData[pictureIndex] = compressedPhoto;
        setContentPhotos([...updatedData]);
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
      const targetIndexes = [
        pictureIndex,
        ...contentPhotos.reduce((indexes, photo, index) => {
          if (index !== pictureIndex && !photo?.uri) {
            indexes.push(index);
          }
          return indexes;
        }, []),
      ];
      const res = await openGallery({selectionLimit: targetIndexes.length});
      // console.log('IMAGE Results: ' + JSON.stringify(res));
      // console.log('test', pictureIndex, res?.assets[0]);
      if (res?.assets?.length > 0) {
        const compressedPhotos = await Promise.all(
          res.assets.slice(0, targetIndexes.length).map(compressContentPhoto),
        );
        const updatedData = [...contentPhotos];
        compressedPhotos.forEach((photo, index) => {
          updatedData[targetIndexes[index]] = photo;
        });
        setContentPhotos([...updatedData]);
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
    shouldShowContentLinkInput,
    shouldShowContentBrief,
    shouldShowVenuePicturesUpload,
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
    handleSendMessagePress,
    handleContentBriefPress,
    handleContentUpload,
    handleCameraPress,
    handleGalleryPress,
    handleBackPress,
  };
};

export default usePublishContent;
