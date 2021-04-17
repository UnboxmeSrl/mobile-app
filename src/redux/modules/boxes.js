import { BOXES_COLLECTION } from '@const/firebase'
import { BOX_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchBoxes, fetchById: fetchBoxById },
  slice,
  selectors: { selectState, selectAll, selectByIds: selectBoxesByIds, selectById: selectBoxById },
} = createFirebaseReduxModule({ collection: BOXES_COLLECTION, schema: BOX_SCHEMA })

export const selectBoxes = selectState
export const selectAllBoxes = selectAll

export default slice
export { fetchBoxById, fetchBoxes, selectBoxById, selectBoxesByIds }
