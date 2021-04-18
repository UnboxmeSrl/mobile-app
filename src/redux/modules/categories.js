import { CATEGORIES_COLLECTION } from '@const/firebase'
import { CATEGORY_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchCategories },
  slice,
  selectors: { selectAll, selectByIds: selectCategoriesById, selectById: selectCategoryById },
} = createFirebaseReduxModule({ collection: CATEGORIES_COLLECTION, schema: CATEGORY_SCHEMA })

export const selectAllCategories = selectAll

export default slice
export { fetchCategories, selectCategoriesById, selectCategoryById }
