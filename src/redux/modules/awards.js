import { createSelector } from '@reduxjs/toolkit'
import { filter, ifElse, map, pipe, prop, propEq, uniq } from 'ramda'

import { AWARD_TYPE_COUPON, AWARD_TYPE_PRIZE } from '@const/award'
import { AWARDS_COLLECTION } from '@const/firebase'
import { AWARD_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getAwardReference,
  actions: { fetchAll: fetchAwards },
  slice,
  selectors: { selectAll, selectById: selectAwardById },
} = createFirebaseReduxModule({ collection: AWARDS_COLLECTION, schema: AWARD_SCHEMA })

export const selectAwards = selectAll
export const selectAllCouponAwards = createSelector(selectAwards, filter(propEq('type', AWARD_TYPE_COUPON)))
export const selectAllPrizeAwards = createSelector(selectAwards, filter(propEq('type', AWARD_TYPE_PRIZE)))
export const selectPrizeCategoriesIds = createSelector(selectAllPrizeAwards, pipe(map(prop('category')), uniq))
export const selectCouponCategoriesIds = createSelector(selectAllCouponAwards, pipe(map(prop('category')), uniq))
export const selectPrizeAwardsByCategory = (category) =>
  createSelector(
    selectAllPrizeAwards,
    pipe(
      filter((item) => {
        if (category === 'all') {
          return true
        } else {
          return item.category === category
        }
      })
    )
  )
export const selectCouponAwardsByCategory = (category) =>
  createSelector(
    selectAllCouponAwards,
    pipe(
      filter((item) => {
        if (category === 'all') {
          return true
        } else {
          return item.category === category
        }
      })
    )
  )

export default slice
export { fetchAwards, getAwardReference, selectAwardById }
