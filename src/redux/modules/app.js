import { createSelector } from '@reduxjs/toolkit'
import { prop, propOr } from 'ramda'

import { createReduxModule } from '@redux/createModule'

export const APP_NAMESPACE = 'app'

export const _location = 'location'
export const _awardPrizeCategory = 'awardPrizeCategory'
export const _awardCouponCategory = 'awardCouponCategory'

const initialState = { [_awardCouponCategory]: 'all', [_awardPrizeCategory]: 'all' }

const {
  slice,
  selectors: { selectState },
} = createReduxModule({ initialState, name: APP_NAMESPACE })

export const selectLocation = createSelector(
  selectState,
  propOr({ lat: 45.464664, latitudeDelta: 0.1, lng: 9.18854, longitudeDelta: 0.05 }, _location)
)
export const selectAwardPrizeCategory = createSelector(selectState, prop(_awardPrizeCategory))
export const selectAwardCouponCategory = createSelector(selectState, prop(_awardCouponCategory))
export const setAppData = slice.actions.setData

export default slice
