import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES, STACK_NAMES} from '../../../constants/navigation';
import {
  selectBookingsList,
  setFreshBookings,
} from '../../../redux/slices/restaurantSlice';
import {
  getBookingForContentList,
  getBookings,
  getVenueDealBookings,
  getVenueDealBookingActions,
  navigate,
  showToastError,
} from '../../../services';
import {
  selectContentList,
  setContentList,
  setSelectedChannel,
} from '../../../redux/slices';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getChatByBookingDetail,
  mapVenueDealBookingActionsToContentList,
  mapVenueDealBookingsToScheduleBookings,
} from '../../../utils';

const useYourSchedule = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const route = useRoute();
  const navigation = useNavigation();
  const selectedTabFromRoute = route.params?.selectedTab;
  const [selectedTab, setSelectedTab] = useState(
    selectedTabFromRoute ? +selectedTabFromRoute : 1,
  );
  const [updatedContentDetails, setUpdatedContentDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const bookings = useSelector(selectBookingsList);

  const contentList = useSelector(selectContentList);

  const isFromBookingDetails = route.params?.isFromBookingDetails;
  const [isContentStatusModalVisible, setIsContentStatusModalVisible] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onBookingRefresh = () => {
    console.log('onBookingRefresh');
    setRefreshing(true);
    if (loginData?.id) {
      getBookingsData();
    }
    setRefreshing(false);
  };

  const onContentRefresh = () => {
    setRefreshing(true);
    if (loginData?.id) {
      getBookingForContentListData();
    }
    setRefreshing(false);
  };

  const handleCardPress = (item, approvalStatus, actionName, actionNumId) => {
    if (approvalStatus === 'Pending') {
      if (
        (actionNumId === 6 || actionNumId === 3) &&
        !item?._diary_action_turbo?.id
      ) {
        navigate(SCREEN_NAMES.ContentScreen, {
          actionName: actionName,
          actionNumId: actionNumId,
          bookingDetails: item,
        });
      } else if (actionName) {
        navigate(SCREEN_NAMES.YourScheduleDetailsScreen, {
          bookingDetails: item,
        });
      }
    } else if (approvalStatus === 'Accepted') {
      if (
        (actionNumId === 6 || actionNumId === 3) &&
        !item?._diary_action_turbo?.id
      ) {
        // console.log('check_contentNavigationBlock', item?.id);
        navigate(SCREEN_NAMES.ContentScreen, {
          actionName: actionName,
          actionNumId: actionNumId,
          bookingDetails: item,
        });
      } else {
        // console.log('check_contentNavigationBlock_else');
        navigate(SCREEN_NAMES.YourScheduleDetailsScreen, {
          bookingDetails: item,
        });
      }
    }
  };

  const getBookingsData = async () => {
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const [res, venueDealBookingsRes] = await Promise.all([
      getBookings(params),
      getVenueDealBookings(loginData?.id),
    ]);
    const legacyBookings = Array.isArray(res) ? res : [];
    const venueDealBookings =
      mapVenueDealBookingsToScheduleBookings(venueDealBookingsRes);
    // console.log(
    //   'getBookingsData',
    //   res?.map(item => item.id),
    // );
    dispatch(setFreshBookings([...legacyBookings, ...venueDealBookings]));
    setIsLoading(false);
  };

  const getBookingForContentListData = async () => {
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
    // console.log('contentListRes_getBookingForContentListData', res);
    dispatch(setContentList([...legacyContentList, ...venueDealContentList]));
    setIsLoading(false);
  };
  const updateBookingCheckin = async params => {
    setIsLoading(true);
    // const params = `/${loginData?.id}`;
    const res = await getBookingForContentList(params);
    // console.log('contentListRes_checkin', res);
    dispatch(setContentList(res));
    setIsLoading(false);
  };

  const handleArchivePress = () => {
    navigate(SCREEN_NAMES.ArchiveScreen);
  };

  const handleContentModalOpenClose = () => {
    setIsContentStatusModalVisible(!isContentStatusModalVisible);
  };

  const handleContentCardPress = item => {
    const contentStatus = item?._content_status_turbo?.name;

    if (contentStatus === 'Rejected' || !item?.content_status_turbo_id) {
      navigate(SCREEN_NAMES.PublishContentScreen, {
        contentDetails: item,
      });
    } else {
      setUpdatedContentDetails(item);
      handleContentModalOpenClose();
    }
  };

  const handleSendMessagePress = async () => {
    const channel = await getChatByBookingDetail({
      bookingDetails: updatedContentDetails,
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

  useEffect(() => {
    if (isContentStatusModalVisible === false && updatedContentDetails?.id) {
      handleContentModalOpenClose();
    }
    // Keep the existing modal reopen behavior tied only to updated details.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedContentDetails]);

  useEffect(() => {
    if (loginData?.id && !isFromBookingDetails) {
      getBookingsData();
      getBookingForContentListData();
    }
    // Preserve the existing refresh behavior when switching tabs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTabFromRoute) {
      setSelectedTab(+selectedTabFromRoute);
      route.params.selectedTab = undefined;
    }
  }, [route.params, selectedTabFromRoute]);

  return {
    bookings,
    // bookingsWithoutCanceled,
    contentList,
    updatedContentDetails,
    isLoading,
    isContentStatusModalVisible,
    updateBookingCheckin,
    refreshing,
    onBookingRefresh,
    onContentRefresh,
    handleContentModalOpenClose,
    handleSendMessagePress,
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
    selectedTab,
    setSelectedTab,
  };
};

export default useYourSchedule;
