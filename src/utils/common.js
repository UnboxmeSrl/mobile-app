import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {verticalScale} from 'react-native-size-matters';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {IMAGES} from '../assets';
import {chatClient} from '../hooks';
import {getOwnersByRestaurant} from '../services';

const VENUE_DEAL_BOOKING_CHANNEL_PREFIX = 'venueDealBooking_';

const getMissingStreamUserIds = error => {
  const errorMessage = error?.message || error?.response?.data?.message || '';
  const missingUsersMatch = errorMessage.match(/don't exist:\s*\[([^\]]+)\]/);

  if (!missingUsersMatch?.[1]) {
    return [];
  }

  return missingUsersMatch[1].split(/\s+/).filter(Boolean);
};

const getBookingIdByBookingDetail = bookingDetails => {
  const bookingId =
    bookingDetails?.venue_deal_booking_id ||
    bookingDetails?.rawVenueDealBooking?.id ||
    bookingDetails?.booking_id ||
    bookingDetails?.booking?.id ||
    bookingDetails?.id;

  if (!bookingId) {
    return null;
  }

  return bookingId.toString();
};

const getChatChannelIdByBookingDetail = bookingDetails => {
  const isVenueDealBooking =
    bookingDetails?.isVenueDeal ||
    bookingDetails?.isVenueDealBooking ||
    bookingDetails?.isVenueDealBookingAction;
  const bookingId = getBookingIdByBookingDetail(bookingDetails);

  if (!bookingId) {
    return null;
  }

  const channelId = bookingId;

  if (
    isVenueDealBooking &&
    !channelId.startsWith(VENUE_DEAL_BOOKING_CHANNEL_PREFIX)
  ) {
    return `${VENUE_DEAL_BOOKING_CHANNEL_PREFIX}${channelId}`;
  }

  return channelId;
};

export const getInfluencerChatChannelTitle = channelName => {
  const nameParts = String(channelName || '')
    .split(':')
    .map(part => part.trim())
    .filter(Boolean);

  if (nameParts.length < 3) {
    return channelName || '';
  }

  return `${nameParts[0]} · ${nameParts[nameParts.length - 1]}`;
};

export const getChatByBookingDetail = async ({bookingDetails}) => {
  try {
    const channelId = getChatChannelIdByBookingDetail(bookingDetails);

    if (!channelId) {
      return false;
    }

    const channels = await chatClient.queryChannels(
      {cid: `messaging:${channelId}`},
      {},
      {state: true, watch: true},
    );

    return channels?.[0] || false;
  } catch (error) {
    console.error('Error opening chat channel:', error);
    return false;
  }
};

export const checkActionName = actionName => {
  if (actionName) {
    switch (actionName) {
      case 'Reel':
        return IMAGES.reelsAddNew;
      case 'Tiktok':
        return IMAGES.tiktokAddNew;
      case 'Story':
        return IMAGES.storyAddNew;
      case 'Maps & Story':
        return IMAGES.googleMaps;
      case 'Diary Instagram':
        return IMAGES.diary;
      case 'Diary Tiktok':
        return IMAGES.diary;
    }
  }
};

export const checkAction = (actionNumId, actions) => {
  let result, filterRes;

  if (actionNumId) {
    filterRes = actions?.filter(
      a => a?.action_num_id === 4 || a?.action_num_id === 5,
    );
    switch (actionNumId) {
      case 1:
        result = {
          action_id: 1,
          action_name: 'Story',
          action_icon: IMAGES.storyAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        };
        return result;
      case 2:
        result = {
          action_id: 2,
          action_name: 'Maps & Story',
          action_icon: IMAGES.googleMaps,
          // action_icon: filterRes?.Action_icon?.url,
        };
        return result;
      case 3:
        result = {
          action_id: 3,
          action_name: 'Diary Instagram',
          action_icon: IMAGES.diary,
          // action_icon: filterRes?.Action_icon?.url,
        };
        return result;
      case 4:
        result = {
          action_id: 4,
          action_name: 'Reel',
          action_icon: IMAGES.reelsAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        };
        return result;
      case 5:
        result = {
          action_id: 5,
          action_name: 'TikTok',
          action_icon: IMAGES.tiktokAddNew,
          // action_icon: filterRes?.Action_icon?.url,
        };
        return result;
      case 6:
        result = {
          action_id: 6,
          action_name: 'Full Dedicated',
          action_icon: IMAGES.fullDedicated,
          duo_actions: filterRes,
        };
        return result;
    }
  }
};

export const checkContentStatus = statusName => {
  let title = '',
    description = '',
    statusIcon = '';

  switch (statusName) {
    case 'Approved':
      statusIcon = IMAGES.approvalSuccess;
      title = 'Your content has been approved!';
      description =
        'Congratulations your content created at Pizzami has been approved!';
      return {
        title,
        description,
        statusIcon,
      };
    case 'Rejected':
      statusIcon = IMAGES.approvalReject;
      title = 'Your content has been rejected!';
      description =
        'You lost some Exp, recover it by sending the content on review';
      return {
        title,
        description,
        statusIcon,
      };
    case 'To publish':
      statusIcon = IMAGES.approvalPending;
      title = 'Your content need to be published!';
      description = 'Your content needs to be published!';
      return {
        title,
        description,
        statusIcon,
      };
    case 'Under Review':
      statusIcon = IMAGES.approvalUnderReview;
      title = 'Your content is under review!';
      description =
        'Your content is under review. We are checking it, you will be notified once approved!';
      return {
        title,
        description,
        statusIcon,
      };
    case 'Missed Deadline':
      statusIcon = IMAGES.approvalMissed;
      title = 'You have missed the deadline!';
      description =
        'You have missed the Deadline and lost some Exp points. Publish now to not comprise your stats and to not get the account frozen';

      return {
        title,
        description,
        statusIcon,
      };
  }
};

const isValidDate = date =>
  date instanceof Date && !Number.isNaN(date.getTime());

const getSafeDaysCount = days => {
  const parsedDays = Number(days);

  return Number.isFinite(parsedDays) ? parsedDays : 0;
};

export const deadlineDaysCount = (bookDate, deadlineDays) => {
  const currentDate = new Date();
  const bookingDate = new Date(bookDate);

  if (!bookDate || !isValidDate(bookingDate)) {
    return null;
  }

  const millisecondsDiff = bookingDate.getTime() - currentDate.getTime();
  let calculatedDeadlineDays =
    Math.round(millisecondsDiff / (1000 * 3600 * 24)) +
    getSafeDaysCount(deadlineDays);
  console.log('return_calculatedDeadlineDays', calculatedDeadlineDays);
  return calculatedDeadlineDays;
};
export const getDeadlineDate = (startDateStr, daysToAdd) => {
  // console.log(
  //   'date_prior',
  //   startDateStr,
  //   typeof startDateStr,
  //   daysToAdd,
  //   typeof daysToAdd,
  // );
  const date = new Date(startDateStr); // e.g. "2025-05-28"

  if (!startDateStr || !isValidDate(date)) {
    return '';
  }

  // console.log('date_before', date, date.getDate());
  date.setDate(date.getDate() + getSafeDaysCount(daysToAdd)); // add days
  // console.log('date', date, typeof date);
  // console.log('return_date', date.toISOString().split('T')[0]);

  return date.toISOString().split('T')[0]; // returns in "YYYY-MM-DD" format
};
export const getFormattedDate = dt => {
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getFormattedTime = dt => {
  const date = new Date(dt);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const setCustomTimeFromISOString = (givenDate, hour, minute) => {
  const date = new Date(givenDate); // Parse original ISO date

  const customDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
    0,
    0,
  );

  return customDate.getTime(); // Return in milliseconds
};

export const checkWithCurrentDateDifference = (givenDate, hour, minute) => {
  const bookingEndTimeInMin =
    setCustomTimeFromISOString(givenDate, hour, minute) / 60000;
  const creatingBookingTimeInMin = new Date() / 60000;
  return (bookingEndTimeInMin - creatingBookingTimeInMin).toFixed(2); // Return in milliseconds
};

export const compareWithCurrDate = date => {
  const currDate = new Date(new Date().toUTCString());

  currDate.setHours(23);
  currDate.setMinutes(59);
  currDate.setSeconds(59);
  currDate.setMilliseconds(999);
  const bookingDate = new Date(date);
  // new Date(date).setSeconds(0);
  // new Date(date).setMilliseconds(0);
  // console.log('compareWithCurrDate1', bookingDate);
  // console.log('compareWithCurrDate2', currDate);
  // // console.log(
  // //   'compareWithCurrDate',
  // //   bookingDate > currDate ||
  // //     !getFormattedDate(currDate) === getFormattedDate(bookingDate),
  // // );

  return (
    bookingDate > currDate ||
    !getFormattedDate(currDate) === getFormattedDate(bookingDate)
  );
};

export const createChatByBookingDetail = async ({bookingDetails}) => {
  try {
    const channelId = getChatChannelIdByBookingDetail(bookingDetails);
    const restaurantTurboId =
      bookingDetails?.restaurant_turbo_id ||
      bookingDetails?.rawVenueDealBooking?.restaurant_turbo_id ||
      bookingDetails?._restaurant_turbo?.id ||
      bookingDetails?.restaurant_id;
    const restaurantOwnerIds = await getOwnersByRestaurant(restaurantTurboId);
    const restaurantOwnersWithPrefix = restaurantOwnerIds
      .filter(
        ownerId => ownerId !== null && ownerId !== undefined && ownerId !== '',
      )
      .map(ownerId => 'owner_' + ownerId);
    const influencerMemberId = bookingDetails?.user_turbo_id
      ? 'influencer_' + bookingDetails.user_turbo_id.toString()
      : null;
    const channelMembers = [
      influencerMemberId,
      ...restaurantOwnersWithPrefix,
    ].filter(Boolean);
    console.log('CHAT_CREATE_BY_BOOKING_DETAIL_DEBUG', {
      bookingDetails,
      channelId,
      restaurantTurboId,
      restaurantOwnerIds,
      restaurantOwnersWithPrefix,
      influencerMemberId,
      channelMembers,
    });

    const formatDate = date => {
      const d = new Date(date); // Create a Date object from the input

      const day = d.getDate().toString().padStart(2, '0'); // Get the day and pad it to two digits
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-indexed) and pad it
      const year = d.getFullYear().toString().slice(2); // Get the last two digits of the year

      return `${day}-${month}-${year}`;
    };

    // Wait for all asynchronous operations (if any) within map to complete
    // const ownerNamesArray = await Promise.all(
    //   restaurantOwners.map(async owner => {
    //     // If any async operation is needed per owner, it can go here.
    //     // For example: const additionalData = await someAsyncFunction(owner.id);
    //     return owner?.Owner_name;
    //   }),
    // );
    // Join all owner names with commas
    // const ownerNames = ownerNamesArray.join(',');
    if (channelId && channelMembers.length) {
      const restaurantName = bookingDetails?._restaurant_turbo?.Name || '';
      const influencerName = bookingDetails?.user_turbo?.name || '';
      const bookingId = getBookingIdByBookingDetail(bookingDetails);
      const bookingDateLabel = formatDate(bookingDetails?.BookingDay);
      const channelName = `${restaurantName}:${influencerName}:${bookingDateLabel}`;

      // Proceed to create the channel if the name is valid
      if (channelName && channelName.trim() !== '') {
        const watchChannel = async members => {
          const channel = chatClient.channel('messaging', channelId, {
            name: channelName,
            restaurant_name: restaurantName,
            influencer_name: influencerName,
            booking_date_label: bookingDateLabel,
            booking_id: bookingId,
            restaurant_id: restaurantTurboId,
            members,
          });

          await channel.watch();
          return channel;
        };

        let newChannel;

        try {
          newChannel = await watchChannel(channelMembers);
        } catch (error) {
          const missingUserIds = getMissingStreamUserIds(error);
          const retryChannelMembers = channelMembers.filter(
            memberId => !missingUserIds.includes(memberId),
          );

          if (!missingUserIds.length || !retryChannelMembers.length) {
            throw error;
          }

          console.log('CHAT_CREATE_BY_BOOKING_DETAIL_RETRY', {
            reason: 'missing_stream_users',
            missingUserIds,
            originalChannelMembers: channelMembers,
            retryChannelMembers,
          });

          newChannel = await watchChannel(retryChannelMembers);
        }

        console.log('CHAT_CREATE_BY_BOOKING_DETAIL_RESULT', {
          cid: newChannel?.cid,
          id: newChannel?.id,
          data: newChannel?.data,
          memberIds: Object.keys(newChannel?.state?.members || {}),
          lastMessageAt: newChannel?.state?.last_message_at,
        });
        return newChannel;
      } else {
        console.log('CHAT_CREATE_BY_BOOKING_DETAIL_SKIPPED', {
          reason: 'empty_channel_name',
          channelId,
          channelName,
        });
        return false;
      }
    }
    console.log('CHAT_CREATE_BY_BOOKING_DETAIL_SKIPPED', {
      reason: 'missing_channel_or_members',
      channelId,
      channelMembers,
    });
  } catch (error) {
    console.error('Error creating chat channel:', error);
    return false;
  }
};

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export const calculateDis = (lat, lng, userLat, userLng) => {
  var R = 6371; // km
  var dLat = toRad(userLat - lat);
  var dLon = toRad(userLng - lng);
  var lat1 = toRad(lat);
  var lat2 = toRad(userLat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  // // console.log('DATA', d);
  return d;
};

export const hasNotch = !DeviceInfo.hasNotch();
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const platformVersion = Platform.Version;
export const xanoImageSize = 'bigger';

export const commonStyle = {
  containerPaddingTop: {
    paddingTop:
      getStatusBarHeight() + (isIos && hasNotch ? verticalScale(15) : 0),
  },
};

export const getDay = date => {
  const day = date ? new Date(date).getDay() : new Date().getDay();
  console.log('day_UTILS ', day);
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return '';
  }
};
