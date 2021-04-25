import { ORDERS_COLLECTION } from '@const/firebase'
import { ORDER_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchOrders, createOne: createOrder, updateOne: updateOrder, setDataFirestore },
  slice,
  selectors: { selectState, selectAll, selectByFieldId },
} = createFirebaseReduxModule({ collection: ORDERS_COLLECTION, limitToOwner: true, schema: ORDER_SCHEMA })

export const selectOrders = selectState
export const selectAllOrders = selectAll
export const selectOrderByBoxId = (boxId) => selectByFieldId({ field: 'box', value: boxId })

export default slice
export { createOrder, fetchOrders, setDataFirestore, updateOrder }
