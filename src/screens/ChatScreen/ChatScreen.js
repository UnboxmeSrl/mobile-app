import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {useChatClient} from '../../hooks';
import {useChat} from './hooks';
import {COLORS} from '../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {perfectSize} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppText} from '../../components';

const ChatScreen = () => {
  const {channel, isChannelLoaded, onResetChannel} = useChat();
  // console.log('Client Ready', clientIsReady);
  return (
    <SafeAreaView style={styles.container}>
      {isChannelLoaded ? (
        <Channel channel={channel}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              style={{width: perfectSize(22)}}
              onPress={onResetChannel}>
              <AntDesign name="arrowleft" size={perfectSize(22)} />
            </TouchableOpacity>
            <AppText style={{fontSize: perfectSize(16), fontWeight: '500'}}>
              {channel.data?.name || 'Unnamed Channel'}
            </AppText>
            <View
              style={{
                width: perfectSize(22),
              }}
            />
          </View>
          <MessageList />
          <MessageInput
            showMoreOptions={false}
            additionalTextareaProps={{commands: []}}
          />
        </Channel>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: perfectSize(40),
    paddingHorizontal: perfectSize(20),
  },
});
