import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAMES} from '../../../constants';
import {setBookings, setContentList} from '../../../redux';
import {
  getBookingForContentList,
  getBookings,
  getDiaryActions,
  navigate,
  updateActionDiary,
} from '../../../services';
import {checkAction} from '../../../utils';
import {useRoute} from '@react-navigation/native';

const useContent = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const socialActions = useSelector(
    state => state.restaurantSlice.socialActions,
  );
  const route = useRoute();
  const [selectedApp, setSelectedApp] = useState(0);
  const bookingDetails = route.params?.bookingDetails;
  let actionName = route.params?.actionName;
  const actionNumId = route.params?.actionNumId;
  const [isLoading, setIsLoading] = useState(false);
  const [diaryItems, setDiaryItems] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const actions = checkAction(actionNumId, socialActions);

  let icon = bookingDetails?._actions_turbo?.Action_icon?.url;

  if (actionNumId === 6) {
    icon = bookingDetails?._diary_action_turbo?.action_icon?.url;
    actionName = bookingDetails?._diary_action_turbo?.action_for_others;
  } else if (bookingDetails?.diary_action_turbo_id) {
    actionName = bookingDetails?._diary_action_turbo?.action;
  }

  console.log('Booking Details:', actionNumId, bookingDetails);
  const dispatch = useDispatch();

  const getDiaryActionsData = async () => {
    setIsDataFetching(true);
    const res = await getDiaryActions();
    setDiaryItems(res);
    setIsDataFetching(false);
  };

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.Schedule);
  };

  const handleNextPress = async () => {
    setIsLoading(true);
    /* Here, 
            reel=1 for reel
            reel=2 for tiktok 
    */
    const params = `/${bookingDetails?.id}`;

    const prepData = {
      diary_action_turbo_id: diaryItems?.[selectedApp]?.id,
    };
    const res = await updateActionDiary(params, prepData);
    console.log('update Diary Result: ', res);
    if (res?.id) {
      const params = `/${loginData?.id}`;
      const bookingRes = await getBookings(params);
      dispatch(setBookings(bookingRes));
      const newParams = `/${loginData?.id}`;
      const contentListRes = await getBookingForContentList(newParams);
      dispatch(setContentList(contentListRes));
      navigate(SCREEN_NAMES.ContentBriefScreen, {
        bookingDetails: res,
      });
    } else {
      Alert.alert('Something went wrong');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getDiaryActionsData();
  }, []);

  return {
    bookingDetails,
    actions,
    isLoading,
    isDataFetching,
    diaryItems,
    actionNumId,
    handleBackPress,
    handleNextPress,
    selectedApp,
    setSelectedApp,
  };
};

export default useContent;
