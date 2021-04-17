import { USERS_COLLECTION } from '@const/firebase'
import { USER_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const { getDocumentReference: getUserReference, slice } = createFirebaseReduxModule({
  collection: USERS_COLLECTION,
  schema: USER_SCHEMA,
})

export default slice
export { getUserReference }
