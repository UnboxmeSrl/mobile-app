import { createSelector } from '@reduxjs/toolkit'
import { values } from 'ramda'

import { BRANDS_COLLECTION } from '@const/firebase'
import { BRAND_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchBrands },
  slice,
  selectors: { selectByIds: selectBrandsByIds, selectEntities: selectAllBrands, selectById: selectBrandById },
} = createFirebaseReduxModule({ collection: BRANDS_COLLECTION, schema: BRAND_SCHEMA })

const selectBrandOptions = createSelector(selectAllBrands, values)

export default slice
export { fetchBrands, selectAllBrands, selectBrandById, selectBrandOptions, selectBrandsByIds }
