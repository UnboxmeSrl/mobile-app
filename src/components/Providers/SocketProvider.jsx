import {XanoClient} from '@xano/js-sdk';
import React, {useEffect} from 'react';
import WS from 'react-native-websocket'; // Import WebSocket from ws package
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthData, updateBooking} from '../../redux';

globalThis.WebSocket = globalThis.WebSocket || WS;

const client = new XanoClient({
  instanceBaseUrl: 'https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O',
  realtimeConnectionHash: 'YS5Rvc5Y0twWwmJd89vlbHM-sgY',
  // token: Config.XANO_API_KEY,
}); // need to change this portion

const SocketProvider = ({children}) => {
  const user = useSelector(state => state.authSlice.loginData);
  const dispatch = useDispatch();

  console.log(user?.id, 'user in socket');

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const channelId = `update-booking/${user.id}`;
    const channel = client.channel(channelId);
    const handler = msg => {
      console.log('Realtime event from Xano Scheduler:', msg);
      const recievedChannelId = msg?.options?.channel;
      if (
        msg.action === 'event' &&
        recievedChannelId === channelId &&
        msg.payload?.data
      ) {
        let data = msg.payload?.data ?? {};

        dispatch(
          updateBooking({
            ...data,
            ApprovalStatus: data?.ApprovalStatus == '1',
            Approved: data?.Approved == '1',
            Rejectedstatus: data?.Rejectedstatus == '1',
            canceled: data?.canceled == '1',
          }),
        );
      }
    };
    channel.on(handler);
    return () => {
      channel.destroy();
    };
  }, [dispatch, user?.id]);

  return <>{children}</>;
};

export default SocketProvider;
