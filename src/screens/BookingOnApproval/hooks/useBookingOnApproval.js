import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBookingForContentList,
  getBookings,
  navigate,
} from '../../../services';
import {SCREEN_NAMES} from '../../../constants';
import {setBookings, setContentList} from '../../../redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const useBookingOnApproval = () => {
  const loginData = useSelector(state => state.authSlice.loginData);
  const route = useRoute();
  const bookingDetails = route.params?.bookingDetails;
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentWeekDay, setCurrentWeekDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const timeFrame = bookingDetails?._timeframes_turbo;
  const actionNumId = bookingDetails?.actions_turbo?.action_num_id;
  const approvalStageValue = bookingDetails?.Approved
    ? 'success'
    : bookingDetails?.Rejectedstatus
    ? 'reject'
    : 'pending';
  const [approvalStage, setApprovalStage] = useState(approvalStageValue);
  const dispatch = useDispatch();

  const handleBackPress = () => {
    navigate(SCREEN_NAMES.ServiceDetails);
  };

  const handleGoToSchedulePress = async () => {
    // dispatch(setRestaurantDetails({}))
    // dispatch(setServiceDetails({}))
    setIsLoading(true);
    const params = `/${loginData?.id}`;
    const res = await getBookings(params);
    dispatch(setBookings(res));

    const newParams = `/${loginData?.id}`;
    const contentListRes = await getBookingForContentList(newParams);
    dispatch(setContentList(contentListRes));
    setIsLoading(false);
    navigate(SCREEN_NAMES.Schedule, {
      selectedTab: 1,
      isFromBookingDetails: true,
    });
  };

  useEffect(() => {
    const myDate = new Date(bookingDetails?.BookingDay);
    const month = myDate.toLocaleString('en-US', {month: 'long'});
    setCurrentMonth(month);
    const weekDay = myDate.toLocaleString('en-US', {weekday: 'long'});
    setCurrentWeekDay(weekDay);
    setCurrentDate(myDate.getDate());
  }, []);

  return {
    actionNumId,
    approvalStage,
    bookingDetails,
    isLoading,
    currentDate,
    currentMonth,
    currentWeekDay,
    handleBackPress,
    handleGoToSchedulePress,
    timeFrame,
  };
};

export default useBookingOnApproval;
