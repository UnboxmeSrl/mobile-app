import { AWARDS_COLLECTION } from '@const/firebase'
import { AWARD_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getAwardReference,
  actions: { fetchAll: fetchAwards },
  slice,
  selectors: { selectState, selectAll, selectById: selectAwardById },
} = createFirebaseReduxModule({ collection: AWARDS_COLLECTION, schema: AWARD_SCHEMA })

export const selectAwards = selectAll

export default slice
export { fetchAwards, selectAwardById }
