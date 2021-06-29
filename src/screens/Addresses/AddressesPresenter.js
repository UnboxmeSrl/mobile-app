import React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { RouteContainer } from '@components/RouteContainer'
import { BodyText, Caption, SmallText, Subtitle } from '@components/Text'
import { COLORS } from '@const'

const HEIGHT = 112

export const AddressesPresenter = ({
  addresses,
  onRemove,
  RightButton,
  withSelection,
  setSelected,
  selected,
  onAddressConfirm,
}) => {
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
  return (
    <RouteContainer RightButton={RightButton} tKey={'addresses.title'} withArrow withPadding>
      {withSelection ? <Body tKey={'addresses.pleaseChoose'} /> : null}
      {addresses.map(({ address, id, comments }) => {
        return (
          <Swipeable
            enabled={!withSelection}
            key={id}
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, id)}
          >
            <Address
              disabled={!withSelection}
              onPress={() => setSelected({ address, comments, id })}
              selected={id === selected?.id}
            >
              <Wrapper isAnySelected={selected} selected={id === selected?.id}>
                <AddressText numberOfLines={2}>{address}</AddressText>
                <SmallText>{comments || 'No comments'}</SmallText>
              </Wrapper>
            </Address>
          </Swipeable>
        )
      })}
      <StyledButton disabled={!selected} onPress={onAddressConfirm} tKey={'Confirm'} />
    </RouteContainer>
  )
}
const Body = styled(BodyText)`
  margin-top: 12px;
`
const Wrapper = styled.View`
  height: ${HEIGHT}px;
  justify-content: space-between;
  opacity: ${({ isAnySelected, selected }) => (isAnySelected ? (selected ? 1 : 0.5) : 1)};
  padding: 20px;
  width: 100%;
`

const Address = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? COLORS.secondary : COLORS.tertiary)};
  border-radius: 16px;
  margin-top: 20px;
`
const AddressText = styled(Subtitle)``

const StyledButton = styled(Button)`
  bottom: 0;
  left: 20px;
  position: absolute;
`
