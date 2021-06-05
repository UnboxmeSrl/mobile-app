import { schema } from 'normalizr'
import { mergeAll, prop } from 'ramda'

const TIMESTAMPS_FIELDS = ['createdAt', 'updatedAt', 'expiredAt']

// replace firebase object with id
const applyReferenceId = (fields, value) =>
  mergeAll(
    [...fields, ...TIMESTAMPS_FIELDS].map((field) => {
      const data = value[field]
      if (data && !TIMESTAMPS_FIELDS.includes(field)) {
        const normalizedData = Array.isArray(data)
          ? data.map((doc) => ({
              id: doc.id,
            }))
          : { id: data.id }
        return { [field]: normalizedData }
      } else if (TIMESTAMPS_FIELDS.includes(field)) {
        return { [field]: data?._seconds }
      } else {
        return { [field]: null }
      }
    })
  )

const getProcessStrategy = (fields) => (value) => {
  return {
    ...value,
    ...applyReferenceId(fields, value),
  }
}

export const CATEGORY_SCHEMA = new schema.Entity('categories', {})
export const BRAND_SCHEMA = new schema.Entity('brands', {})
export const USER_SCHEMA = new schema.Entity('users', {})
export const PRODUCT_SCHEMA = new schema.Entity(
  'products',
  {
    brand: BRAND_SCHEMA,
    category: CATEGORY_SCHEMA,
  },
  {
    processStrategy: getProcessStrategy(['brand', 'category']),
  }
)

export const BOX_SCHEMA = new schema.Entity(
  'boxes',
  {
    brands: [CATEGORY_SCHEMA],
    categories: [CATEGORY_SCHEMA],
    extraProducts: [PRODUCT_SCHEMA],
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['categories', 'brands', 'extraProducts']),
  }
)

export const ADDRESS_SCHEMA = new schema.Entity(
  'addresses',
  {
    user: USER_SCHEMA,
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['user']),
  }
)

export const ORDER_SCHEMA = new schema.Entity(
  'orders',
  {
    address: ADDRESS_SCHEMA,
    box: BOX_SCHEMA,
    extraProduct: PRODUCT_SCHEMA,
    user: USER_SCHEMA,
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['box', 'user', 'extraProduct', 'address']),
  }
)

export const AWARD_CATEGORY_SCHEMA = new schema.Entity(
  'awardCategories',
  {},
  {
    idAttribute: prop('id'),
  }
)

export const AWARD_SCHEMA = new schema.Entity(
  'awards',
  {
    category: AWARD_CATEGORY_SCHEMA,
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['category']),
  }
)

export const BOOKING_SCHEMA = new schema.Entity(
  'bookings',
  {
    award: AWARD_SCHEMA,
    user: USER_SCHEMA,
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['award', 'user']),
  }
)

export const TRANSACTION_SCHEMA = new schema.Entity(
  'transactions',
  {
    booking: BOOKING_SCHEMA,
    order: ORDER_SCHEMA,
    user: USER_SCHEMA,
  },
  {
    idAttribute: prop('id'),
    processStrategy: getProcessStrategy(['booking', 'order', 'user']),
  }
)
