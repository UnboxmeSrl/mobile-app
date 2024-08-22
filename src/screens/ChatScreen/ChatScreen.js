import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {useChatClient} from '../../hooks';
import {useChat} from './hooks';
import {COLORS} from '../../constants';

const ChatScreen = () => {
  const {channel, isChannelLoaded} = useChat();
  // console.log('Client Ready', clientIsReady);
  return (
    <SafeAreaView style={styles.container}>
      {isChannelLoaded ? (
        <Channel channel={channel}>
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
});
