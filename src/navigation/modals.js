import { LoginScreen } from '@screens/Login'
import { WebViewModal } from '@screens/WebView'
import { MODAL_NAMES } from 'src/constants/navigation'

export const MODALS = {
  [MODAL_NAMES.Login]: {
    screen: LoginScreen
  },
  [MODAL_NAMES.WebView]: {
    screen: WebViewModal
  }
}
