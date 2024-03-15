/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
import { Instagram } from '@components/Auth/Instagram'
// import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { FormTask } from '@components/FormTask'
import { IconButton } from '@components/IconButton'
import { LoginGuest } from '@components/LoginGuest'
import { Points } from '@components/Points'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, ButtonText, Caption, H3, Subtitle, TinyText } from '@components/Text'
import { COLORS } from '@const'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Switch,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native'
import AppText from '@components/Elements/AppText'
import Avatar from '@components/Elements/Avatar'
import Badge from '@components/Elements/Badge'
import Divider from '@components/Elements/Divider'
import Stack from '@components/Elements/Stack'
import Title from '@components/Elements/Title'
import AppButton from '../../components/Buttons'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import userImg from '../../assets/images/userImg.png'
import edit from '../../assets/icons/Edit.png'
import ball from '../../assets/icons/Soccer-Ball.png'
import art from '../../assets/icons/Artist-Palette.png'
import mic from '../../assets/icons/Microphone.png'
import plan from '../../assets/icons/Airplane.png'
import Hobbies from '../../components/Elements/Hobbies'
import ReadMore from '../../components/Elements/ReadMore'
import tiktok from '../../assets/icons/tiktok.png'
import { color } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import { SCREEN_NAMES } from '../../constants/navigation'
import { useSelector } from 'react-redux'
import { setproFileData, userDetail } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../services'

const EditIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'create-outline'} size={24} />
const AddPersonIcon = () => <Ionicons color={COLORS.achromaticBlack} name={'person-add-outline'} size={24} />

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
  const intrestData = [
    { title: 'Sport', icon: ball },
    { title: 'Music', icon: mic },
    { title: 'Digital Art', icon: art },
    { title: 'Travel', icon: plan },
  ]
<<<<<<< HEAD

=======
  console.log(isAuthenticated, 'auth')
>>>>>>> 2c65a21f52a2c941ed63b927207d65636b606f3c
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
                    <Icon name="star" style={styles.badgeIcon} />
                    <AppText style={styles.badgeTitle}>240 xp</AppText>
                  </Pressable>
                  <Pressable style={[styles.xpBadge, styles.settBadge]} onPress={navigateToSettings}>
                    <Icon name="settings-outline" style={styles.settBadgeIcon} />
                  </Pressable>
                </View>
              </View>
            </Stack>
            <ScrollView style={{ flex: 1 }}>
              <Stack style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.avatarGrid}>
                    <Avatar img={user?.Profile_pic?.url || userImg} style={styles.avatar} />
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
                      onPress={() => navigation.navigate(SCREEN_NAMES.EditProfile)}
                    />
                  </View>
                </View>
                {/* need to change this */}
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Bio" />
                <ReadMore
                  desc="✋ Hi! I'm Alex, a software engineer by day 💻, and a literature-loving artist by night 🎨.
                    Positive vibes only! Let's connect ✋ Hi! I'm Alex, a software engineer by day 💻, and a
                    literature-loving artist by night 🎨. Positive vibes only! Let's connect connect ✋ Hi! I'm Alex, a
                    software engineer by day 💻, and a literature-loving artist by night 🎨. Positive vibes only! Let's
                    connect"
                />
              </Stack>
              <Stack style={styles.stackItem}>
                <Title title="Intrests" />
                <View style={styles.hobbies}>
                  {userDetail?.user_interest_topics_turbo_id?.map((item, ind) => (
                    <Hobbies key={ind} {...item} style={styles.hobbiesBadge} />
                  ))}
                </View>
              </Stack>
            </ScrollView>
          </View>
          {/* <Header>
          <Points />
          <Column>
            <SmallButton Icon={EditIcon} onPress={navigateToEditProfile} />
            <SmallButton
              Icon={() => <Ionicons color={COLORS.achromaticBlack} name={'settings-outline'} size={24} />}
              onPress={navigateToSettings}
            />
          </Column>
        </Header>
        <Center>
          <Avatar source={source} />
          <H3>{fullName}</H3>
          <Caption>{city}</Caption>
        </Center>
        <Button
          bgColor={COLORS.veryLight}
          leftIconName={'logo-tiktok'}
          light
          onPress={navigateTikTokModal}
          tKey={tiktokUsername ? 'onValidation' : 'connectTikTok'}
          tOptions={{ username: `@${tiktokUsername}` }}
        />
        <Instagram bgColor={COLORS.tertiary} light />
        <Tile onPress={navigateToQuestionnaire}>
          <>
            <Row style={{ marginBottom: 12 }}>
              <ButtonText>Health profiling</ButtonText>
              <EditIcon />
            </Row>
            {!hasQuestionnaire ? (
              <BodyText>
                Please fill it out so that we can select only the products that suit you and your type of skin.
              </BodyText>
            ) : (
              <>
                <Row>
                  <BodyText>Skin type</BodyText>
                  <Labels>{skinType}</Labels>
                </Row>
                <Row>
                  <BodyText>Skin routine</BodyText>
                  <Labels>{skincareRoutine ? 'Yes' : 'No'}</Labels>
                </Row>
                <Row>
                  <BodyText>Cream types</BodyText>
                  <Labels>{creams}</Labels>
                </Row>
                <Row>
                  <BodyText>Favourite brands</BodyText>
                  <Labels>{brands.length} brands</Labels>
                </Row>
              </>
            )}
          </>
        </Tile>
        <Tile onPress={navigateToInvite}>
          <Row style={{ marginBottom: 12 }}>
            <ButtonText>Invite a friend</ButtonText>
            <AddPersonIcon />
          </Row>
          <BodyText>and get 300 points Experience!</BodyText>
        </Tile> */}
        </View>
      ) : (
        <LoginGuest />
      )}
      {/* <Button onPress={navigateToOnboarding} tKey={'onboardingTitle'} /> */}
      {/* <Button onPress={navigateToAddresses} tKey={'addresses.title'} /> */}
      {/* <Button onPress={navigateToYourRating} tKey={'Your Rating'} /> */}
      {/* {isAuthenticated ? <Button onPress={navigateToQuestionnaire} tKey={'questionnaire.title'} /> : null} */}
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
