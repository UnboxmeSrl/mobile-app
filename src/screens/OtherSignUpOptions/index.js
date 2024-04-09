import React, { useCallback, useState, useRef } from 'react'
import styled from 'styled-components/native'
import { Button } from '@components/Button'
import { Policies } from '@components/Policies'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'
import { BoldTextLink } from '@components/TextButton'
import { CreatePassword, SignUpWithEmail } from '../../components/AuthSheets'
import { FONTS } from '../../constants/fonts'
import { useNavigation } from 'react-navigation-hooks'
import { MAIN_NAVIGATOR, MODAL_NAMES } from '@const/navigation'
import { reset } from '@services'
import { StyleSheet, Text } from 'react-native'
import { COLORS } from '../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

export const OtherSingUpOptionsScreen = () => {
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()
  const ref = useRef()
  const createPasswordRef = useRef()

  const navigateToEmailModal = () => {
    ref?.current?.open()
    // navigate(MODAL_NAMES.SignUpEmail)
  }

  const closeSignUpSheet = () => {
    ref?.current?.close()
    openCreatePasswordSheet()
  }

  const openCreatePasswordSheet = () => {
    console.log('rtesting')
    ref?.current?.close()
    createPasswordRef?.current?.open()
  }

  const navigateToPhoneModal = () => {
    navigate(MODAL_NAMES.AuthPhone)
  }
  const onSuccess = useCallback(() => {
    reset(MAIN_NAVIGATOR)
  }, [])

  return (
    <RouteContainer tKey={'signUp.signUp'} withArrow withPadding>
      <Header>
        {/* <Body tKey={'signUp.createAccount'} /> */}
        <Text style={styles.descriptionText}>
          {`Create your account to be able to be selected into the `}
          <Text style={styles.innerText}>{`Claris community`}</Text>.
        </Text>
        <Text
          style={styles.descriptionSecond}
        >{`The community accepts both influencers and models of all genders.`}</Text>
      </Header>
      <Buttons>
        {/* <AppleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <FacebookLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <GoogleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <OrLogInText color={COLORS.dark} tKey={'signUp.orSignUp'} /> */}
        <Button loading={loading} onPress={navigateToEmailModal} tKey={'signUp.withEmail'} />
        {/* <Button loading={loading} onPress={navigateToPhoneModal} tKey={'signUp.withPhone'} light /> */}
      </Buttons>
      <PoliciesPart dark />
      <SignUpWithEmail ref={ref} closeSignUpSheet={closeSignUpSheet} />
      <CreatePassword ref={createPasswordRef} />
      {/* <ForgotPassword ref={ref} /> */}
    </RouteContainer>
  )
}

const Header = styled.View`
  flex: 0.2;
  justify-content: center;
`
const Body = styled(BodyText)`
  text-align: center;
  font-family: ${FONTS.quicksand};
`
const Buttons = styled.View`
  flex: 0.7;
  justify-content: flex-end;
`
const PoliciesPart = styled(Policies)`
  flex: 0.1;
  justify-content: flex-end;
`
const OrLogInText = styled(BoldTextLink)`
  margin-bottom: 24px;
  margin-top: 24px;
`

const styles = StyleSheet.create({
  innerText: {
    fontFamily: FONTS.quicksandBold,
  },
  descriptionText: {
    paddingHorizontal: scale(10),
    fontFamily: FONTS.quicksand,
    color: COLORS.greyFont,
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginTop: verticalScale(-20),
    lineHeight: verticalScale(15),
  },
  descriptionSecond: {
    paddingHorizontal: scale(10),
    fontFamily: FONTS.quicksand,
    color: COLORS.greyFont,
    fontSize: moderateScale(14),
    textAlign: 'center',
    lineHeight: verticalScale(15),
  },
})
