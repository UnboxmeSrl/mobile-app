import { AuthPhoneModal } from '@screens/AuthPhone'
import { LoginScreen } from '@screens/Login'
import { SignInEmailModal } from '@screens/SignInEmail'
import { SignUpEmailModal } from '@screens/SignUpEmail'
import { TikTokModal } from '@screens/TikTokConnect'
import { WebViewModal } from '@screens/WebView'
import { MODAL_NAMES } from 'src/constants/navigation'

export const MODALS = {
  [MODAL_NAMES.Login]: {
    screen: LoginScreen,
  },
  [MODAL_NAMES.WebView]: {
    screen: WebViewModal,
  },
  [MODAL_NAMES.SignUpEmail]: {
    screen: SignUpEmailModal,
  },
  [MODAL_NAMES.SignInEmail]: {
    screen: SignInEmailModal,
  },
  [MODAL_NAMES.SignUpPhone]: {
    screen: SignUpEmailModal,
  },
  [MODAL_NAMES.AuthPhone]: {
    screen: AuthPhoneModal,
  },
  [MODAL_NAMES.Tiktok]: {
    screen: TikTokModal,
  },
}
