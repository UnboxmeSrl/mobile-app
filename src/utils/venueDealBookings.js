const VENUE_DEAL_BOOKING_PREFIX = 'venueDealBooking_';
const VENUE_DEAL_BOOKING_ACTION_PREFIX = 'venueDealBookingAction_';

const normalizeStatus = status =>
  String(status || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const isTruthyValue = value =>
  value === true || value === 1 || value === '1' || value === 'true';

const getTimeFromMinutes = minutes => {
  const parsedMinutes = Number(minutes || 0);
  const hours = Math.floor(parsedMinutes / 60);
  const remainingMinutes = parsedMinutes % 60;

  return {
    hour: String(hours).padStart(2, '0'),
    minute: String(remainingMinutes).padStart(2, '0'),
  };
};

const getDeadlineDaysFromActionNotes = notes => {
  const match = String(notes || '').match(/(\d+)\s*([dh])/i);

  if (!match) {
    return '';
  }

  const amount = Number(match[1]);
  const unit = match[2]?.toLowerCase();

  if (unit === 'd') {
    return amount;
  }

  return 0;
};

const getContentStatusFromActionStatus = actionStatus => {
  switch (normalizeStatus(actionStatus)) {
    case 'approved':
      return 'Approved';
    case 'pending':
      return 'Under Review';
    case 'rejected':
      return 'Rejected';
    default:
      return null;
  }
};

export const getUserToken = loginData =>
  loginData?.authToken ||
  loginData?.auth_token ||
  loginData?.access_token ||
  loginData?.token ||
  loginData?.jwt ||
  loginData?.auth?.token ||
  loginData?.auth?.authToken ||
  loginData?.data?.authToken ||
  loginData?.data?.token;

export const isVenueDealBookingCanceled = booking => {
  const status = normalizeStatus(booking?.status);

  return (
    booking?.canceled ||
    status === 'cancelledbyuser' ||
    status === 'canceledbyuser' ||
    status === 'cancelled' ||
    status === 'canceled'
  );
};

export const mapVenueDealBookingToScheduleBooking = booking => {
  const status = normalizeStatus(booking?.status);
  const isCanceled = isVenueDealBookingCanceled(booking);
  const isRejected = status === 'rejected';
  const isApproved = status === 'approved' || status === 'completed';
  const startTime = getTimeFromMinutes(booking?.start_minutes);
  const endTime = getTimeFromMinutes(booking?.end_minutes);
  const isCheckedIn =
    isTruthyValue(booking?.checked_in) ||
    isTruthyValue(booking?.checkedIn) ||
    isTruthyValue(booking?.isCheckedIn);

  return {
    ...booking,
    id: `${VENUE_DEAL_BOOKING_PREFIX}${booking?.id}`,
    rawVenueDealBooking: booking,
    venue_deal_booking_id: booking?.id,
    isVenueDealBooking: true,
    Approved: isApproved,
    BookingDay: booking?.booking_date,
    BookingTimestamp: booking?.booking_date
      ? new Date(booking.booking_date).valueOf()
      : booking?.created_at,
    canceled: isCanceled,
    checked_in: isCheckedIn,
    HourEnd: endTime.hour,
    HourStart: startTime.hour,
    isCheckedIn,
    MinuteEnd: endTime.minute,
    MinuteStart: startTime.minute,
    Rejectedstatus: isRejected,
    user_turbo_id: booking?.user_turbo_id,
    _actions_turbo: {
      Action_Name: 'Deal',
      Action_icon: {},
      Coupons_Services: [],
      Days_deadline: '',
      action_num_id: 0,
      key: 'deal',
    },
    _offers_turbo: {
      Credits: '',
      Offer_Cover: booking?.deal_cover,
      Offer_Name: booking?.deal_title,
      id: booking?.venue_deal_id,
      instructions: '',
      services: [],
    },
    _restaurant_turbo: {
      Adress: booking?.restaurant_address,
      Cover: booking?.deal_cover,
      Name: booking?.restaurant_name,
      id: booking?.restaurant_turbo_id,
      is_event: false,
    },
    _timeframes_turbo: {
      End: endTime.hour,
      Minute_End: endTime.minute,
      Minute_Start: startTime.minute,
      Name: `${startTime.hour}:${startTime.minute} - ${endTime.hour}:${endTime.minute}`,
      Start: startTime.hour,
      end_minutes: booking?.end_minutes,
      id: booking?.venue_deal_timeframe_id,
      start_minutes: booking?.start_minutes,
    },
  };
};

export const mapVenueDealBookingsToScheduleBookings = bookings =>
  (bookings || []).map(mapVenueDealBookingToScheduleBooking);

export const mapVenueDealBookingActionsToContentList = (
  actions,
  venueDealBookings,
) => {
  const bookingsById = (venueDealBookings || []).reduce((acc, booking) => {
    acc[booking?.id] = booking;
    return acc;
  }, {});

  return (actions || []).map(action => {
    const booking = bookingsById[action?.venue_deal_bookings_id];
    const mappedBooking = mapVenueDealBookingToScheduleBooking(booking || {});
    const contentStatus = getContentStatusFromActionStatus(
      action?.action_status,
    );
    const actionIcon =
      typeof action?.action_icon === 'string' && action.action_icon
        ? {url: action.action_icon}
        : {};

    return {
      ...mappedBooking,
      id: `${VENUE_DEAL_BOOKING_ACTION_PREFIX}${action?.id}`,
      rawVenueDealBooking: booking,
      rawVenueDealBookingAction: action,
      venue_deal_booking_action_id: action?.id,
      venue_deal_actions_id: action?.venue_deal_actions_id,
      venue_deal_booking_id: action?.venue_deal_bookings_id,
      isVenueDealBooking: true,
      isVenueDealBookingAction: true,
      content_status_turbo_id: contentStatus ? 1 : 0,
      content_url: '',
      completed_at: action?.completed_at,
      _actions_turbo: {
        ...(mappedBooking?._actions_turbo || {}),
        Action_Name: action?.action_title || 'Deal action',
        Action_icon: actionIcon,
        Action_quantity: action?.action_quantity,
        Coupons_Services: [],
        Days_deadline: getDeadlineDaysFromActionNotes(action?.action_notes),
        Descrizione: action?.action_description || '',
        action_id: action?.action_id,
        action_num_id: 0,
        key: action?.action_title,
        notes: action?.action_notes,
      },
      _content_status_turbo: {
        name: contentStatus,
      },
      _offers_turbo: {
        ...(mappedBooking?._offers_turbo || {}),
        Credits: action?.action_coin_amount ?? '',
      },
    };
  });
};
