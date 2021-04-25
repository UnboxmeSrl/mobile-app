import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'

import { SCREEN_NAMES } from '@const/navigation'
import { useAction } from '@hooks/common'
import { useFetchLocation } from '@hooks/useFetchLocation'
import { createAddress } from '@redux/modules/addresses'
import { selectLocation } from '@redux/modules/app'
import { updateQuestionnaire } from '@redux/modules/auth'
import { createOrder } from '@redux/modules/orders'
import { getUserReference } from '@redux/modules/users'

import { AddNewAddressPresenter } from './AddNewAddressPresenter'

export const AddNewAddress = () => {
  const [address, setAddress] = useState('')
  const { goBack } = useNavigation()
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const onConfirm = useNavigationParam('onConfirm')

  const { control, handleSubmit, errors, setValue } = useForm()
  const appLocation = useSelector(selectLocation)
  const createAddressAction = useAction(createAddress)
  const location = address?.geometry?.location

  const onSubmit = (payload) => {
    createAddressAction({ ...payload, user: getUserReference(auth().currentUser?.uid) })
    if (onConfirm) {
      onConfirm()
    } else {
      goBack()
    }
  }
  const onPress = handleSubmit(onSubmit)

  const region = location
    ? {
        latitude: location.lat,
        latitudeDelta: 0.01,
        longitude: location.lng,
        longitudeDelta: 0.01,
      }
    : { latitude: appLocation?.lat, latitudeDelta: 0.2, longitude: appLocation?.lng, longitudeDelta: 0.1 }

  const markerCoordinate = location ? { latitude: location.lat, longitude: location.lng } : null

  useFetchLocation()
  useEffect(() => {
    if (address.formatted_address) {
      setValue('address', address.formatted_address)
    }
  }, [address])

  const props = { address, appLocation, control, errors, keyboardStatus, markerCoordinate, onPress, region, setAddress }

  return <AddNewAddressPresenter {...props} />
}
