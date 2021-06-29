import { firebase } from '@react-native-firebase/storage'

export const USERS_COLLECTION = 'users'
export const BOXES_COLLECTION = 'boxes'
export const CATEGORIES_COLLECTION = 'categories'
export const BRANDS_COLLECTION = 'brands'
export const PRODUCTS_COLLECTION = 'products'
export const ORDERS_COLLECTION = 'orders'
export const ADDRESSES_COLLECTION = 'addresses'
export const AWARD_CATEGORIES_COLLECTION = 'awardCategories'
export const AWARDS_COLLECTION = 'awards'
export const BOOKINGS_COLLECTION = 'bookings'
export const TRANSACTIONS_COLLECTION = 'transactions'

export const CONTENT_STORAGE_BUCKET = 'gs://unboxme-firebase-content'
export const getContentPath = (box, order, name) => `${box.name.en}/${order.id}/${name}`
export const getUserPublicPath = (userId, name) => `${userId}/${name}`
export const getContentDir = (box, order) => `${box.name.en}/${order.id}`
export const contentRef = firebase.app().storage(CONTENT_STORAGE_BUCKET)
