import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import edit from '../../assets/icons/Edit.png';
import tiktok from '../../assets/icons/tiktok.png';
import userImg from '../../assets/images/userImg.png';
import {
  AppButton,
  AppText,
  Avatar,
  Badge,
  Divider,
  Hobbies,
  LoginGuest,
  ReadMore,
  Stack,
  Title,
} from '../../components';
import {COLORS} from '../../constants';
import {colors, perfectSize} from '../../utils';
import {useProfile} from './hooks';

const ProfileScreen = () => {
  // const disapatch = useDispatch()
  const {user, isAuthenticated, navigateToSettings, navigateToEditProfile} =
    useProfile();

  // const handleGetProfileData = useCallback(async () => {
  //   if (user?.id) {
  //     const res = await getProfile(user?.id)
  //     disapatch(setproFileData(res.data))
  //   }
  // }, [disapatch])
  // // console.log('user', user?.Profile_pic)
  // useEffect(() => {
  //   handleGetProfileData()
  // }, [handleGetProfileData])
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <FormTask /> */}
      {isAuthenticated ? (
        <View style={styles.mainSubContainer}>
          <View style={styles.infoGrid}>
            <Stack>
              <View style={styles.topHeader}>
                <AppText style={styles.headerTitle}>Profile</AppText>
                <View style={styles.badges}>
                  <Pressable style={styles.xpBadge}>
                    <Ionicons name="star" style={styles.badgeIcon} />
                    <AppText style={styles.badgeTitle}>240 xp</AppText>
                  </Pressable>
                  <Pressable
                    onPress={navigateToSettings}
                    style={[styles.xpBadge, styles.settBadge]}>
                    <Ionicons
                      name="settings-outline"
                      style={styles.settBadgeIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </Stack>
            <ScrollView
              style={styles.avatarScrollView}
              showsVerticalScrollIndicator={false}>
              <Stack style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.avatarGrid}>
                    <Avatar
                      img={
                        user?.Profile_pic?.url
                          ? {uri: user?.Profile_pic?.url}
                          : userImg
                      }
                      style={styles.avatar}
                    />
                    <Badge
                      style={styles.badge}
                      title="0 Missed bookings"
                      variant="success"
                    />
                  </View>
                  <View>
                    <Text allowFontScaling={false} style={styles.title}>
                      {user?.name}
                    </Text>
                    <Text allowFontScaling={false} style={styles.from}>
                      From {user?.City}
                    </Text>
                  </View>
                  <View style={styles.socialGrid}>
                    <Pressable>
                      <Ionicons
                        name="logo-instagram"
                        style={styles.socialIcon}
                      />
                    </Pressable>
                    <Divider style={styles.divider} />
                    <Pressable>
                      <Image source={tiktok} style={styles.socialImg} />
                      {/* <Ionicons name="logo-tiktok" style={styles.socialIcon} /> */}
                    </Pressable>
                  </View>
                  <View style={styles.btnGrid}>
                    <AppButton
                      img={edit}
                      labelStyle={styles.btnLabel}
                      onPress={navigateToEditProfile}
                      style={styles.btn}
                      title="Edit Profile"
                      variant="outline"
                    />
                  </View>
                </View>
                {/* need to change this */}
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Bio" />
                {user?.bio ? (
                  <ReadMore
                    // desc="✋ Hi! I'm Alex, a software engineer by day 💻, and a literature-loving artist by night 🎨.
                    //   Positive vibes only! Let's connect ✋ Hi! I'm Alex, a software engineer by day 💻, and a
                    //   literature-loving artist by night 🎨. Positive vibes only! Let's connect connect ✋ Hi! I'm Alex, a
                    //   software engineer by day 💻, and a literature-loving artist by night 🎨. Positive vibes only! Let's
                    //   connect"
                    desc={user?.bio}
                  />
                ) : (
                  <Text allowFontScaling={false}>N/A</Text>
                )}
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Interests" />
                <View style={styles.hobbies}>
                  {user?.user_interest_topics_turbo_id?.map((item, ind) => (
                    <Hobbies
                      key={ind}
                      {...item}
                      showIcons={true}
                      style={styles.hobbiesBadge}
                    />
                  ))}
                </View>
              </Stack>
            </ScrollView>
          </View>
        </View>
      ) : (
        <LoginGuest />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainSubContainer: {
    flex: 1,
  },
  avatarScrollView: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  infoGrid: {
    flex: 1,
    flexDirection: 'column',
    // rowGap: perfectSize(8),
    // marginTop: perfectSize(8),
    backgroundColor: colors.light,
  },
  content: {
    marginBottom: perfectSize(8),
  },
  stackItem: {
    marginBottom: perfectSize(8),
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: perfectSize(18),
    fontWeight: '700',
    color: colors.dark,
  },
  xpBadge: {
    height: perfectSize(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(34),
    paddingHorizontal: perfectSize(12),
    backgroundColor: colors.light,
  },
  settBadge: {
    borderRadius: perfectSize(12),
    marginLeft: perfectSize(8),
  },
  badgeIcon: {
    fontSize: perfectSize(16),
    color: colors.danger,
  },
  badgeTitle: {
    fontSize: perfectSize(14),
    color: colors.info,
    marginLeft: perfectSize(4),
  },
  settBadgeIcon: {
    fontSize: perfectSize(20),
    color: colors.dark,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: perfectSize(140),
    width: perfectSize(140),
  },
  avatarGrid: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: -6,
    height: perfectSize(30),
    backgroundColor: colors.light,
  },
  title: {
    fontSize: perfectSize(18),
    fontWeight: '700',
    // fontFamily: fonts.inter600,
    color: colors.dark,
    textAlign: 'center',
    marginTop: perfectSize(12),
  },
  from: {
    fontSize: perfectSize(12),
    // fontFamily: fonts.inter400,
    color: colors.info,
    textAlign: 'center',
    marginTop: perfectSize(4),
  },
  socialGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: perfectSize(16),
  },
  socialIcon: {
    fontSize: perfectSize(26),
    color: colors.slate1,
  },
  socialImg: {
    height: perfectSize(24),
    width: perfectSize(24),
    resizeMode: 'contain',
  },
  divider: {
    height: perfectSize(34),
    width: 1,
    marginHorizontal: perfectSize(16),
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: perfectSize(16),
  },
  btn: {
    flex: 1,
    height: perfectSize(48),
    borderRadius: perfectSize(16),
  },
  btnLabel: {
    fontSize: perfectSize(16),
  },
  hobbies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // gap: perfectSize(8),
  },
  hobbiesBadge: {
    marginRight: perfectSize(8),
    marginBottom: perfectSize(8),
  },
});
