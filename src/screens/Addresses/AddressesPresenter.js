import React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { RouteContainer } from '@components/RouteContainer'
import { Caption, SmallText, Subtitle } from '@components/Text'
import { COLORS } from '@const'

const HEIGHT = 112

export const AddressesPresenter = ({ addresses, onRemove, RightButton }) => {
  const renderRightActions = (progress, dragX, id) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    })
    return (
      <RectButton
        onPress={() => onRemove(id)}
        style={{ alignItems: 'center', height: HEIGHT, justifyContent: 'center', marginTop: 20, width: 100 }}
      >
        <Animated.Text
          style={[
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Ionicons color={COLORS.grey} name={'trash-outline'} size={30} />
        </Animated.Text>
      </RectButton>
    )
  }
  console.log(addresses)
  return (
    <RouteContainer RightButton={RightButton} tKey={'addresses.title'} withArrow withPadding>
      {addresses.map(({ address, id, comments }) => (
        <Swipeable key={id} renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, id)}>
          <Address>
            <AddressText numberOfLines={2}>{address}</AddressText>
            <SmallText>{comments}</SmallText>
          </Address>
        </Swipeable>
      ))}
    </RouteContainer>
  )
}

const Address = styled.View`
  background-color: ${COLORS.secondary};
  border-radius: 16px;
  height: ${HEIGHT}px;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`
const AddressText = styled(Subtitle)``
