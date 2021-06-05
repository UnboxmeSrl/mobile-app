import React from 'react'
import { Alert } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { MODAL_NAMES } from '@const/navigation'
import { ORDER_IN_REVIEW } from '@const/order'
import { useAction } from '@hooks/common'
import { getAwardReference, selectAwardById } from '@redux/modules/awards'
import { createBooking, selectBookingByAwardId } from '@redux/modules/bookings'
import { getBoxReference } from '@redux/modules/boxes'
import { selectSumOfPoints } from '@redux/modules/transactions'
import { getUserReference } from '@redux/modules/users'

import { AwardScreenPresenter } from './AwardScreenPresenter'

export const AwardScreen = () => {
  const awardId = useNavigationParam('awardId')
  const award = useSelector(selectAwardById(awardId))
  const booking = useSelector(selectBookingByAwardId(awardId))
  const { navigate, goBack } = useNavigation()
  const points = useSelector(selectSumOfPoints)
  const navigateToSlots = () => navigate({ params: { awardId }, routeName: MODAL_NAMES.Timeslots })
  const createBookingAction = useAction(createBooking)
  const onSubmit = () => {
    if (points < award.points) {
      Alert.alert('Error', `You don't have enough points to book.`, [
        {
          onPress: () => null,
          style: 'cancel',
          text: 'OK',
        },
      ])
    } else {
      Alert.alert('Confirmation', `${award.points} exp will be deducted from your account.`, [
        {
          onPress: () => null,
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => {
            console.log(auth().currentUser?.uid)
            const response = createBookingAction({
              award: getAwardReference(awardId),
              user: getUserReference(auth().currentUser?.uid),
            })
            response.then((data) => {
              console.log('then')
              console.log(data)
            })
            response.catch((e) => {
              console.log('error')
              console.log(e)
            })
            console.log({ response })
          },
          text: 'Yes',
        },
      ])
    }
  }
  console.log(booking)
  const props = { disabled: booking, navigateToSlots, onSubmit, ...award }

  return <AwardScreenPresenter {...props} />
}
