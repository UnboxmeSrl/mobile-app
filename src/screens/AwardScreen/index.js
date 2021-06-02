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
import { getUserReference } from '@redux/modules/users'

import { AwardScreenPresenter } from './AwardScreenPresenter'

export const AwardScreen = () => {
  const awardId = useNavigationParam('awardId')
  const award = useSelector(selectAwardById(awardId))
  const booking = useSelector(selectBookingByAwardId(awardId))
  const { navigate, goBack } = useNavigation()
  const navigateToSlots = () => navigate({ params: { awardId }, routeName: MODAL_NAMES.Timeslots })
  const createBookingAction = useAction(createBooking)
  const onSubmit = () => {
    Alert.alert('Confirmation', `${award.points} exp will be deducted from your account.`, [
      {
        onPress: () => null,
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          createBookingAction({
            award: getAwardReference(awardId),
            user: getUserReference(auth().currentUser?.uid),
          }).then(() => goBack())
        },
        text: 'Yes',
      },
    ])
  }
  const props = { disabled: Boolean(booking), navigateToSlots, onSubmit, ...award }

  return <AwardScreenPresenter {...props} />
}
