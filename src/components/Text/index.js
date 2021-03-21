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
  font-family: ${FONTS.abrilFatface};
  font-size: 40px;
  letter-spacing: 1.2px;
  line-height: 56px;
`
const H2Styled = styled(ThemedText)`
  font-family: ${FONTS.demi};
  font-size: 32px;
  line-height: 40px;
`
const H3Styled = styled(H2Styled)`
  font-size: 24px;
  line-height: 32px;
`
const ButtonStyled = styled(ThemedText)`
  font-family: ${FONTS.medium};
  font-size: 18px;
  line-height: 24px;
`
const SubtitleStyled = styled(ButtonStyled)`
  font-size: 16px;
  line-height: 24px;
`
const CaptionStyled = styled(ButtonStyled)`
  font-size: 14px;
  line-height: 20px;
`
const BigLightStyled = styled(ThemedText)`
  font-family: ${FONTS.light};
  font-size: 18px;
  line-height: 36px;
`
const ButtonLightStyled = styled(BigLightStyled)`
  font-size: 18px;
  line-height: 24px;
`
const BodyStyled = styled(ThemedText)`
  font-family: ${FONTS.light};
  font-size: 16px;
  line-height: 24px;
`
const SmallStyled = styled(CaptionStyled)`
  font-family: ${FONTS.light};
`
const RegularStyled = styled(ThemedText)`
  font-family: ${FONTS.light};
`
const TinyStyled = styled(CaptionStyled)`
  font-family: ${FONTS.medium};
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 16px;
`

const BaseText = ({ tKey, tDefaultValue, tOptions, Component, children, ...rest }) => {
  const { t } = useTranslation()

  return (
    <Component {...rest}>{tKey ? t(tKey, tDefaultValue, tOptions) : children}</Component>
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

export const ButtonText = (props) => {
  return <BaseText Component={ButtonStyled} {...props} />
}

export const SectionTitle = styled(H1)`
  fontsize: 20px;
  lineheight: 24px;
  marginhorizontal: 16px;
  marginvertical: 16px;
`
