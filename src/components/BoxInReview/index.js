import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { prop } from 'ramda'
import styled from 'styled-components/native'

import { Caption } from '@components/Text'
import { COLORS } from '@const'
import { screenWidth } from '@const/common'

export const BoxInReview = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <InReview bottomInset={bottom}>
      <ReviewText tKey={'box.underApprovalDescription'} />
    </InReview>
  )
}

const InReview = styled.View`
  background-color: ${COLORS.tertiary};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  bottom: -${prop('bottomInset')}px;
  left: -20px;
  padding: 20px 40px 60px 40px;
  width: ${screenWidth}px;
`
const ReviewText = styled(Caption)`
  color: ${COLORS.primaryDark};
  text-align: center;
`
