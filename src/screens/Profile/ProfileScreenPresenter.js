import React, { useCallback, useEffect } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'

// import { Avatar } from '@components/Avatar'
import AppText from '@components/Elements/AppText'
import Avatar from '@components/Elements/Avatar'
import Badge from '@components/Elements/Badge'
import Divider from '@components/Elements/Divider'
import Stack from '@components/Elements/Stack'
import Title from '@components/Elements/Title'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { RouteContainer } from '@components/RouteContainer'
import { Subtitle } from '@components/Text'
import { COLORS } from '@const'

import edit from '../../assets/icons/Edit.png'
import tiktok from '../../assets/icons/tiktok.png'
import userImg from '../../assets/images/userImg.png'
import AppButton from '../../components/Buttons'
import Hobbies from '../../components/Elements/Hobbies'
import ReadMore from '../../components/Elements/ReadMore'
import { setproFileData, userDetail } from '../../redux/slices/authSlice'
import { getProfile } from '../../services'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'

export const ProfileScreenPresenter = ({
  navigateTikTokModal,
  fullName,
  city,
  tiktokUsername,
  isAuthenticated,
  hasQuestionnaire,
  navigateToQuestionnaire,
  skinType,
  skincareRoutine,
  creams,
  brands,
  navigateToInvite,
  navigateToSettings,
  navigateToEditProfile,
  source,
  navigation,
}) => {
  const disapatch = useDispatch()
  const LoginDetail = useSelector((state) => state.authSlice.loginData)
  const user = useSelector(userDetail)
  const handleGetProfileData = useCallback(async () => {
    const res = await getProfile(LoginDetail.id)
    console.log('check', res)
    disapatch(setproFileData(res.data))
  }, [disapatch, LoginDetail])

  useEffect(() => {
    handleGetProfileData()
  }, [handleGetProfileData])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <FormTask /> */}
      {isAuthenticated ? (
        <View style={{ flex: 1 }}>
          <View style={styles.infoGrid}>
            <Stack>
              <View style={styles.topHeader}>
                <AppText style={styles.headerTitle}>Profile</AppText>
                <View style={styles.badges}>
                  <Pressable style={styles.xpBadge}>
                    <Ionicons name="star" style={styles.badgeIcon} />
                    <AppText style={styles.badgeTitle}>240 xp</AppText>
                  </Pressable>
                  <Pressable onPress={navigateToSettings} style={[styles.xpBadge, styles.settBadge]}>
                    <Ionicons name="settings-outline" style={styles.settBadgeIcon} />
                  </Pressable>
                </View>
              </View>
            </Stack>
            <ScrollView style={{ flex: 1 }}>
              <Stack style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.avatarGrid}>
                    <Avatar
                      img={user?.Profile_pic?.url ? { uri: user?.Profile_pic?.url } : userImg}
                      style={styles.avatar}
                    />
                    <Badge title="0 Missed bookings" style={styles.badge} variant="success" />
                  </View>
                  <View>
                    <Text style={styles.title}>{user?.name}</Text>
                    <Text style={styles.from}>From {user?.City}</Text>
                  </View>
                  <View style={styles.socialGrid}>
                    <Pressable onPress={navigateToQuestionnaire}>
                      <Ionicons name="logo-instagram" style={styles.socialIcon} />
                    </Pressable>
                    <Divider style={styles.divider} />
                    <Pressable>
                      <Image source={tiktok} style={styles.socialImg} />
                      {/* <Ionicons name="logo-tiktok" style={styles.socialIcon} /> */}
                    </Pressable>
                  </View>
                  <View style={styles.btnGrid}>
                    <AppButton
                      title="Edit Profile"
                      img={edit}
                      variant="outline"
                      style={styles.btn}
                      labelStyle={styles.btnLabel}
                      onPress={navigateToEditProfile}
                    />
                  </View>
                </View>
                {/* need to change this */}
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Bio" />
                <ReadMore
                  // desc="✋ Hi! I'm Alex, a software engineer by day 💻, and a literature-loving artist by night 🎨.
                  //   Positive vibes only! Let's connect ✋ Hi! I'm Alex, a software engineer by day 💻, and a
                  //   literature-loving artist by night 🎨. Positive vibes only! Let's connect connect ✋ Hi! I'm Alex, a
                  //   software engineer by day 💻, and a literature-loving artist by night 🎨. Positive vibes only! Let's
                  //   connect"
                  desc={user?.bio}
                />
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Intrests" />
                <View style={styles.hobbies}>
                  {user?.user_interest_topics_turbo_id?.map((item, ind) => (
                    <Hobbies key={ind} {...item} showIcons={true} style={styles.hobbiesBadge} />
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
  )
}
const styles = StyleSheet.create({
  infoGrid: {
    flex: 1,
    flexDirection: 'column',
    // rowGap: perfectSize(8),
    marginTop: perfectSize(8),
    paddingBottom: perfectSize(8),
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
    paddingTop: perfectSize(16),
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
})
const Container = styled(RouteContainer)`
  flex: 1;
`
const Center = styled.View`
  align-items: center;
  justify-content: center;
  top: -20px;
`
const Column = styled.View`
  flex-direction: row;
`
const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 20px;
`
const SmallButton = styled(IconButton)`
  margin-left: 4px;
`
const Tile = styled.TouchableOpacity`
  background-color: ${COLORS.tertiary};
  border-radius: 20px;
  margin: 12px 20px;
  padding: 20px;
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Labels = styled(Subtitle)``
