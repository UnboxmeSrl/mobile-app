import React from 'react'
import { useTranslation } from 'react-i18next'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { FONTS } from '@const'
import { withTheme } from '@services/withTheme'

const ThemedText = styled.Text`
  color: ${propOr(withTheme('black', 'white'), 'color')};
`
const Regular = styled(ThemedText)`
  fontSize: 14px;
  line-height: 18px;
`
const Light = styled(Regular)`
  font-family: ${FONTS.light};
`
const SemiBold = styled(Regular)`
  font-family: ${FONTS.semiBold};
`
const Bold = styled(Regular)`
  font-family: ${FONTS.bold};
`

const BaseText = ({
  tKey,
  tDefaultValue,
  tOptions,
  Component,
  children,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Component {...rest}>
      {tKey ? t(tKey, tDefaultValue, tOptions) : children}
    </Component>
  )
}

export const RegularText = (props) => {
  return <BaseText Component={Regular} {...props} />
}
export const LightText = (props) => {
  return <BaseText Component={Light} {...props} />
}
export const SemiBoldText = (props) => {
  return <BaseText Component={SemiBold} {...props} />
}
export const BoldText = (props) => {
  return <BaseText Component={Bold} {...props} />
}

export const SectionTitle = styled(SemiBoldText)`
  fontSize: 20px;
  lineHeight: 24px
  marginHorizontal: 16px
  marginVertical: 16px
`
