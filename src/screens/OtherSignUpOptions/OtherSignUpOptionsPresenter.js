import React from 'react'
import styled from 'styled-components/native'
import { Button } from '@components/Button'
import { Policies } from '@components/Policies'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText } from '@components/Text'
import { BoldTextLink } from '@components/TextButton'
import { SignUpWithEmail } from '../../components/AuthSheets'
import { FONTS } from '../../constants/fonts'

export const OtherSignUpOptionsPresenter = React.forwardRef(
  ({ navigateToEmailModal, navigateToPhoneModal, onSuccess, loading, setLoading }, ref) => {
    return (
      <RouteContainer tKey={'signUp.signUp'} withArrow withPadding>
        <Header>
          <Body tKey={'signUp.createAccount'} />
        </Header>
        <Buttons>
          {/* <AppleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <FacebookLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <GoogleLogin loading={loading} onSuccess={onSuccess} setLoading={setLoading} />
      <OrLogInText color={COLORS.dark} tKey={'signUp.orSignUp'} /> */}
          <Button loading={loading} onPress={navigateToEmailModal} tKey={'signUp.withEmail'} />
          <Button loading={loading} onPress={navigateToPhoneModal} tKey={'signUp.withPhone'} light />
        </Buttons>
        <PoliciesPart dark />
        <SignUpWithEmail ref={ref} />
        {/* <CreatePassword ref={ref} /> */}
        {/* <ForgotPassword ref={ref} /> */}
      </RouteContainer>
    )
  }
)

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
