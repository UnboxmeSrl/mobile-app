import React from 'react'
import { Animated } from 'react-native'
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from 'react-navigation-stack'
import { always, cond, T } from 'ramda'
import styled from 'styled-components/native'

import { COLORS } from '@const'

import { IS_IOS } from '../constants/common'

const IS_ANDROID = !IS_IOS

const DEFAULT_VERTICAL_OFFSET = 135
const SWIPE_VERTICAL_OFFSET = IS_IOS ? DEFAULT_VERTICAL_OFFSET : 500 // TODO

export const gestureResponseDistance = {
  vertical: SWIPE_VERTICAL_OFFSET,
}

const Overlay = styled.View`
  background-color: ${COLORS.black03};
`

export const cardOverlay = ({ style }) => <Overlay style={style} />

const withInFullscreen = (curr) => false // FULL_SCREEN_MODALS[curr]

export const getTopOffset = cond([
  [withInFullscreen, always(0)],
  [T, always(50)],
])

export const getRadius = cond([
  [withInFullscreen, always(0)],
  [T, always(32)],
])

export const getCardStyle = (curr, marginTop) =>
  IS_ANDROID
    ? {
        backgroundColor: COLORS.transparent,
        borderTopLeftRadius: getRadius(curr),
        borderTopRightRadius: getRadius(curr),
        marginTop: marginTop || getTopOffset(curr),
      }
    : undefined

export const cardStyleInterpolator = (props) =>
  IS_ANDROID
    ? {
        overlayStyle: {
          opacity: props.current.progress,
        },
        ...CardStyleInterpolators.forVerticalIOS(props),
      }
    : undefined

const ModalTransitionSpec = IS_ANDROID
  ? {
      ...TransitionSpecs.TransitionIOSSpec,
      config: {
        ...TransitionSpecs.TransitionIOSSpec.config,
        restDisplacementThreshold: 40,
        restSpeedThreshold: 100,
      },
    }
  : undefined

export const ModalSlideFromBottomIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  gestureDirection: 'vertical',
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  transitionSpec: {
    close: ModalTransitionSpec,
    open: ModalTransitionSpec,
  },
}

export const rootScreensNavigationOptions = {
  cardShadowEnabled: false, // https://github.com/react-navigation/react-navigation/issues/7690
  cardStyle: {
    backgroundColor: null,
  },
}

export const defaultCardStyleInterpolator = () => ({
  cardStyle: { backgroundColor: null },
  containerStyle: { backgroundColor: null },
})
