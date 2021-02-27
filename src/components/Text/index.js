import React from 'react'
import { useTranslation } from 'react-i18next'
import { propOr } from 'ramda'
import styled from 'styled-components/native'

import { COLORS, FONTS } from '@const'
import { withTheme } from '@services/withTheme'

const ThemedText = styled.Text`
  color: ${propOr(withTheme(COLORS.black, COLORS.white), 'color')};
`
const H1Styled = styled(ThemedText)`
  fontFamily: ${FONTS.abrilFatface};
  fontSize: 40px;
  letterSpacing: 1.2px;
  lineHeight: 56px;
`
const H2Styled = styled(ThemedText)`
  fontFamily: ${FONTS.semiBold};
  fontSize: 32px;
  lineHeight: 40px;
`
const H3Styled = styled(H2Styled)`
  fontSize: 24px;
  lineHeight: 32px;
`
const SubtitleStyled = styled(H3Styled)`
  fontSize: 16px;
  lineHeight: 24px;
`
const CaptionStyled = styled(H2Styled)`
  fontSize: 14px;
  lineHeight: 20px;
`
const BodyStyled = styled(ThemedText)`
  fontFamily: ${FONTS.light};
  fontSize: 16px;
  lineHeight: 24px;
`
const SmallStyled = styled(CaptionStyled)`
  fontFamily: ${FONTS.light};
`
const RegularStyled = styled(ThemedText)`
  fontFamily: ${FONTS.light};
`
const TinyStyled = styled(CaptionStyled)`
  fontSize: 12px;
  lineHeight: 16px;
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

export const H1 = (props) => {
  return <BaseText Component={H1Styled} {...props} />
}
export const H2 = (props) => {
  return <BaseText Component={H2Styled} {...props} />
}
export const H3 = (props) => {
  return <BaseText Component={H3Styled} {...props} />
}
export const Subtitle = (props) => {
  return <BaseText Component={SubtitleStyled} {...props} />
}
export const Caption = (props) => {
  return <BaseText Component={CaptionStyled} {...props} />
}
export const BodyText = (props) => {
  return <BaseText Component={BodyStyled} {...props} />
}
export const SmallText = (props) => {
  return <BaseText Component={SmallStyled} {...props} />
}
export const TinyText = (props) => {
  return <BaseText Component={TinyStyled} {...props} />
}
export const Text = (props) => {
  return <BaseText Component={RegularStyled} {...props} />
}

export const SectionTitle = styled(H1)`
  fontSize: 20px;
  lineHeight: 24px;
  marginHorizontal: 16px;
  marginVertical: 16px
`
