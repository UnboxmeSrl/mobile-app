import { ADDRESSES_COLLECTION } from '@const/firebase'
import { ADDRESS_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchAddresses, createOne: createAddress },
  slice,
  selectors: { selectState, selectAll },
} = createFirebaseReduxModule({ collection: ADDRESSES_COLLECTION, limitToOwner: true, schema: ADDRESS_SCHEMA })

export const selectAddresses = selectState
export const selectAllBoxes = selectAll

export default slice
export { createAddress, fetchAddresses }
