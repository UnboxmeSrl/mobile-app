import { createSelector } from '@reduxjs/toolkit'
import { isEmpty, not, pipe } from 'ramda'

import { ADDRESSES_COLLECTION } from '@const/firebase'
import { ADDRESS_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getAddressReference,
  actions: { fetchAll: fetchAddresses, createOne: createAddress, removeById: removeAddressById },
  slice,
  selectors: { selectState, selectAll },
} = createFirebaseReduxModule({ collection: ADDRESSES_COLLECTION, limitToOwner: true, schema: ADDRESS_SCHEMA })

export const selectAddresses = selectState
export const selectAllAddresses = selectAll
export const selectHasAnyAddress = createSelector(selectAll, pipe(isEmpty, not))

export default slice
export { createAddress, fetchAddresses, getAddressReference, removeAddressById }
