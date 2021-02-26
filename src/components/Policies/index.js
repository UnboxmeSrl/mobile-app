import React from 'react'
import styled from 'styled-components/native'

import { SmallText } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'

export const Policies = ({style}) => {

  return (
    <View style={style}>
      <Row><Text tKey={'bySigning'} />
      </Row>
      <Row>
      <TextButton tKey={'termsOfUse'} />
      <Text tKey={'and'} />
      <TextButton tKey={'privacyPolicy'} />
      </Row>
    </View>)
}

const View = styled.View`
  align-items: center;
`
const Row = styled.View`
  flex-direction: row;
`
const Text = styled(SmallText)`
  color: ${COLORS.white};
`

