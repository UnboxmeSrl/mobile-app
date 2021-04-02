import Toast from 'react-native-toast-message'

import i18n from './i18n'

export const showToastError = (error) => {
  console.log(Toast)
  Toast?.show({
    text1: i18n.t('Error'),
    text2: error?.message,
    type: 'error',
  })
}
export const showToastSuccess = (message) => {
  Toast?.show({
    text1: i18n.t('Success'),
    text2: message,
  })
}
