import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants/navigation';
import {
  selectBookingsList,
  setBookings,
  setFreshBookings,
} from '../../../redux/slices/restaurantSlice';
import {
  getBookingForContentList,
  getBookings,
  navigate,
} from '../../../services';
import {selectContentList, setContentList} from '../../../redux/slices';
import {useRoute} from '@react-navigation/native';

const useYourSchedule = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const route = useRoute();
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
        navigate(SCREEN_NAMES.ContentScreen, {
          actionName: actionName,
          actionNumId: actionNumId,
          bookingDetails: item,
        });
      } else {
        navigate(SCREEN_NAMES.YourScheduleDetailsScreen, {
          bookingDetails: item,
        });
      }
    }
  };

  const getBookingsData = async () => {
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const res = await getBookings(params);
    console.log(
      'getBookingsData',
      res?.map(item => item.id),
    );
    dispatch(setFreshBookings(res));
    setIsLoading(false);
  };

  const getBookingForContentListData = async () => {
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const res = await getBookingForContentList(params);
    console.log('contentListRes_getBookingForContentListData', res);
    dispatch(setContentList(res));
    setIsLoading(false);
  };
  const updateBookingCheckin = async params => {
    setIsLoading(true);
    // const params = `/${loginData?.id}`;
    const res = await getBookingForContentList(params);
    console.log('contentListRes_getBookingForContentListData', res);
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
    if (item?.content_status_turbo_id > 0) {
      setUpdatedContentDetails(item);
      handleContentModalOpenClose();
    } else {
      navigate(SCREEN_NAMES.PublishContentScreen, {
        contentDetails: item,
      });
    }
  };

  useEffect(() => {
    if (isContentStatusModalVisible === false && updatedContentDetails?.id) {
      handleContentModalOpenClose();
    }
  }, [updatedContentDetails]);

  useEffect(() => {
    if (loginData?.id && !isFromBookingDetails) {
      getBookingsData();
      getBookingForContentListData();
    }
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
    handleCardPress,
    handleContentCardPress,
    handleArchivePress,
    selectedTab,
    setSelectedTab,
  };
};

export default useYourSchedule;
