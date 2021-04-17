import { BRANDS_COLLECTION } from '@const/firebase'
import { BRAND_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchBrands },
  slice,
  selectors: { selectByIds: selectBrandsByIds },
} = createFirebaseReduxModule({ collection: BRANDS_COLLECTION, schema: BRAND_SCHEMA })

export default slice
export { fetchBrands, selectBrandsByIds }
