import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/images'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../constants/fonts'
import { COLORS } from '../../constants/colors'
import { useFirstWellcome } from './hooks'
import perfectSize from '../../utils/responsiveSize'
import AppButton from '../../components/Buttons'
import Avatar from '../../components/Elements/Avatar'
import IonIcons from 'react-native-vector-icons/Ionicons'
import AppText from '../../components/Elements/AppText'
import HStack from '../../components/Elements/HStack'
import Hobbies from '../../components/Elements/Hobbies'

const FirstWellcomeScreen = () => {
  const { handleGuestPress } = useFirstWellcome()
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.item}>
          <View style={styles.avatarGrid}>
            <Avatar img={IMAGES.userImage} style={styles.avatar} />
            <View style={styles.checkView}>
              <IonIcons name="checkmark-sharp" style={styles.check} />
            </View>
          </View>
          <AppText style={styles.name}>Bintang Wisata</AppText>
          <AppText style={styles.location} numberOfLines={1} ellipsizeMode="tail">
            From Jakarta
          </AppText>
          <AppText style={styles.userLabel}>✋ Hi! I'm Hannah, a software engineer by day...</AppText>
          <View style={styles.hobbiesGrid}>
            <Hobbies interest_topics="Sports" style={styles.badge} titleStyle={styles.badgeTitle} />
            <Hobbies interest_topics="Music" style={[styles.badge, styles.ml8]} titleStyle={styles.badgeTitle} />
          </View>
        </View>
        <Text style={styles.title}>You have been accepted !</Text>
        <Text style={styles.desc}>Congratulations your account has been accepted into Claris!</Text>
      </View>
      <AppButton onPress={handleGuestPress} title="Enter" style={styles.btn} labelStyle={styles.btnLabel} />
    </SafeAreaView>
  )
}

export default FirstWellcomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#131115',
    padding: perfectSize(24),
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  avatarGrid: {
    position: 'relative',
  },
  avatar: {
    height: perfectSize(190),
    width: perfectSize(190),
  },
  checkView: {
    position: 'absolute',
    right: perfectSize(20),
    top: perfectSize(-8),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: perfectSize(48),
    width: perfectSize(48),
    borderRadius: perfectSize(70),
    backgroundColor: '#008A05',
  },
  check: {
    fontSize: perfectSize(30),
    color: '#fff',
  },
  name: {
    fontSize: perfectSize(22),
    fontFamily: FONTS.quicksandBold,
    color: '#fff',
  },
  location: {
    fontSize: perfectSize(15),
    fontFamily: FONTS.quicksandMedium,
    color: '#fff',
    marginTop: perfectSize(4),
  },
  userLabel: {
    fontSize: perfectSize(14),
    fontFamily: FONTS.quicksandMedium,
    color: '#fff',
    maxWidth: '90%',
    textAlign: 'center',
    marginVertical: perfectSize(12),
  },
  hobbiesGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#FFFFFF14',
  },
  ml8: {
    marginLeft: perfectSize(8),
  },
  badgeTitle: {
    color: '#fff',
  },
  title: {
    fontFamily: FONTS.quicksandBold,
    color: '#F6475F',
    textAlign: 'center',
    fontSize: perfectSize(32),
    marginTop: perfectSize(40),
    marginBottom: perfectSize(17),
  },
  desc: {
    fontFamily: FONTS.quicksandMedium,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: perfectSize(16),
  },
  btn: {
    height: perfectSize(48),
    borderRadius: perfectSize(16),
  },
  btnLabel: {
    fontSize: perfectSize(18),
    color: '#764837',
    fontFamily: FONTS.quicksandMedium,
    textTransform: 'none',
    letterSpacing: 0.36,
  },
})
