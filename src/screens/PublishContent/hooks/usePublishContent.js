import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {setContentList} from '../../../redux';
import {
  getBookingForContentList,
  navigate,
  updateContentUrl,
} from '../../../services';
import {checkAction, checkActionName} from '../../../utils';
import {useRoute} from '@react-navigation/native';

const usePublishContent = () => {
  const route = useRoute();
  const loginData = useSelector(state => state.authSlice.loginData);
  const approvalStage = 'Pending';
  const contentDetails = route.params?.contentDetails;
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendToReview, setIsSendToReview] = useState(false);
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] =
    useState(false);
  const [updatedContentDetails, setUpdatedContentDetails] = useState();

  let actionNumId = contentDetails?._actions_turbo?.action_num_id ?? 0;
  let icon = checkAction(actionNumId)?.action_icon;
  let actionName = contentDetails?._actions_turbo?.Action_Name ?? 0;
  if (contentDetails?.diary_action_turbo_id) {
    actionName = contentDetails?._diary_action_turbo?.action_for_others;
    if (actionNumId === 3) {
      actionName = contentDetails?._diary_action_turbo?.action;
    }
    icon = checkActionName(actionName);
  }
  const bookingDate = new Date(contentDetails?.BookingDay);
  const month = bookingDate.toLocaleString('en-US', {month: 'long'});
  const timeFrame =
    contentDetails?._timeframes ?? contentDetails?._timeframes_turbo;
  const dispatch = useDispatch();

  const handleBackPress = () => {
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
    if (actionName !== 'Story' && link === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter the content link.',
      });
      setIsSendToReview(false);
      return;
    }
    const params = `/${contentDetails?.id}`;
    const prepData = {
      content_url: link,
    };
    const res = await updateContentUrl(params, prepData);
    setUpdatedContentDetails(res);
    setIsSendToReview(false);
  };

  const handlePositiveBtnPress = async () => {
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const res = await getBookingForContentList(params);
    dispatch(setContentList(res));
    setIsLoading(false);

    if (res?.length > 0) {
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

  useEffect(() => {
    if (!isContentStatusModalVisible && updatedContentDetails?.id) {
      handleContentModalOpenClose();
    }
  }, [updatedContentDetails]);

  return {
    link,
    setLink,
    contentDetails,
    updatedContentDetails,
    actionNumId,
    actionName,
    icon,
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
    handleEditPress,
    handleBackPress,
  };
};

export default usePublishContent;
