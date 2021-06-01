import { AWARD_CATEGORIES_COLLECTION } from '@const/firebase'
import { AWARD_CATEGORY_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getAwardCategoryReference,
  actions: { fetchAll: fetchAwardCategories },
  slice,
  selectors: { selectState, selectAll },
} = createFirebaseReduxModule({ collection: AWARD_CATEGORIES_COLLECTION, schema: AWARD_CATEGORY_SCHEMA })

export const selectAwardCategories = selectAll

export default slice
export { fetchAwardCategories }
