import { checkIfEmailIsAvailable } from '@services/auth'

export const EMAIL_RULES_LOGIN = {
  pattern: {
    message: 'isNotValidEmail',
    value: /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  required: 'isRequired',
}
export const EMAIL_RULES = {
  ...EMAIL_RULES_LOGIN,
  validate: {
    // THROTTLE
    asyncValidate: async (value) => {
      const isAvailable = await checkIfEmailIsAvailable(value)
      return isAvailable ? null : 'alreadyRegistered'
    },
  },
}
export const PASSWORD_RULES = {
  minLength: { message: 'isTooShort', value: 6 },
  required: 'isRequired',
}

export const PHONE_RULES = {
  required: 'isRequired',
}
