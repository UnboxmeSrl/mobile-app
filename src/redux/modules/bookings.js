import { BOOKINGS_COLLECTION } from '@const/firebase'
import { BOOKING_SCHEMA } from '@const/schemas'
import { createFirebaseReduxModule } from '@redux/createModule'

const {
  actions: { fetchAll: fetchBookings, createOne: createBooking, updateOne: updateBooking, setDataFirestore },
  slice,
  selectors: { selectState, selectAll, selectById: selectBookingById, selectByFieldId },
} = createFirebaseReduxModule({ collection: BOOKINGS_COLLECTION, limitToOwner: true, schema: BOOKING_SCHEMA })

export const selectBookings = selectState
export const selectAllBookings = selectAll
export const selectBookingByAwardId = (awardId) => selectByFieldId({ field: 'award', value: awardId })

export default slice
export { createBooking, fetchBookings, selectBookingById, setDataFirestore, updateBooking }
