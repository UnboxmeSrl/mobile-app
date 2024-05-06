import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../../assets';
import {AppButton, AppText, Hobbies} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {perfectSize} from '../../utils';
import {useFirstWelcome} from './hooks';

const FirstWelcomeScreen = () => {
  const {handleGuestPress} = useFirstWelcome();
  const user = useSelector(state => state.authSlice.loginData);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.item}>
          <View style={styles.avatarGrid}>
            <View style={styles.profileImageContainer}>
              {user?.Profile_pic?.url ? (
                <FastImage
                  resizeMode="cover"
                  tintColor={COLORS.newPrimary}
                  source={{
                    priority: FastImage.priority.high,
                    uri: user?.Profile_pic?.url,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  source={IMAGES.profileTemplate}
                  tintColor={COLORS.newPrimary}
                  style={styles.profileImage}
                />
              )}
            </View>
            {/* <Avatar
              img={user?.Profile_pic?.url ? { uri: user?.Profile_pic?.url } : IMAGES.userImage}
              style={styles.avatar}
            /> */}
            <View style={styles.checkView}>
              <IonIcons name="checkmark-sharp" style={styles.check} />
            </View>
          </View>
          <AppText style={styles.name}>{user?.name ?? 'N/A'}</AppText>
          <AppText
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.location}>
            From {user?.City ?? 'N/A'}
          </AppText>
          <AppText style={styles.userLabel}>{user?.bio}</AppText>
          <View style={styles.hobbiesGrid}>
            {user?.user_interest_topics_turbo_id?.map((e, i) => (
              <Hobbies
                interest_topics={e?.interest_topics}
                key={i}
                style={styles.badge}
                titleStyle={styles.badgeTitle}
              />
            ))}
            {/* <Hobbies interest_topics="Music" style={[styles.badge, styles.ml8]} titleStyle={styles.badgeTitle} /> */}
          </View>
        </View>
        <Text style={styles.title}>You have been accepted !</Text>
        <Text style={styles.desc}>
          Congratulations your account has been accepted into Claris!
        </Text>
      </View>
      <AppButton
        labelStyle={styles.btnLabel}
        onPress={handleGuestPress}
        style={styles.btn}
        title="Enter"
      />
    </SafeAreaView>
  );
};

export default FirstWelcomeScreen;

const styles = StyleSheet.create({
  profileImageContainer: {
    height: perfectSize(190),
    width: perfectSize(190),
    borderRadius: perfectSize(273),
    backgroundColor: COLORS.thistle,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  avatar: {
    height: perfectSize(190),
    width: perfectSize(190),
  },
  avatarGrid: {
    position: 'relative',
  },
  check: {
    color: COLORS.white,
    fontSize: perfectSize(30),
  },
  badge: {
    backgroundColor: '#FFFFFF14',
  },
  checkView: {
    alignItems: 'center',
    flexDirection: 'column',
    height: perfectSize(48),
    position: 'absolute',
    borderRadius: perfectSize(70),
    right: perfectSize(20),
    backgroundColor: COLORS.micGreen,
    top: perfectSize(-8),
    justifyContent: 'center',
    width: perfectSize(48),
  },
  badgeTitle: {
    color: COLORS.white,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  desc: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: perfectSize(16),
    textAlign: 'center',
    width: '80%',
  },
  hobbiesGrid: {
    alignItems: 'center',
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: perfectSize(16),
    height: perfectSize(48),
    width: '80%',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.chinBlack,
    paddingVertical: perfectSize(24),
  },
  btnLabel: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: perfectSize(18),
    letterSpacing: 0.36,
    textTransform: 'none',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(24),
    paddingVertical: perfectSize(28),
    backgroundColor: COLORS.licorice,
    width: '100%',
  },
  location: {
    color: COLORS.white,
    fontFamily: FONTS.quicksandMedium,
    fontSize: perfectSize(15),
    marginTop: perfectSize(4),
  },
  ml8: {
    marginLeft: perfectSize(8),
  },
  name: {
    fontFamily: FONTS.quicksandBold,
    color: COLORS.white,
    fontSize: perfectSize(22),
  },
  title: {
    color: COLORS.magicPotion,
    fontFamily: FONTS.quicksandBold,
    fontSize: perfectSize(32),
    marginBottom: perfectSize(17),
    marginTop: perfectSize(40),
    textAlign: 'center',
    width: '80%',
  },
  userLabel: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    fontSize: perfectSize(14),
    marginVertical: perfectSize(12),
    maxWidth: '90%',
    textAlign: 'center',
  },
});
