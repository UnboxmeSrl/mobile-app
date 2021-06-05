import { createSelector } from '@reduxjs/toolkit'
import { map, pipe, propOr, sum } from 'ramda'

import { TRANSACTIONS_COLLECTION } from '@const/firebase'
import { TRANSACTION_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const _points = 'points'

const {
  actions: { fetchAll: fetchTransactions, setDataFirestore },
  slice,
  selectors: { selectAll },
} = createFirebaseReduxModule({ collection: TRANSACTIONS_COLLECTION, limitToOwner: true, schema: TRANSACTION_SCHEMA })

export const selectAllOrders = selectAll
export const selectSumOfPoints = createSelector(selectAllOrders, pipe(map(propOr(0, _points)), sum))

export default slice
export { fetchTransactions, setDataFirestore }
