import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from 'stream-chat-react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {currentUserData} from '../../redux';
import {AppText, HStack} from '../../components';
import {colors, perfectSize} from '../../utils';

const ChatRoom = () => {
  const loginData = useSelector(currentUserData);
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState(null);
  const navigation = useNavigation();
  const filters = loginData?.id
    ? {members: {$in: [`influencer_${loginData.id}`]}}
    : {};
  const sort = {last_message_at: -1};
  const handleBack = useCallback(() => {
    console.log('Back button pressed');
    if (channel?.id) {
      setChannel(null);
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }, [channel?.id, navigation, setChannel]);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack,
      );
      return () => backHandler.remove(); // Cleanup listener on screen blur
    }, [handleBack]),
  );
  console.log(channel?.data);
  return (
    <SafeAreaView style={styles.container}>
      {/* {!channel && <Header title="Chatroom" />} */}
      {!channel && <AppText>ChatRoom</AppText>}
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={selectedChannel => setChannel(selectedChannel)}
      />
      {channel && (
        <Channel channel={channel}>
          {/* <HStack
            style={{
              padding: perfectSize(15),
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={{width: perfectSize(22)}}
              onPress={() => setChannel(null)}>
              <AntDesign name="arrowleft" size={perfectSize(22)} />
            </TouchableOpacity>
            <AppText style={{fontSize: perfectSize(16), fontWeight: '500'}}>
              {' '}
              {channel.data?.name || 'Unnamed Channel'}
            </AppText>
            <View
              style={{
                width: perfectSize(22),
              }}
            />
          </HStack> */}
          <View>
            <TouchableOpacity
              style={{width: perfectSize(22)}}
              onPress={() => setChannel(null)}>
              <AntDesign name="arrowleft" size={perfectSize(22)} />
            </TouchableOpacity>
            <AppText style={{fontSize: perfectSize(16), fontWeight: '500'}}>
              {' '}
              {channel.data?.name || 'Unnamed Channel'}
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
      {/* {!channel && (
        <View style={styles.iconWrapper}>
          <Ionicons
            name="chatbox-ellipses-outline"
            style={styles.icon}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
      )} */}
      {/* <CreateChatModal
        open={showModal}
        onPressCancel={() => setShowModal(false)}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
});

export default ChatRoom;
