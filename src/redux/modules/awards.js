import { AWARDS_COLLECTION } from '@const/firebase'
import { AWARD_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getAwardReference,
  actions: { fetchAll: fetchAwards },
  slice,
  selectors: { selectState, selectAll, selectById: selectAwardById, selectAllByFieldId },
} = createFirebaseReduxModule({ collection: AWARDS_COLLECTION, schema: AWARD_SCHEMA })

export const selectAwards = selectAll
export const selectAwardsByCategory = (category) =>
  selectAllByFieldId({ any: category === 'all', field: 'category', value: category })

export default slice
export { fetchAwards, getAwardReference, selectAwardById }
