import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { MODAL_NAMES } from '@const/navigation'

export const Policies = ({ style, dark }) => {
  const { navigate } = useNavigation()
  const navigateToWebview = useCallback((uri) => {
    navigate({ params: { uri }, routeName: MODAL_NAMES.WebView})
  }, [navigate])
  const navigateToTerms = () => navigateToWebview('https://getlorem.com/privacy-policy')
  const navigateToPrivacy = () => navigateToWebview('https://getlorem.com/privacy-policy')
  const color = dark ? COLORS.black : COLORS.white

  return (
    <View style={style}>
      <Row><Text color={color} tKey={'bySigning'}/>
      </Row>
      <Row>
      <TextButton color={color} onPress={navigateToTerms} tKey={'termsOfUse'}/>
      <Text color={color} tKey={'and'}/>
      <TextButton color={color} onPress={navigateToPrivacy} tKey={'privacyPolicy'}/>
      </Row>
    </View>)
}

const View = styled.View`
  align-items: center;
`
const Row = styled.View`
  flex-direction: row;
`
const Text = styled(SmallText)``

