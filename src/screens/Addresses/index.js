import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import CookieManager from '@react-native-community/cookies'
import styled from 'styled-components/native'

import { TinyText } from '@components/Text'
import { TextButton } from '@components/TextButton'
import { COLORS } from '@const'
import { SCREEN_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import { removeAddressById, selectAddresses, selectAllAddresses } from '@redux/modules/addresses'
import { _instagram } from '@redux/modules/auth'

import { AddressesPresenter } from './AddressesPresenter'

export const AddressesScreen = () => {
  const addresses = useSelector(selectAllAddresses)
  const removeAddress = useAction(removeAddressById)
  const { navigate } = useNavigation()
  const navigateToAdd = () => navigate(SCREEN_NAMES.AddNewAddress)
  const RightButton = () => (
    <Button onPress={navigateToAdd} style={{ position: 'absolute', right: 20 }}>
      <Ionicons color={COLORS.primary} name={'add-circle-outline'} size={12} style={{ marginRight: 4 }} />
      <TinyText color={COLORS.primary} tKey={'addAddress'} />
    </Button>
  )
  const onRemove = (id) => {
    Alert.alert('Are you sure you want remove address?', '', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          removeAddress({ id })
          console.log('remove')
        },
        text: 'Remove',
      },
    ])
  }
  const props = { RightButton, addresses, onRemove }

  return <AddressesPresenter {...props} />
}

const Button = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`
