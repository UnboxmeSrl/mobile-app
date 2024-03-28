import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'

import { IMAGES } from '../../assets/images'
import AppButton from '../../components/Buttons'
import AppText from '../../components/Elements/AppText'
import Avatar from '../../components/Elements/Avatar'
import Hobbies from '../../components/Elements/Hobbies'
import { COLORS } from '../../constants/colors'
import { FONTS } from '../../constants/fonts'
import perfectSize from '../../utils/responsiveSize'

import { useFirstWellcome } from './hooks'

const FirstWellcomeScreen = () => {
  const { handleGuestPress } = useFirstWellcome()
  const user = useSelector((state) => state.authSlice.loginData)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.item}>
          <View style={styles.avatarGrid}>
            <Avatar
              img={user?.Profile_pic?.url ? { uri: user?.Profile_pic?.url } : IMAGES.userImage}
              style={styles.avatar}
            />
            <View style={styles.checkView}>
              <IonIcons name="checkmark-sharp" style={styles.check} />
            </View>
          </View>
          <AppText style={styles.name}>{user?.name ?? 'N/A'}</AppText>
          <AppText ellipsizeMode="tail" numberOfLines={1} style={styles.location}>
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
        <Text style={styles.desc}>Congratulations your account has been accepted into Claris!</Text>
      </View>
      <AppButton labelStyle={styles.btnLabel} onPress={handleGuestPress} style={styles.btn} title="Enter" />
    </SafeAreaView>
  )
}

export default FirstWellcomeScreen

const styles = StyleSheet.create({
  avatar: {
    height: perfectSize(190),
    width: perfectSize(190),
  },
  avatarGrid: {
    position: 'relative',
  },
  check: {
    color: '#fff',
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
    backgroundColor: '#008A05',
    top: perfectSize(-8),
    justifyContent: 'center',
    width: perfectSize(48),
  },
  badgeTitle: {
    color: '#fff',
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
    // backgroundColor: 'cyan',
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
    backgroundColor: '#131115',
    paddingVertical: perfectSize(24),
    // backgroundColor: 'yellow',
  },
  btnLabel: {
    color: '#764837',
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
    backgroundColor: '#20070B',
    width: '100%',
  },
  location: {
    color: '#fff',
    fontFamily: FONTS.quicksandMedium,
    fontSize: perfectSize(15),
    marginTop: perfectSize(4),
  },
  ml8: {
    marginLeft: perfectSize(8),
  },
  name: {
    fontFamily: FONTS.quicksandBold,
    color: '#fff',
    fontSize: perfectSize(22),
  },
  title: {
    color: '#F6475F',
    fontFamily: FONTS.quicksandBold,
    fontSize: perfectSize(32),
    marginBottom: perfectSize(17),
    marginTop: perfectSize(40),
    textAlign: 'center',
    width: '80%',
  },
  userLabel: {
    fontFamily: FONTS.quicksandMedium,
    color: '#fff',
    fontSize: perfectSize(14),
    marginVertical: perfectSize(12),
    maxWidth: '90%',
    textAlign: 'center',
  },
})
