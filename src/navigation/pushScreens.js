import { OnboardingScreen } from '@screens/Onboarding'
import { SignUpScreen } from '@screens/SignUp'

import { SCREEN_NAMES } from '@const/navigation'


export default {
  [SCREEN_NAMES.Onboarding]: {
    screen: OnboardingScreen
  },
  [SCREEN_NAMES.SignUp]: {
    screen: SignUpScreen
  }
}
