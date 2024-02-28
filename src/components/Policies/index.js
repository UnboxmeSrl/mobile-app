import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { MODAL_NAMES } from '@const/navigation'
import { FONTS } from '../../constants/fonts'

export const Policies = ({ style, dark }) => {
  const { navigate } = useNavigation()
  const navigateToWebview = useCallback(
    (uri) => {
      navigate({ params: { uri }, routeName: MODAL_NAMES.WebView })
    },
    [navigate]
  )
  const navigateToTerms = () => navigateToWebview('https://policies.google.com/terms?hl=en-US')
  const navigateToPrivacy = () => navigateToWebview('https://policies.google.com/privacy?hl=en-US')
  const color = dark ? COLORS.black : COLORS.white

  return (
    <View style={style}>
      <Row>
        <Text color={color} tKey={'auth.bySigning'} />
      </Row>
      <Row>
        <Button color={color} fontSize={14} onPress={navigateToTerms} small tKey={'termsOfUse'} />
        <Text color={color} tKey={'and'} />
        <Button color={color} onPress={navigateToPrivacy} tKey={'privacyPolicy'} />
      </Row>
    </View>
  )
}

const View = styled.View`
  align-items: center;
`
const Row = styled.View`
  flex-direction: row;
`
const Text = styled(SmallText)`
  font-family: ${FONTS.quicksand};
`

const Button = styled(TextButton).attrs({
  textStyle: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: FONTS.quicksandBold,
  },
})``
