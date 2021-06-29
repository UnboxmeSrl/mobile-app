import { PRODUCTS_COLLECTION } from '@const/firebase'
import { PRODUCT_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  getDocumentReference: getProductReference,
  actions: { fetchAll: fetchProducts },
  slice,
  selectors: { selectAll, selectByIds: selectProductsByIds, selectById: selectProductById },
} = createFirebaseReduxModule({ collection: PRODUCTS_COLLECTION, schema: PRODUCT_SCHEMA })

export const selectAllProducts = selectAll

export default slice
export { fetchProducts, getProductReference, selectProductById, selectProductsByIds }
