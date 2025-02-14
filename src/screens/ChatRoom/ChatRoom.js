import React, {useCallback} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from 'stream-chat-react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AppText} from '../../components';
import {FONTS} from '../../constants';
import {
  currentUserData,
  selecteSelectedChannel,
  setSelectedChannel,
} from '../../redux';
import {colors, perfectSize} from '../../utils';

const ChatRoom = () => {
  const loginData = useSelector(currentUserData);
  // const [channel, setChannel] = useState(null);
  const channel = useSelector(selecteSelectedChannel);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const filters = loginData?.id
    ? {members: {$in: [`influencer_${loginData.id}`]}}
    : {};
  const sort = {last_message_at: -1};
  const handleBack = useCallback(() => {
    if (channel?.id) {
      dispatch(setSelectedChannel(null));
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }, [channel?.id, dispatch, navigation]);

  // console.log(
  //   channel?.state?.members,
  //   'members___________________',
  //   'channel?.state?.messageSets',
  //   channel?.state?.messageSets,
  //   'filtersList_____________________________________',
  //   filters,
  // );
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack,
      );
      return () => backHandler.remove(); // Cleanup listener on screen blur
    }, [handleBack]),
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* {!channel && <Header title="Chatroom" />} */}
      {!channel && (
        <View style={styles.headerWrapperMain}>
          <AppText
            style={{fontSize: perfectSize(20), fontFamily: FONTS.interBold}}>
            Chat-Room
          </AppText>
        </View>
      )}
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={selectedChannel =>
          dispatch(setSelectedChannel(selectedChannel))
        }
      />
      {!!channel && (
        <Channel channel={channel}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              style={{width: perfectSize(22)}}
              onPress={() => dispatch(setSelectedChannel(null))}>
              <AntDesign name="arrowleft" size={perfectSize(22)} />
            </TouchableOpacity>
            <AppText style={{fontSize: perfectSize(16), fontWeight: '500'}}>
              {channel?.data?.name}
              {/* {Object.values(channel?.state?.members || {}).find(member =>
                member.user.id.startsWith('owner_'),
              )?.user?.name || 'Unnamed Channel'} */}
            </AppText>
            <View
              style={{
                width: perfectSize(22),
              }}
            />
          </View>
          <MessageList />
          <MessageInput showMoreOptions={false} />
        </Channel>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerWrapperMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: perfectSize(45),
  },
  iconWrapper: {
    position: 'absolute',
    height: perfectSize(50),
    width: perfectSize(50),
    bottom: perfectSize(20),
    right: perfectSize(20),
    backgroundColor: colors.dangerLightFill,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: perfectSize(50),
  },
  icon: {
    fontSize: perfectSize(30),
    color: colors.danger,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: perfectSize(40),
    paddingHorizontal: perfectSize(20),
  },
});

export default ChatRoom;
