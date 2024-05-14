import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import {COLORS, FONTS} from '../../constants';
import {colors, perfectSize} from '../../utils';
import {useProfile} from './hooks';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import {IMAGES} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const {
    user,
    level,
    isInstaAccount,
    isTiktokAccount,
    isAuthenticated,
    handleOpenLink,
    navigateToSettings,
    navigateToEditProfile,
    handleSharePromoCode,
  } = useProfile();

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
                  <TouchableOpacity
                    onPress={navigateToEditProfile}
                    style={styles.btnGrid}
                    activeOpacity={0.7}>
                    <Text
                      allowFontScaling={false}
                      style={styles.editProfileBtnText}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
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
              <View style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.profilePicMainContainer}>
                    <Pressable
                      style={styles.instagramContainer}
                      onPress={() =>
                        handleOpenLink(
                          'instagram://',
                          'https://www.instagram.com/',
                        )
                      }>
                      <Ionicons
                        name="logo-instagram"
                        style={[
                          styles.socialIcon,
                          isInstaAccount && styles.enabledSocialIcon,
                        ]}
                      />
                    </Pressable>
                    <View style={styles.avatarGrid}>
                      <Avatar
                        img={
                          user?.Profile_pic?.url
                            ? {uri: user?.Profile_pic?.url}
                            : userImg
                        }
                        style={styles.avatar}
                      />
                      {/* <Badge
                      style={styles.badge}
                      title="0 Missed bookings"
                      variant="success"
                    /> */}
                    </View>
                    <Pressable
                      style={styles.tiktokContainer}
                      onPress={() =>
                        handleOpenLink('tiktok://', 'https://www.tiktok.com/')
                      }>
                      {/* <Image source={tiktok} style={styles.socialImg} /> */}
                      <Ionicons
                        name="logo-tiktok"
                        style={[
                          styles.socialIcon,
                          isTiktokAccount && styles.enabledSocialIcon,
                        ]}
                      />
                    </Pressable>
                  </View>
                  <View>
                    <Text allowFontScaling={false} style={styles.title}>
                      {user?.name}
                    </Text>
                    <Text allowFontScaling={false} style={styles.from}>
                      From {user?.City}
                    </Text>
                  </View>
                </View>

                <View style={styles.levelXpContainer}>
                  <View style={styles.levelContainer}>
                    <Text allowFontScaling={false} style={styles.levelText}>
                      {`LEVEL ${level}`}
                    </Text>
                  </View>
                  <View style={styles.xpContainer}>
                    <View style={styles.xpInnerContainer}>
                      <Ionicons name="star" style={styles.badgeIcon} />
                      <AppText style={styles.badgeTitle}>
                        {`${user?.xp}`} xp
                      </AppText>
                    </View>
                  </View>
                </View>
                <View style={styles.profileProgressBarContainer}>
                  <SimpleGradientProgressbarView
                    style={styles.profileProgressBar}
                    fromColor={COLORS.crayola}
                    toColor={COLORS.red}
                    progress={level / 10}
                    cornerRadius={5.0}
                  />
                </View>

                <View style={styles.invitationDescriptionContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.invitationDescription}>
                    Share your code invitation code with friends!
                  </Text>
                </View>

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.shareGradientView}
                  colors={[COLORS.newPrimary, COLORS.tickleMePink]}>
                  <View style={styles.shareXpContainer}>
                    <Ionicons name="star" style={styles.shareXpStarIcon} />
                    <AppText style={styles.shareXpText}>100 xp</AppText>
                  </View>
                  <View style={styles.profileCodeContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.profileCode}
                      selectable>
                      {`${user?.promocode}`}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <TouchableOpacity
                    style={styles.shareIconContainer}
                    hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                    onPress={handleSharePromoCode}
                    activeOpacity={0.7}>
                    <Image source={IMAGES.share} style={styles.shareIcon} />
                  </TouchableOpacity>
                </LinearGradient>

                <View style={styles.stackItem}>
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
                </View>

                <View style={styles.stackItem}>
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
                </View>
              </View>
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
  enabledSocialIcon: {
    color: COLORS.black,
  },
  shareIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  shareIconContainer: {
    width: scale(50),
  },
  profileCode: {
    fontFamily: FONTS.quicksandBold,
    fontSize: perfectSize(18),
    color: colors.white,
    marginLeft: scale(10),
  },
  profileCodeContainer: {
    width: scale(178),
    alignItems: 'center',
  },
  shareXpText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: perfectSize(14),
    color: colors.white,
    marginLeft: scale(10),
  },
  shareXpStarIcon: {
    fontSize: perfectSize(18),
    ...Platform.select({
      android: {
        marginTop: verticalScale(2),
      },
    }),
    color: colors.white,
  },
  shareXpContainer: {
    width: scale(50),
    flexDirection: 'row',
    marginLeft: scale(20),
  },
  shareGradientView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(15),
    alignItems: 'center',
    height: verticalScale(48),
    marginTop: verticalScale(20),
  },
  invitationDescription: {
    color: COLORS.davyGrey,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(12),
  },
  invitationDescriptionContainer: {
    marginTop: verticalScale(20),
    marginLeft: scale(5),
  },
  xpInnerContainer: {
    flexDirection: 'row',
  },
  xpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
    height: verticalScale(35),
    width: scale(120),
    borderRadius: moderateScale(34),
    borderColor: COLORS.newPrimary,
    borderWidth: moderateScale(2),
  },
  levelText: {
    color: COLORS.newPrimary,
    textAlign: 'center',
    fontFamily: FONTS.quicksandMedium,
    fontSize: moderateScale(14),
  },
  levelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cultured,
    height: verticalScale(35),
    width: scale(120),
    borderRadius: moderateScale(34),
  },
  levelXpContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(10),
  },
  tiktokContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instagramContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  profileProgressBarContainer: {
    flex: 1,
    marginTop: verticalScale(10),
    height: verticalScale(20),
    backgroundColor: COLORS.cultured,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileProgressBar: {
    width: '97%',
    height: verticalScale(14),
    marginVertical: verticalScale(20),
  },

  editProfileBtnText: {
    color: COLORS.newPrimary,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(12),
  },
  mainSubContainer: {
    backgroundColor: COLORS.white,
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
    backgroundColor: colors.white,
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: perfectSize(16),
    paddingHorizontal: perfectSize(24),
    marginBottom: perfectSize(8),
  },
  stackItem: {
    marginVertical: perfectSize(18),
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
    fontFamily: FONTS.quicksandMedium,
    fontSize: perfectSize(14),
    color: colors.danger,
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
    borderWidth: moderateScale(4),
    borderColor: COLORS.newPrimary,
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
    fontSize: perfectSize(24),
    color: colors.slate1,
  },
  socialImg: {
    height: perfectSize(24),
    width: perfectSize(24),
    resizeMode: 'contain',
  },
  divider: {
    height: perfectSize(38),
    width: scale(2),
    backgroundColor: COLORS.white,
    marginRight: perfectSize(20),
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(30),
    width: scale(80),
    borderRadius: moderateScale(8),
    borderColor: COLORS.newPrimary,
    borderWidth: moderateScale(1),
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
