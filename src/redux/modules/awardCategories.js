import { createSelector } from '@reduxjs/toolkit'
import { filter, propEq } from 'ramda'

import { AWARD_TYPE_COUPON, AWARD_TYPE_PRIZE } from '@const/award'
import { AWARD_CATEGORIES_COLLECTION } from '@const/firebase'
import { AWARD_CATEGORY_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'
import { selectAwards } from '@redux/modules/awards'

const {
  getDocumentReference: getAwardCategoryReference,
  actions: { fetchAll: fetchAwardCategories },
  slice,
  selectors: { selectByIds: selectCategoriesByIds },
} = createFirebaseReduxModule({ collection: AWARD_CATEGORIES_COLLECTION, schema: AWARD_CATEGORY_SCHEMA })

export default slice
export { fetchAwardCategories, selectCategoriesByIds }
