import { AuthPhoneModal } from '@screens/AuthPhone'
import { BoxModal } from '@screens/Box'
import { CongratulationsModal } from '@screens/Congratulations'
import { FillQuestionnaireModal } from '@screens/FillQuestionnaire'
import { ForgotPasswordModal } from '@screens/ForgotPassword'
import { LoginScreen } from '@screens/Login'
import { QuestionnaireThankYouModal } from '@screens/QuestionnaireThankYou'
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
  [MODAL_NAMES.FillQuestionnaire]: {
    screen: FillQuestionnaireModal,
  },
  [MODAL_NAMES.QuestionnaireThankYou]: {
    screen: QuestionnaireThankYouModal,
  },
  [MODAL_NAMES.ForgotPassword]: {
    screen: ForgotPasswordModal,
  },
  [MODAL_NAMES.Box]: {
    screen: BoxModal,
  },
  [MODAL_NAMES.Congratulations]: {
    screen: CongratulationsModal,
  },
}
