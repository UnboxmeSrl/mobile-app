import React from 'react'
import { Alert } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { AWARD_TYPE_PRIZE } from '@const/award'
import { MODAL_NAMES } from '@const/navigation'
import { ORDER_IN_REVIEW } from '@const/order'
import { useAction, useAuthenticatedAction } from '@hooks/common'
import { getAwardReference, selectAwardById } from '@redux/modules/awards'
import { createBooking, selectBookingByAwardId } from '@redux/modules/bookings'
import { getBoxReference } from '@redux/modules/boxes'
import { selectSumOfPoints, selectSumOfStars } from '@redux/modules/transactions'
import { getUserReference } from '@redux/modules/users'

import { AwardScreenPresenter } from './AwardScreenPresenter'

export const AwardScreen = () => {
  const awardId = useNavigationParam('awardId')
  const award = useSelector(selectAwardById(awardId))
  const booking = useSelector(selectBookingByAwardId(awardId))
  const { navigate } = useNavigation()
  const points = useSelector(selectSumOfPoints)
  const stars = useSelector(selectSumOfStars)
  const navigateToSlots = () => navigate({ params: { awardId }, routeName: MODAL_NAMES.Timeslots })
  const createBookingAction = useAction(createBooking)
  const isPrize = award.type === AWARD_TYPE_PRIZE
  const nameOfCurrency = isPrize ? 'points' : 'stars'
  const price = isPrize ? award.points : award.stars

  const onSubmit = useAuthenticatedAction(() => {
    const rejected = isPrize ? points < price : stars < price
    if (rejected) {
      Alert.alert('Error', `You don't have enough ${nameOfCurrency} to book.`, [
        {
          onPress: () => null,
          style: 'cancel',
          text: 'OK',
        },
      ])
    } else {
      Alert.alert('Confirmation', `${price} exp will be deducted from your account.`, [
        {
          onPress: () => null,
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => {
            createBookingAction({
              award: getAwardReference(awardId),
              awardType: award.type,
              user: '',
            })
          },
          text: 'Yes',
        },
      ])
    }
  })

  const props = { disabled: booking, nameOfCurrency, navigateToSlots, onSubmit, price, ...award, isPrize }

  return <AwardScreenPresenter {...props} />
}
