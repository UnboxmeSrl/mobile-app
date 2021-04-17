import { createSelector } from '@reduxjs/toolkit'

import { ORDERS_COLLECTION } from '@const/firebase'
import { ORDER_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchOrders, createOne: createOrder },
  slice,
  selectors: { selectState, selectAll, selectById: selectOrderById, selectByFieldId },
} = createFirebaseReduxModule({ collection: ORDERS_COLLECTION, limitToOwner: true, schema: ORDER_SCHEMA })

export const selectBoxes = selectState
export const selectAllBoxes = selectAll
export const selectOrderByBoxId = (boxId) => selectByFieldId({ field: 'box', value: boxId })

export default slice
export { createOrder, fetchOrders }
